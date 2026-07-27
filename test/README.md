# MyBusiness — V4.1.3 TEST

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
