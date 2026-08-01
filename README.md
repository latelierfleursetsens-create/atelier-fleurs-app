# MyBusiness — V4.2.1 PROD

## Correctif mariage / devis V4.2.1

- Les changements d’e-mail et de téléphone sont maintenant enregistrés dans la fiche mariage, la fiche cliente et le devis lié.
- La synchronisation des coordonnées ne peut plus remettre les prix du devis à zéro.
- Les devis à 0 € sont restaurés depuis une facture ou commande liée lorsque cela est possible, sinon leur envoi est bloqué.


## Correction d’affichage de version

- Le tableau de bord affiche désormais **PROD V4.2.1 MODULAIRE**.
- L’onglet du navigateur affiche désormais **MyBusiness — PROD V4.2.1 MODULAIRE**.
- Les paramètres de cache des fichiers CSS et JavaScript ont été actualisés pour forcer le chargement de cette version.

## Correction apportée

Une réservation Squarespace rattachée à un atelier apparaît maintenant dans la fiche de cet atelier, **même lorsque l’atelier est classé comme atelier privé ou atelier en structure**.

La fiche affiche :

- le nom de la cliente ;
- le nombre de places achetées ;
- le paiement total ou l’acompte de 30 % ;
- le montant réellement encaissé ;
- le solde restant pour la commande ;
- le numéro de commande Squarespace.

Un bouton **Corriger la vente** permet de revenir directement à l’encaissement concerné.

La version répare également automatiquement les anciennes liaisons : à l’ouverture des données, une participante manquante est recréée dans le bon atelier et une ancienne liaison erronée est retirée.

## Test conseillé

1. Dans **Paiements et ventes du site**, modifier une commande et sélectionner le bon atelier.
2. Enregistrer la correction.
3. Ouvrir la fiche du nouvel atelier.
4. Vérifier la section **Réservations site / participantes**.
5. Le nom de la cliente et le nombre de places doivent apparaître.

> Version validée pour une installation dans le dossier de production.


## V4.2.0 PROD
- Différenciation visuelle des participantes ayant tout payé et de celles ayant encore un solde à régler le jour de l’atelier.
- Affichage du remplissage directement dans la liste des ateliers.
- Badge **COMPLET** lorsque le nombre de places réservées atteint la capacité prévue.


## V4.2.0 PROD

- Correction du compteur de remplissage des ateliers privés.
- La capacité utilise désormais `nbParticipantsPrevu` ou, pour les anciennes fiches privées, `nbPersonnes`.
- Un atelier privé de 10 places avec 10 places vendues affiche maintenant `10/10 places réservées` et le badge `COMPLET`.
