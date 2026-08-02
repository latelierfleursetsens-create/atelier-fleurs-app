# MyBusiness — V5.4.5 VALIDATION DEVIS TEST

Cette version conserve la publication automatique des devis et factures dans l’espace client et ajoute :

- un message de confirmation client sans mention du fonctionnement interne de MyBusiness ;
- un e-mail envoyé à Élodie lorsqu’une cliente valide un devis en ligne ;
- un e-mail de confirmation envoyé à la cliente ;
- un bandeau horodaté dans l’espace client après validation ;
- le passage automatique du devis au statut « Accepté » dans MyBusiness, sauvegardé dans la base cloud ;
- un nouveau texte pour l’e-mail d’envoi des devis, expliquant la disponibilité dans « Mon espace mariage » et la validation en ligne.

## Mise en ligne

1. Remplacer les fichiers du dossier GitHub `test`.
2. Publier le fichier `firestore.rules` dans Firebase → Firestore → Règles.
3. Les règles Storage de la V5.4.4 restent valables.
4. Recharger MyBusiness et l’espace client avec `Ctrl + F5`.

## Test conseillé

1. Envoyer un devis lié à une cliente disposant d’un espace mariage.
2. Ouvrir le devis depuis l’espace client.
3. Le valider en ligne.
4. Vérifier :
   - le nouveau message de confirmation ;
   - le bandeau de validation horodaté ;
   - l’e-mail reçu par Élodie ;
   - l’e-mail reçu par la cliente ;
   - le devis déplacé dans « Acceptés » dans MyBusiness.
