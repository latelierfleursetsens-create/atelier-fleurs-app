# MyBusiness V5.0 TEST — Portail mariage

Cette version ajoute un portail de demande mariage accessible via `portail-mariage.html`.

## Test
1. Ouvrir MyBusiness et se connecter.
2. Cliquer sur Clients puis Demandes mariage.
3. Cliquer sur Ouvrir le portail test.
4. Compléter et envoyer une demande.
5. Revenir dans MyBusiness et cliquer sur Actualiser.
6. Ouvrir la demande, compléter les notes et cliquer sur Créer la fiche mariage.

## Limitation volontaire
La version TEST échange les demandes via le stockage local du navigateur. Elle doit donc être testée sur le même navigateur et le même domaine que MyBusiness. La mise en production publique nécessitera une collection Firebase séparée, des règles Firestore sécurisées, Firebase Storage pour les photos et l’envoi d’e-mails.
