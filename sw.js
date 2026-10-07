const CACHE="fatemeh-babali-v3-autoupdate";
const ASSETS=[
"./","./index.html","./manifest.webmanifest","./icon-192.png","./icon-512.png",
"./images/gol-cube.gif","./images/gol-logo.png","./images/cover.jpg","./images/page01.jpg",
"./images/blank2.jpg","./images/page02.jpg","./images/page03.jpg","./images/page04.jpg","./images/blank.jpg","./images/last-logo.jpg"
];
self.addEventListener("install",e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)))});
self.addEventListener("activate",e=>e.waitUntil((async()=>{for(const k of await caches.keys())if(k!==CACHE)await caches.delete(k);await self.clients.claim()})()));
self.addEventListener("fetch",e=>{
 if(e.request.mode==="navigate"){e.respondWith(fetch(e.request).then(r=>{const c=r.clone();caches.open(CACHE).then(x=>x.put("./index.html",c));return r}).catch(()=>caches.match("./index.html")));return;}
 e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));
});
