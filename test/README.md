# MyBusiness — V4.2.0 TEST

## Correction d’affichage de version

- Le tableau de bord affiche désormais **TEST V4.2.0 MODULAIRE**.
- L’onglet du navigateur affiche désormais **MyBusiness — TEST V4.2.0 MODULAIRE**.
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

> Toujours tester cette version dans le dossier `/test/` avant de la passer en production.


## V4.2.0 TEST
- Différenciation visuelle des participantes ayant tout payé et de celles ayant encore un solde à régler le jour de l’atelier.
- Affichage du remplissage directement dans la liste des ateliers.
- Badge **COMPLET** lorsque le nombre de places réservées atteint la capacité prévue.


## V4.2.0 TEST

- Correction du compteur de remplissage des ateliers privés.
- La capacité utilise désormais `nbParticipantsPrevu` ou, pour les anciennes fiches privées, `nbPersonnes`.
- Un atelier privé de 10 places avec 10 places vendues affiche maintenant `10/10 places réservées` et le badge `COMPLET`.
