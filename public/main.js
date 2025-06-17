// public/main.js

const publicVapidKey = 'BIRP4HMSsJ6sRJIOlZJLNehZAaGlZq0WYuqYmsVhU_sAUoGKkdxYHhj4dM8aKA0od3pc2DAZ5lkHEzmw
fIywpL8'; // Troque depois de gerar as chaves

document.getElementById('subscribe').onclick = async () => {
  if ('serviceWorker' in navigator) {
    const sw = await navigator.serviceWorker.register('/sw.js');
    const subscription = await sw.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
    });

    await fetch('/api/sendNotification', {
      method: 'POST',
      body: JSON.stringify({ subscription }),
      headers: { 'Content-Type': 'application/json' },
    });

    alert('Notificações ativadas!');
  }
};

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');
  const rawData = window.atob(base64);
  return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
}

