# V4.2.0 TEST
- Ateliers multi-activités à une date et un lieu communs.
- Capacité, tarif, réservations et stock distincts par activité.
- Choix de l’activité dans les ventes Squarespace et les ajouts manuels.
- CA prévu calculé par activité, sans double comptage.
- Compatibilité conservée avec les ateliers à choix unique.

## V4.1.5 TEST

- Correction du remplissage dans la liste des ateliers privés.
- Compatibilité avec les fiches utilisant `nbPersonnes` comme capacité prévue.
- Affichage correct de `10/10` et du badge `COMPLET`.

## V4.1.4 TEST
- Statut visuel vert pour les participantes soldées.
- Statut orange avec montant restant pour les participantes ayant encore un solde.
- Remplissage X/Y et badge COMPLET dans la liste des ateliers.

# V4.1.3 TEST — Participantes Squarespace visibles dans les ateliers

- Affichage des réservations Squarespace dans tous les types d’ateliers, y compris privés et structures.
- Réparation automatique des participantes manquantes à partir de l’historique des ventes du site.
- Nettoyage automatique des anciennes liaisons lorsqu’une vente a été déplacée vers un autre atelier.
- Affichage du nom, du nombre de places, du type de paiement, du montant encaissé et du solde.
- Bouton **Corriger la vente** dans la fiche atelier.
- Suppression du bouton de suppression directe pour une participante liée à Squarespace afin de préserver la cohérence avec l’encaissement.

---

# V4.1.2 TEST — Correction des encaissements Squarespace

- Ajout d’un bouton **Modifier** dans l’historique Squarespace.
- Ajout d’un bouton **Corriger** dans l’historique des paiements de chaque atelier.
- Correction possible de l’atelier, des places, du type de paiement, du tarif et du montant encaissé.
- Suppression automatique de l’ancien rattachement avant création du nouveau.
- Recalcul immédiat des places et des montants des ateliers concernés.
- Contrôle anti-doublon du numéro de commande conservé, sans bloquer la commande en cours de modification.

---

# V4.1.1 TEST — Ateliers complets et commandes multi-places

- Tous les ateliers non annulés sont visibles dans la sélection Squarespace.
- Ajout du nombre de places réservées par commande.
- Décompte des places basé sur la quantité achetée.
- Ajout du prix unitaire et du montant contractuel total de la commande.
- Choix entre acompte de 30 % et paiement total.
- Historique enrichi avec quantité, type de paiement et montant contractuel.
- Compatibilité automatique avec les anciennes réservations, considérées comme une place.

# V4.1.0 TEST — Paiements Squarespace rattachés aux ateliers

- Nouveaux ateliers visibles immédiatement dans le sélecteur des opérations site.
- Tri des ateliers à venir avant les ateliers passés.
- Préremplissage du tarif par personne.
- Distinction explicite entre paiement atelier et vente indépendante.
- Calcul atelier : CA prévu unique, encaissé déduit, reste recalculé.
- Ajout du suivi des places réservées et disponibles.
- Suppression du doublon financier dans l’historique client pour les participantes Squarespace.
- Libellés de trésorerie et d’export clarifiés.

# V4.0.9 PROD — Tarif par personne des ateliers thématiques site

- Nouveau champ **Tarif par personne (€)** dans la fiche atelier.
- Calcul automatique du montant de référence avec le nombre de participants prévu.
- Finances reste la source unique d’affichage des montants.
- Préremplissage du montant lors de l’ajout manuel d’une participante.

# V4.0.8 PROD — Finances comme source unique

- Les montants à encaisser sont centralisés dans Finances.
- Les synthèses financières ont été retirées du module Ateliers.
