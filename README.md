# MyBusiness — V4.0.3 PROD

## Stock automatique à l’enregistrement

Cette version réserve le matériel dès l’enregistrement d’un atelier programmé.

- Le nombre total de participants reste obligatoire.
- Plusieurs créations peuvent être associées au même atelier.
- La somme des participants répartis par création doit correspondre au total.
- Le stock est déduit automatiquement lors de l’enregistrement.
- Une modification ajuste automatiquement les quantités déjà réservées.
- Une annulation ou une suppression réintègre automatiquement le stock.
- Le stock peut devenir négatif afin de faire apparaître immédiatement les achats à prévoir.

## Test conseillé

1. Créer un atelier avec plusieurs créations.
2. Répartir les participants et enregistrer.
3. Vérifier la diminution immédiate des articles concernés dans Matériel.
4. Modifier le nombre de participants et vérifier l’ajustement.
5. Annuler l’atelier et vérifier la réintégration complète.
6. Refaire le test en supprimant un atelier.
