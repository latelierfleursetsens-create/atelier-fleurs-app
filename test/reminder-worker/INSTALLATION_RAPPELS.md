# Installation des rappels automatiques de devis

1. Dans Cloudflare, créez un Worker nommé `atelier-fleurs-reminders`.
2. Collez le contenu de `worker.js`, puis déployez.
3. Créez un namespace KV nommé `REMINDER_KV` et ajoutez-le au Worker avec le binding exact `REMINDER_KV`.
4. Dans Settings > Variables and Secrets du Worker, ajoutez :
   - `BREVO_API_KEY` (secret) : la clé API Brevo déjà utilisée pour les mails.
   - `FIREBASE_API_KEY` : la clé Web Firebase de MyBusiness.
   - `ADMIN_UID` : l’UID Firebase du compte administrateur.
   - `SENDER_EMAIL` : `latelierfleursetsens@gmail.com`
   - `SENDER_NAME` : `L'Atelier Fleurs & Sens`
5. Vérifiez que le Cron Trigger est présent : `0 * * * *`. Le Worker s’exécute toutes les heures mais n’envoie qu’à 8 h, heure de Paris.
6. Dans MyBusiness > Paramètres > Rappels automatiques des devis, collez l’URL du Worker, cliquez sur Tester, activez les rappels puis Enregistrer.
7. Cliquez sur Synchroniser maintenant.

Les rappels sont envoyés à J-14, J-7, J-2 et le jour J uniquement pour les devis au statut Envoyé. Dès qu’un devis est accepté, refusé ou archivé, il est retiré lors de la prochaine synchronisation automatique.
