# MyBusiness — V4.1.0 TEST

## Objectif de la version

Séparer clairement les **paiements de places d’atelier reçus via Squarespace** des **ventes internet indépendantes**, afin d’éviter tout double affichage du chiffre d’affaires contractuel.

## Nouveautés

- La liste des ateliers proposée dans **Paiements et ventes du site** est reconstruite à chaque ouverture.
- Tous les ateliers thématiques non annulés apparaissent, avec les prochains ateliers en premier.
- Le tarif par personne enregistré dans l’atelier est automatiquement repris.
- Une réservation Squarespace est enregistrée comme **paiement rattaché à l’atelier**.
- Le paiement diminue le reste à encaisser, sans créer un second CA contractuel.
- Les ventes de box, produits et autres commandes restent des ventes indépendantes.
- Chaque atelier thématique dispose d’un bloc **Places et paiements** : CA prévu, encaissé, reste, réservations et places disponibles.
- Les historiques distinguent désormais « Paiement atelier » et « Vente indépendante ».

## Exemple de contrôle

Atelier de 10 personnes à 30 € :

- CA prévu de l’atelier : **300 €**
- 1 place payée sur Squarespace : **30 € encaissés**
- Reste à encaisser : **270 €**
- CA contractuel supplémentaire créé par la réservation : **0 €**
- CA réellement encaissé à déclarer à cet instant : **30 €**

## Tests conseillés avant passage en PROD

1. Créer un nouvel atelier thématique de 10 places à 30 € et l’enregistrer.
2. Ouvrir **Clients → Paiements et ventes du site** et vérifier qu’il apparaît immédiatement.
3. Enregistrer une place payée 30 € sur Squarespace.
4. Vérifier dans l’atelier : 1 place réservée, 9 restantes, 30 € encaissés et 270 € restant à encaisser.
5. Vérifier dans Finances que le CA encaissé du mois augmente seulement de 30 €.
6. Enregistrer une Box DIY à 19,90 € et vérifier qu’elle apparaît comme vente indépendante.

Cette version est une version **TEST**. Conserver la V4.0.9 PROD jusqu’à validation complète.
