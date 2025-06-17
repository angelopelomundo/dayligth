// api/sendNotification.js
const webpush = require('web-push');

// Substitua pelas suas chaves VAPID geradas
const publicVapidKey = 'BIRP4HMSsJ6sRJIOlZJLNehZAaGlZq0WYuqYmsVhU_sAUoGKkdxYHhj4dM8aKA0od3pc2DAZ5lkHEzmwfIywpL8';
const privateVapidKey = 'ndaqkhMK3bAaybZZgs2g8cOO4vFZlRxTisMXEcLiTS8';

webpush.setVapidDetails(
  'mailto:seuemail@email.com', // Troque para seu email
  publicVapidKey,
  privateVapidKey
);

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    const { subscription } = req.body;

    const payload = JSON.stringify({
      title: 'Alerta Dayligth!',
      body: 'Sua notificação push chegou do Dayligth!'
    });

    try {
      await webpush.sendNotification(subscription, payload);
      res.status(201).json({ message: 'Notificação enviada!' });
    } catch (err) {
      res.status(500).json({ error: err.toString() });
    }
  } else {
    res.status(405).json({ error: 'Método não permitido' });
  }
};
