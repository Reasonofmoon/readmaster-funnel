/**
 * ReadMaster Academy — Shared Auth Module (shared-auth.js)
 * 
 * Firebase initialization + auth state management.
 * All pages include this AFTER firebase-app-compat.js and firebase-auth-compat.js.
 * Pages needing Firestore should also include firebase-firestore-compat.js.
 */

// ===== Firebase Config (oet-korea-platform) =====
const RM_FIREBASE_CONFIG = {
  apiKey: 'AIzaSyAc7cbhmuGGDatPZk0K_E41YGeXt0Zh1E8',
  authDomain: 'oet-korea-platform.firebaseapp.com',
  projectId: 'oet-korea-platform',
  storageBucket: 'oet-korea-platform.firebasestorage.app',
  messagingSenderId: '370408346842',
  appId: '1:370408346842:web:0214ae1e3fb496066601e3',
};

if (!firebase.apps.length) {
  firebase.initializeApp(RM_FIREBASE_CONFIG);
}

const fbAuth = firebase.auth();
const fbDB = firebase.firestore ? firebase.firestore() : null;

// ===== Role Labels =====
const ROLE_LABELS = {
  student: '학생', parent: '학부모', teacher: '강사',
  director: '원장', franchise_admin: '본부',
};
const BRANCH_NAMES = { okgil: '옥길동', udu: '우두동' };

// ===== Hamburger Menu Toggle =====
document.addEventListener('DOMContentLoaded', () => {
  const burger = document.querySelector('.nav-hamburger');
  const links = document.querySelector('.nav-links');
  if (burger && links) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('open');
      links.classList.toggle('open');
    });
    // Close on link click
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        burger.classList.remove('open');
        links.classList.remove('open');
      });
    });
  }
});

// ===== Lightweight Auth State (for pages without full rmAuth) =====
function rmSyncNavAuth(user) {
  // Nav guest/auth toggle
  const ng = document.getElementById('navGuest2') || document.getElementById('navGuest');
  const nu = document.getElementById('navUser2') || document.getElementById('navAuth');

  if (user) {
    const displayName = user.displayName || user.email?.split('@')[0] || '사용자';
    if (ng) ng.style.display = 'none';
    if (nu) {
      nu.style.display = '';
      const nameEl = nu.querySelector('.na-name') || nu.querySelector('#navName2');
      if (nameEl) nameEl.textContent = displayName;
      const avatarEl = nu.querySelector('#navAvatar2');
      if (avatarEl && user.photoURL) { avatarEl.src = user.photoURL; avatarEl.style.display = ''; }
    }
  } else {
    if (ng) ng.style.display = '';
    if (nu) nu.style.display = 'none';
  }
}

// Auto-listen if no rmAuth is defined (simple pages like curriculum.html)
if (typeof window.rmAuth === 'undefined') {
  fbAuth.onAuthStateChanged(user => rmSyncNavAuth(user));
}

// ===== PWA — Service Worker Registration =====
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  });
}

// ===== Branch Theme Loader =====
// Reads `branches/{branchId}` from Firestore and applies theme overrides.
// Expected fields: theme.primary, theme.accent, theme.background
async function rmApplyBranchTheme(branchId) {
  if (!branchId || !fbDB) return;
  try {
    const doc = await fbDB.collection('branches').doc(branchId).get();
    if (!doc.exists) return;
    const theme = doc.data().theme;
    if (!theme) return;

    const root = document.documentElement.style;
    if (theme.primary)    root.setProperty('--g', theme.primary);
    if (theme.primaryAlt) root.setProperty('--g2', theme.primaryAlt);
    if (theme.accent)     root.setProperty('--gold', theme.accent);
    if (theme.accentAlt)  root.setProperty('--gold2', theme.accentAlt);
    if (theme.background) root.setProperty('--iv', theme.background);
    if (theme.card)       root.setProperty('--card', theme.card);

    // Update meta theme-color for mobile
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta && theme.primary) meta.content = theme.primary;
  } catch (e) {
    // Silent — theme loading is non-critical
  }
}
