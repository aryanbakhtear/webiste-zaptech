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

    const COLLECTION = "pcApps";
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
            console.warn('Firebase init failed (pcapps):', e);
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

    async function addApp(appItem){
        const ok = await ensureInit();
        if (!ok) throw new Error('Firebase not ready');
        if (!isAllowedUser()) throw new Error('Not authorized');
        const safe = {
            title: String(appItem.title || '').slice(0, 120),
            desc: String(appItem.desc || '').slice(0, 500),
            image: String(appItem.image || '').slice(0, 500),
            link: String(appItem.link || '').slice(0, 500),
            kuTitle: String(appItem.kuTitle || '').slice(0, 160),
            kuDesc: String(appItem.kuDesc || '').slice(0, 700),
            status: 'published',
            createdAtMs: Date.now(),
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            updatedAtMs: Date.now(),
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        };
        if (!safe.title || !safe.link) throw new Error('Missing required fields');
        const doc = await db.collection(COLLECTION).add(safe);
        return { id: doc.id };
    }

    async function updateApp(id, partial){
        const ok = await ensureInit();
        if (!ok) throw new Error('Firebase not ready');
        if (!isAllowedUser()) throw new Error('Not authorized');
        if (!id) throw new Error('Missing id');
        const updates = {};
        if (partial.title !== undefined) updates.title = String(partial.title || '').slice(0, 120);
        if (partial.desc !== undefined) updates.desc = String(partial.desc || '').slice(0, 500);
        if (partial.image !== undefined) updates.image = String(partial.image || '').slice(0, 500);
        if (partial.link !== undefined) updates.link = String(partial.link || '').slice(0, 500);
        if (partial.kuTitle !== undefined) updates.kuTitle = String(partial.kuTitle || '').slice(0, 160);
        if (partial.kuDesc !== undefined) updates.kuDesc = String(partial.kuDesc || '').slice(0, 700);
        updates.updatedAtMs = Date.now();
        updates.updatedAt = firebase.firestore.FieldValue.serverTimestamp();
        await db.collection(COLLECTION).doc(String(id)).update(updates);
        return true;
    }

    async function deleteApp(id){
        const ok = await ensureInit();
        if (!ok) throw new Error('Firebase not ready');
        if (!isAllowedUser()) throw new Error('Not authorized');
        if (!id) throw new Error('Missing id');
        await db.collection(COLLECTION).doc(String(id)).delete();
        return true;
    }

    async function getApps(){
        const ok = await ensureInit();
        if (!ok) return [];
        // Order by numeric client timestamp to ensure newest shows first even before server timestamp resolves
        const snap = await db.collection(COLLECTION).orderBy('createdAtMs', 'desc').get();
        return snap.docs.map(d => ({ id: d.id, ...d.data() }));
    }

    global.PcAppsData = {
        signIn,
        signOut,
        onAuthStateChanged,
        getCurrentUser,
        isAllowedUser,
        addApp,
        updateApp,
        getApps,
        deleteApp
    };
})(window);


