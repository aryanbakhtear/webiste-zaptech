(function(global){
    const firebaseConfig = {
        apiKey: "AIzaSyBV-PzXHo6L3C_yPIFdXyZUn82_4Y_Pl-g",
        authDomain: "pc-apps-and.firebaseapp.com",
        projectId: "pc-apps-and",
        storageBucket: "pc-apps-and.firebasestorage.app",
        messagingSenderId: "1058593887203",
        appId: "1:1058593887203:web:c56ea18f0f630b5a7ac6d6",
        measurementId: "G-H7KN7EKBWF"
    };

    const COLLECTION = "videoTutorials";
    const ALLOWED_EMAIL = "zaptech0000@gmail.com";

    let app = null;
    let db = null;
    let auth = null;
    let ready = false;

    function loadScript(src){
        return new Promise((resolve, reject) => {
            const s = document.createElement('script');
            s.src = src;
            s.async = true;
            s.onload = resolve;
            s.onerror = reject;
            document.head.appendChild(s);
        });
    }

    async function ensureInit(){
        if (ready) return true;
        try {
            if (!global.firebase) {
                await loadScript("https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js");
                await loadScript("https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore-compat.js");
                await loadScript("https://www.gstatic.com/firebasejs/10.12.2/firebase-auth-compat.js");
            }
            app = global.firebase.initializeApp(firebaseConfig);
            db = global.firebase.firestore();
            auth = global.firebase.auth();
            await auth.setPersistence(global.firebase.auth.Auth.Persistence.LOCAL);
            try { await auth.getRedirectResult(); } catch(_) {}
            ready = true;
            return true;
        } catch (e) {
            console.warn('Firebase init failed (videotutorials):', e);
            return false;
        }
    }

    async function signIn(){
        const ok = await ensureInit();
        if (!ok) throw new Error('Firebase not ready');
        if (auth.currentUser) return auth.currentUser;
        const provider = new firebase.auth.GoogleAuthProvider();
        try { await auth.signInWithPopup(provider); }
        catch { await auth.signInWithRedirect(provider); }
        return auth.currentUser;
    }

    async function signOut(){
        const ok = await ensureInit();
        if (!ok) return;
        return auth.signOut();
    }

    function onAuthStateChanged(cb){
        ensureInit().then(() => auth.onAuthStateChanged(cb));
    }

    function getCurrentUser(){
        if (!ready) return null;
        return auth.currentUser || null;
    }

    function isAllowedUser(){
        const u = getCurrentUser();
        return !!(u && u.email === ALLOWED_EMAIL);
    }

    // Extract YouTube video ID from various YouTube URL formats
    function extractYouTubeId(url) {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    }

    // Generate YouTube thumbnail URL
    function getYouTubeThumbnail(videoId) {
        return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
    }

    async function addVideo(videoItem){
        const ok = await ensureInit();
        if (!ok) throw new Error('Firebase not ready');
        if (!isAllowedUser()) throw new Error('Not authorized');
        
        const youtubeId = extractYouTubeId(videoItem.youtubeLink);
        if (!youtubeId) throw new Error('Invalid YouTube URL');
        
        const safe = {
            title: String(videoItem.title || '').slice(0, 120),
            description: String(videoItem.description || '').slice(0, 500),
            kuTitle: String(videoItem.kuTitle || '').slice(0, 160),
            kuDescription: String(videoItem.kuDescription || '').slice(0, 700),
            youtubeLink: String(videoItem.youtubeLink || '').slice(0, 500),
            youtubeId: youtubeId,
            thumbnail: getYouTubeThumbnail(youtubeId),
            status: 'published',
            createdAtMs: Date.now(),
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            updatedAtMs: Date.now(),
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        };
        
        if (!safe.title || !safe.youtubeLink) throw new Error('Title and YouTube link are required');
        const doc = await db.collection(COLLECTION).add(safe);
        return { id: doc.id };
    }

    async function updateVideo(id, partial){
        const ok = await ensureInit();
        if (!ok) throw new Error('Firebase not ready');
        if (!isAllowedUser()) throw new Error('Not authorized');
        if (!id) throw new Error('Missing id');
        
        const updates = {};
        if (partial.title !== undefined) updates.title = String(partial.title || '').slice(0, 120);
        if (partial.description !== undefined) updates.description = String(partial.description || '').slice(0, 500);
        if (partial.kuTitle !== undefined) updates.kuTitle = String(partial.kuTitle || '').slice(0, 160);
        if (partial.kuDescription !== undefined) updates.kuDescription = String(partial.kuDescription || '').slice(0, 700);
        if (partial.youtubeLink !== undefined) {
            updates.youtubeLink = String(partial.youtubeLink || '').slice(0, 500);
            const youtubeId = extractYouTubeId(partial.youtubeLink);
            if (youtubeId) {
                updates.youtubeId = youtubeId;
                updates.thumbnail = getYouTubeThumbnail(youtubeId);
            }
        }
        
        updates.updatedAtMs = Date.now();
        updates.updatedAt = firebase.firestore.FieldValue.serverTimestamp();
        await db.collection(COLLECTION).doc(String(id)).update(updates);
        return true;
    }

    async function deleteVideo(id){
        const ok = await ensureInit();
        if (!ok) throw new Error('Firebase not ready');
        if (!isAllowedUser()) throw new Error('Not authorized');
        if (!id) throw new Error('Missing id');
        await db.collection(COLLECTION).doc(String(id)).delete();
        return true;
    }

    async function getVideos(){
        const ok = await ensureInit();
        if (!ok) return [];
        try {
            // Order by numeric client timestamp to ensure newest shows first
            const snap = await db.collection(COLLECTION).orderBy('createdAtMs', 'desc').get();
            return snap.docs.map(d => ({ id: d.id, ...d.data() }));
        } catch (e) {
            console.warn('Failed to get videos from Firebase:', e);
            if (e.code === 'permission-denied') {
                console.warn('Permission denied - check Firestore security rules');
            }
            // Return empty array if permissions are insufficient
            return [];
        }
    }

    // Function to test Firebase connection and permissions
    async function testConnection(){
        const ok = await ensureInit();
        if (!ok) {
            console.error('Firebase not initialized');
            return false;
        }
        
        try {
            // Try to read from the collection
            const testSnap = await db.collection(COLLECTION).limit(1).get();
            console.log('Firebase connection successful');
            return true;
        } catch (e) {
            console.error('Firebase connection failed:', e);
            if (e.code === 'permission-denied') {
                console.error('Permission denied - please check Firestore security rules');
            }
            return false;
        }
    }

    global.VideoTutorialsData = {
        signIn,
        signOut,
        onAuthStateChanged,
        getCurrentUser,
        isAllowedUser,
        addVideo,
        updateVideo,
        getVideos,
        deleteVideo,
        extractYouTubeId,
        getYouTubeThumbnail,
        testConnection
    };
})(window);
