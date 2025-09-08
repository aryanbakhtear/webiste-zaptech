// Minimal Firebase (compat) with Auth + Firestore, restricted to one email
(function(global){
  const firebaseConfig = {
    apiKey: "AIzaSyCjvUUl5AjRSY_GbuuT1sUWtrswEAo4HuE",
    authDomain: "steamacc-3f198.firebaseapp.com",
    projectId: "steamacc-3f198",
    storageBucket: "steamacc-3f198.firebasestorage.app",
    messagingSenderId: "716035250833",
    appId: "1:716035250833:web:785740cbf9c0af3f0cfd30"
  };

  const COLLECTION = "steamAccounts";
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
      console.warn('Firebase init failed:', e);
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

  async function addAccount(account){
    const ok = await ensureInit();
    if (!ok) throw new Error('Firebase not ready');
    if (!isAllowedUser()) throw new Error('Not authorized');
    const doc = await db.collection(COLLECTION).add({
      content: account.content,
      datePublished: account.datePublished,
      timePublished: account.timePublished,
      status: 'published',
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    return { id: doc.id };
  }

  async function getAccounts(){
    const ok = await ensureInit();
    if (!ok) return [];
    const snap = await db.collection(COLLECTION).orderBy('createdAt', 'desc').get();
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  }

  global.SteamAccData = {
    signIn,
    signOut,
    onAuthStateChanged,
    getCurrentUser,
    isAllowedUser,
    addAccount,
    getAccounts
  };
})(window);

