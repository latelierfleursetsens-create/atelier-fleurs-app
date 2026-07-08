# L'Atelier Fleurs & Sens — V3.1.2 TEST MODULAIRE

Version de test basée sur la V3.1.1 TEST validée.

## Nouveauté V3.1.2 TEST

Ajout d'un **centre de notifications prioritaires** sur le tableau de bord.

Il remonte automatiquement :

- les factures échues ;
- les factures à encaisser dans les 7 prochains jours ;
- les devis envoyés depuis plus de 7 jours à relancer ;
- les mariages proches ;
- les ateliers prévus sous 7 jours ;
- les alertes de stock bas.

Chaque ligne possède un bouton **Ouvrir** pour aller directement vers le devis, la facture, l'atelier, le mariage ou le stock.

## À tester

1. Ouvrir le tableau de bord.
2. Vérifier que le bloc **Centre de notifications** apparaît sous le journal de version.
3. Tester les boutons **Ouvrir** sur une facture, un devis ou un atelier.
4. Vérifier qu'aucune donnée n'est modifiée automatiquement : c'est uniquement un assistant de suivi.

## Base utilisée

- V3.1.1 TEST — correctif encaissements ateliers.
- V3.1.0 TEST — bibliothèque de prestations.
- PROD V3.0.4 — architecture modulaire et correctifs encaissements.
