# PRA MyBusiness — procédure de secours

## Objectifs
- RPO cible : 24 h maximum avec sauvegarde quotidienne, à réduire si plusieurs exports par jour sont conservés.
- Accès local aux données essentielles : moins de 15 minutes.
- Remise en ligne minimale : 1 à 4 h si les comptes et configurations de secours sont disponibles.
- Retour complet des services externes : cible inférieure à 24 h.

## Contenu indispensable à conserver hors GitHub/Firebase/Cloudflare
1. Dernier ZIP PROD MyBusiness.
2. Dernière sauvegarde JSON valide.
3. Ce dossier PRA et le lecteur `pra-local.html`.
4. Les fichiers `firestore.rules`, `storage.rules`, `firebase.json`.
5. Les dossiers `calendar-worker` et `reminder-worker`.
6. Les secrets/identifiants nécessaires aux services, stockés dans un gestionnaire de mots de passe séparé — jamais dans ce ZIP.

## Panne cloud : accès immédiat
1. Décompresser le dernier ZIP PROD sur un ordinateur.
2. Ouvrir `PRA/pra-local.html` dans le navigateur.
3. Cliquer sur le sélecteur de fichier et choisir la dernière sauvegarde JSON.
4. Consulter mariages, clients, devis, factures et ateliers en lecture seule.

## Restauration complète
1. Identifier si la panne est temporaire ou définitive.
2. Ne jamais écraser la production tant que la cause n’est pas comprise.
3. Recréer l’hébergement statique depuis le ZIP PROD.
4. Recréer Firebase (Firestore/Auth/Storage) avec les règles fournies.
5. Restaurer la dernière sauvegarde JSON validée.
6. Redéployer les Workers Cloudflare ou leurs équivalents.
7. Reconfigurer les URL/secrets.
8. Tester connexion, clients, mariages, devis, factures, paiements, inspirations, espace client, e-mails et calendrier.
9. Seulement après validation, rouvrir le service aux utilisateurs.

## Test mensuel conseillé
Une fois par mois : ouvrir `pra-local.html`, charger le dernier JSON et vérifier au minimum 3 mariages, 3 devis, 3 factures et le planning. Dans MyBusiness, marquer ensuite « Test PRA réussi ».
