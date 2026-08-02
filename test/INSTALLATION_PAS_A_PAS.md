# Installation V5.4.4 DOCUMENTS PORTAIL TEST

1. Remplacer les fichiers du dossier GitHub `test` par ceux de cette archive.
2. Dans Firebase > Firestore > Règles, publier `firestore.rules`.
3. Dans Firebase > Storage > Règles, publier `storage.rules`.
4. Recharger MyBusiness et l’espace client avec `Ctrl + F5`.
5. Ouvrir le devis déjà lié à la fiche mariage et le renvoyer par e-mail une fois : son PDF sera alors publié dans l’espace client.
6. Créer puis envoyer une facture pour vérifier le même fonctionnement.

L’e-mail reste envoyé même si la publication portail échoue ; MyBusiness affiche alors le motif de l’échec.
