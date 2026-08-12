# MyBusiness V7.7.0 SAFE — Base Firebase compressée

- Lecture compatible avec l'ancien champ `data` JSON.
- Migration automatique et atomique vers `dataGzipB64` (gzip + Base64).
- L'ancien champ `data` n'est supprimé qu'au sein de la transaction Firebase réussie.
- Les inspirations restent dans Firebase Storage : aucun fichier image n'est déplacé ou supprimé.
- Les sauvegardes JSON et Google Drive restent complètes et lisibles comme auparavant.
- Vérification de conflit multi-appareil conservée avec un numéro de révision.
- Transformation d'une demande : le statut portail n'est modifié qu'après sauvegarde Firebase réussie.
- Création/modification d'un devis : sauvegarde Firebase immédiate après l'action explicite.
- Seuil de sécurité : aucune écriture si la base compressée dépasse 850 000 caractères Base64.

IMPORTANT : lors du premier déploiement, fermer MyBusiness sur tous les appareils, déployer cette version, puis rouvrir d'abord sur un seul appareil et attendre le message « Base migrée et à jour » avant d'ouvrir les autres appareils.
