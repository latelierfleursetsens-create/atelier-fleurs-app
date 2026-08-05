# Installation V6.5.2 — Rappels automatiques des devis

Cette version utilise un Worker séparé afin de ne pas risquer de casser le Worker `atelier-fleurs-mail` déjà en production.

## 1. Créer le Worker

Dans Cloudflare > Workers & Pages :
1. Cliquez sur **Create application**.
2. Choisissez **Start with Hello World**.
3. Nom : `atelier-fleurs-reminders`.
4. Déployez, puis ouvrez **Edit code**.
5. Remplacez tout le code par le contenu de `worker.js`, puis cliquez sur **Deploy**.

## 2. Créer le stockage KV

1. Cloudflare > Storage & databases > KV.
2. Créez un namespace nommé `REMINDER_KV`.
3. Revenez dans le Worker > **Bindings** > **Add binding** > **KV namespace**.
4. Variable name : `REMINDER_KV`.
5. Sélectionnez le namespace `REMINDER_KV`, puis validez.

## 3. Ajouter les variables et secrets

Dans Worker > Settings > Variables and Secrets, ajoutez :

- `BREVO_API_KEY` — **Secret** — recopiez la même clé que dans `atelier-fleurs-mail`.
- `FIREBASE_API_KEY` — Variable — `AIzaSyCPuUcFt99zQsUI1lBDSEZkX-RJHtgs5BY`
- `ADMIN_UID` — Variable — UID Firebase du compte Google administrateur MyBusiness.
- `SENDER_EMAIL` — Variable — `latelierfleursetsens@gmail.com`
- `SENDER_NAME` — Variable — `L'Atelier Fleurs & Sens`

Ne partagez jamais la valeur de `BREVO_API_KEY` dans une capture.

## 4. Ajouter le déclencheur automatique

Dans Worker > Settings > Trigger events > Add > Cron Trigger :

`0 * * * *`

Le Worker est appelé chaque heure mais n'envoie les rappels qu'à 8 h, heure de Paris. Cette méthode reste correcte lors des changements heure d'été / heure d'hiver.

## 5. Configurer MyBusiness

Dans MyBusiness TEST > Paramètres > Rappels automatiques :
1. URL : l'adresse `https://atelier-fleurs-reminders....workers.dev`.
2. Saisissez votre adresse dans « Adresse utilisée pour l’e-mail de test ».
3. Cliquez sur **Tester la connexion**.
4. Cliquez sur **Envoyer un e-mail test**.
5. Activez J-14, J-7, J-2 et Jour J.
6. Activez les rappels automatiques, puis enregistrez.
7. Cliquez sur **Synchroniser maintenant**.

## 6. Test réel sans attendre 8 h

Créez un devis de test :
- statut `Envoyé` ;
- votre propre adresse e-mail ;
- échéance exactement dans 14 jours, 7 jours, 2 jours ou aujourd'hui.

Cliquez sur **Synchroniser maintenant**, puis **Exécuter les rappels maintenant**. Un rappel doit arriver. Le même rappel ne sera pas renvoyé une seconde fois grâce à la clé anti-doublon enregistrée dans KV.


## Important

Le Worker créé avec « Hello World » doit être remplacé par le contenu complet de `worker.js`. Sans cette étape, MyBusiness affichera « Failed to fetch » ou un service non configuré.
