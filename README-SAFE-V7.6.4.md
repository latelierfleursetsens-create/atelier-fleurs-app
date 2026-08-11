# MyBusiness V7.6.4 SAFE

## Sauvegarde Google Drive nocturne sécurisée

- Déclenchement automatique à 23 h 05 si MyBusiness est ouvert.
- Si MyBusiness est ouvert après 23 h 05 et que la sauvegarde du jour n'a pas encore été faite, une tentative est lancée après chargement.
- Verrou Firebase partagé : un seul appareil obtient le droit de lancer la sauvegarde automatique du jour.
- Le script Google Apps Script utilise aussi `LockService` pour sérialiser les appels simultanés.
- Un seul fichier physique par date : `sauvegarde-atelier-fleurs-AAAA-MM-JJ.json`.
- Si un appel du même jour arrive malgré tout, le fichier du jour est mis à jour au lieu d'en créer un second.
- Rétention glissante : 365 sauvegardes quotidiennes maximum. À la 366e journée, seule la plus ancienne est placée dans la corbeille.
- La sauvegarde nocturne utilise la dernière base validée dans Firebase ; les modifications locales non enregistrées ne sont pas incluses.
- Aucune restauration automatique depuis Google Drive.

## Important — Google Apps Script

Le fichier `apps-script-sauvegarde-drive-propre.js` inclus dans cette archive est la nouvelle version du script Drive. Le déploiement MyBusiness ne peut pas modifier à lui seul un Google Apps Script déjà publié : il faut remplacer le code du projet Apps Script existant par ce fichier puis créer/mettre à jour le déploiement Web App. L'URL du script doit rester renseignée dans Paramètres > Sauvegarde automatique Google Drive.
