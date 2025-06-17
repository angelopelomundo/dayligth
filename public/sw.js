// public/sw.js

self.addEventListener('push', event => {
  const data = event.data.json();
  self.registration.showNotification(data.title, {
    body: data.body,
    icon: '/icon.png' // Adicione um ícone aqui se quiser
  });
});
