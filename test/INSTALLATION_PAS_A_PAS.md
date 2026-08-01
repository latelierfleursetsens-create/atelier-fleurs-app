# Installation pas à pas — V5.1.3 SECURE TEST

## A. Créer le droit administrateur

1. Firebase > Authentication > Utilisateurs.
2. Copier l’UID du compte utilisé dans MyBusiness.
3. Firebase > Firestore Database > Données.
4. Créer la collection `admins`.
5. Créer un document dont l’identifiant est exactement l’UID copié.
6. Ajouter le champ `role`, type chaîne, valeur `admin`.

## B. Publier les règles Firestore

1. Firestore Database > Règles.
2. Sauvegarder le texte actuel dans un fichier local.
3. Copier tout le contenu de `firestore.rules`.
4. Remplacer les règles affichées.
5. Cliquer sur Publier.

## C. Publier les règles Storage

1. Storage > Règles.
2. Copier tout le contenu de `storage.rules`.
3. Remplacer les règles affichées.
4. Cliquer sur Publier.

## D. Mettre les fichiers en ligne

Mettre tous les fichiers du dossier sur l’hébergement de test, en conservant les dossiers `assets`, `css`, `js` et `docs`.

Liens :
- MyBusiness : `index.html`
- Espace cliente : `espace-client.html`
- Ancien lien portail : `portail-mariage.html` redirige vers l’espace sécurisé.

## E. Test complet

1. Ouvrir `espace-client.html` dans une navigation privée.
2. Créer un compte cliente de test.
3. Remplir le formulaire et ajouter deux photos.
4. Enregistrer.
5. Ouvrir MyBusiness avec le compte administrateur.
6. Vérifier la demande dans Demandes mariage.
7. Ouvrir la demande et créer la fiche mariage.
8. Créer un devis lié, puis passer son statut à Envoyé.
9. Revenir dans l’espace cliente et ouvrir Devis et factures.
10. Valider le devis.
11. Vérifier dans MyBusiness que le devis passe à Accepté.
12. Créer une facture liée et la passer à Envoyée.
13. Vérifier qu’elle apparaît dans l’espace cliente.
