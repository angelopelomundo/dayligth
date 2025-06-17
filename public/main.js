const publicVapidKey = 'BIRP4HMSsJ6sRJIOlZJLNehZAaGlZq0WYuqYmsVhU_sAUoGKkdxYHhj4dM8aKA0od3pc2DAZ5lkHEzmwfIywpL8'; // Troque depois de gerar as chaves

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
    document.getElementById('subscribe').style.display = 'none';
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

const frases = [
  "Acredite no seu potencial!",
  "Você é mais forte do que imagina.",
  "Cada dia é uma nova chance de recomeçar!",
  "Confie no processo. O melhor está por vir.",
  "Você é capaz de coisas incríveis!"
];

document.getElementById('motivacional').addEventListener('click', async () => {
  const frase = frases[Math.floor(Math.random() * frases.length)];
  const div = document.getElementById('frase-motivadora');
  div.innerText = frase;
  div.style.display = 'flex';

  // Solicitar permissão de notificações (caso ainda não tenha)
  if (Notification && Notification.permission !== 'granted') {
    try {
      await Notification.requestPermission();
    } catch (e) {
      Notification.requestPermission(function() {});
    }
  }
});

// Esconde o botão se a permissão já tiver sido concedida ao carregar a página
window.onload = function() {
  const btnSubscribe = document.getElementById('subscribe');
  if (btnSubscribe && Notification && Notification.permission === 'granted') {
    btnSubscribe.style.display = 'none';
  }
};
