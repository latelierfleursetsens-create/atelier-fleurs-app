# Installation V5.3.2 SECURITY TEST

1. Vérifier que Google est activé dans Firebase Authentication.
2. Vérifier que `latelierfleursetsens-create.github.io` figure dans les domaines autorisés.
3. Remplacer les fichiers du dossier GitHub `test`.
4. Publier les nouvelles règles Firestore contenues dans `firestore.rules`.
5. Ouvrir la version test et effectuer Ctrl + F5.
6. Se connecter exclusivement avec le compte Google administrateur.

La session est fermée automatiquement après 30 minutes sans activité.

# Installation V5.3.0 SECURITY TEST

## 1 — Activer Google dans Firebase
- Firebase > Authentication > Méthode de connexion.
- Cliquez sur **Ajouter un fournisseur** puis **Google**.
- Activez le fournisseur.
- Sélectionnez l’e-mail d’assistance du projet.
- Enregistrez.

## 2 — Vérifier le domaine GitHub
- Firebase > Authentication > Paramètres > Domaines autorisés.
- Vérifiez la présence de `latelierfleursetsens-create.github.io`.
- Ajoutez-le s’il manque.

## 3 — Mettre la version en test
- Remplacez les fichiers du dossier GitHub `test` par ceux de l’archive.
- Rechargez MyBusiness avec Ctrl + F5.

## 4 — Migration unique de l’administrateur
- Dépliez « Première activation : utiliser encore mon ancien mot de passe ».
- Connectez-vous avec le compte administrateur actuel.
- Cliquez sur « Lier et sécuriser avec Google ».
- Choisissez le compte Google ayant exactement la même adresse e-mail.
- Une fois terminé, reconnectez-vous avec le bouton Google.

## 5 — Vérification
- Fermez la session.
- Cliquez sur « Se connecter avec Google ».
- Vérifiez que MyBusiness s’ouvre et que les données sont présentes.

Aucune modification des règles Firestore ou Storage n’est nécessaire.
