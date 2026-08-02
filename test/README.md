# MyBusiness V5.4.1 CLIENT ONBOARDING TEST

## Espace cliente enrichi
- Nouveau **tableau de bord cliente** affiché après la connexion.
- Compte à rebours jusqu'au mariage, état du dossier, prochaine date et état du devis.
- Nouvel onglet **Mon planning** regroupant le rendez-vous téléphonique souhaité, la date de livraison/retrait et la date du mariage.
- La date et le mode de livraison définis dans MyBusiness sont synchronisés automatiquement vers l'espace cliente.
- Validation du devis en ligne avec confirmation explicite, identité de la cliente et date d'acceptation.
- La demande de modification d'un devis reste disponible.

## Installation
1. Remplacer les fichiers du dossier GitHub `test`.
2. Publier le fichier `firestore.rules` fourni : il autorise les champs de rendez-vous et les informations de validation du devis.
3. Recharger MyBusiness et le portail avec `Ctrl + F5`.
4. Dans MyBusiness, enregistrer une fiche mariage pour synchroniser la date de livraison vers le portail.

## Tests conseillés
- Connexion cliente par Google et par e-mail/mot de passe.
- Affichage du tableau de bord et du planning.
- Modification de la fiche cliente.
- Envoi d'un devis depuis MyBusiness puis validation en ligne.
- Vérification du passage automatique du devis à l'état « Accepté » dans MyBusiness.
