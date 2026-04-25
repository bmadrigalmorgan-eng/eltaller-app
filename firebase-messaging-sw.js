importScripts('https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyC712zoQmjfvgxa_RDIMB2UCSp93S_mlIo",
  authDomain: "el-taller-7483e.firebaseapp.com",
  projectId: "el-taller-7483e",
  storageBucket: "el-taller-7483e.firebasestorage.app",
  messagingSenderId: "615648184021",
  appId: "1:615648184021:web:abaa32547b5f746828445c"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(payload => {
  const { title, body } = payload.notification;
  self.registration.showNotification(title, {
    body,
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    vibrate: [200, 100, 200],
    tag: 'eltaller-pedido'
  });
});

const CACHE = 'eltaller-v6';
const FILES = ['/', '/index.html', '/icon-192.png', '/icon-512.png', '/apple-touch-icon.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES))); self.skipWaiting(); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))); self.clients.claim(); });
self.addEventListener('fetch', e => {
  if (e.request.url.includes('firestore') || e.request.url.includes('googleapis')) return;
  e.respondWith(caches.match(e.request).then(cached => cached || fetch(e.request).catch(() => caches.match('/index.html'))));
});
