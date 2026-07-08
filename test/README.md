# L'Atelier Fleurs & Sens — V3.1.1 TEST MODULAIRE

Version de test basée sur la PROD V3.0.4.

## Nouveauté V3.1.1 TEST

- Ajout d’une bibliothèque de prestations dans **Paramètres**.
- Les prestations actives deviennent des boutons rapides dans les ateliers.
- Chaque prestation peut avoir un libellé, une catégorie interne bien/service, une quantité, un prix par défaut et un statut actif/inactif.
- Les catégories restent internes et ne s’affichent pas sur les documents clients.

## À tester

1. Aller dans **Paramètres > Bibliothèque de prestations**.
2. Ajouter ou modifier une prestation.
3. Enregistrer les paramètres.
4. Ouvrir un atelier.
5. Vérifier que les boutons rapides affichent les prestations actives.
6. Ajouter une prestation au devis atelier et vérifier le total.

## Base utilisée

- PROD V3.0.4 MODULAIRE — correctif encaissements ateliers.


## V3.1.1 TEST
Correctif du calcul “À encaisser prochainement” pour les ateliers : le total de référence reprend le devis lié, les prestations complémentaires sont incluses, et les factures d’acompte/solde reliées par devis sont déduites du reste à facturer.
