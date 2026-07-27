# Protocole de test — V4.1.0 TEST

## Cas principal

- Créer un atelier thématique site le 15/10/2026.
- Saisir 10 participants prévus et 30 € par personne.
- Enregistrer l’atelier.
- Dans Paiements et ventes du site, créer un paiement Atelier de 30 € et le rattacher à cet atelier.

Résultat attendu :

- CA prévu atelier : 300 €
- Encaissé : 30 €
- Reste : 270 €
- Places réservées : 1 / 10
- Places disponibles : 9
- Vente indépendante supplémentaire : 0 €
- Trésorerie / URSSAF du mois : +30 €

## Cas vente indépendante

- Créer une vente Box DIY de 19,90 €.

Résultat attendu :

- Vente indépendante : 19,90 €
- Trésorerie / URSSAF du mois : +19,90 €
- Aucun atelier modifié.

## Suppression

- Supprimer le paiement Squarespace de 30 €.

Résultat attendu :

- La participante liée disparaît de l’atelier.
- Encaissé atelier revient à 0 €.
- Reste atelier revient à 300 €.
- Places disponibles reviennent à 10.
