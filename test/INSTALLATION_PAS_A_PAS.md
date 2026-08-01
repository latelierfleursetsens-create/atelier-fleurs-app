# Installation V5.1.7 SECURE TEST

## 1. GitHub Pages

Remplacer tous les fichiers du dossier `test` par ceux de cette archive, puis attendre la fin du déploiement GitHub Pages.

## 2. Publier les règles Firestore

Dans Firebase : **Firestore Database > Règles**.

Remplacer tout le contenu par celui du fichier `firestore.rules`, puis cliquer sur **Publier**.

Ces règles conservent l'accès à la collection `bases`, reconnaissent l'administrateur et autorisent chaque cliente à créer, lire et modifier uniquement son document `portalProjects/{uid}`.

## 3. Publier les règles Storage

Dans Firebase : **Storage > Règles**.

Remplacer tout le contenu par celui du fichier `storage.rules`, puis cliquer sur **Publier**.

Ces règles autorisent chaque cliente à gérer uniquement les images placées dans `clientUploads/{uid}/...`, avec une limite de 5 Mo et uniquement des fichiers image.

## 4. Test

1. Forcer l'actualisation de `espace-client.html`.
2. Vérifier la mention **V5.1.7 SECURE TEST**.
3. Créer un compte cliente ou se connecter.
4. Sélectionner plusieurs photos à la fois.
5. Ajouter ensuite une autre photo : les premières doivent rester visibles.
6. Cliquer sur **Enregistrer ma fiche**.
7. Vérifier que la demande apparaît dans MyBusiness > Clients > Demandes mariage.
