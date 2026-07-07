# L’Atelier Fleurs & Sens — V3 TEST modulaire

Cette version part de la V2.1.1 TEST validée : prestations complémentaires atelier, devis/factures sans mentions internes bien/service côté client.

## Objectif de cette V3

Sortir du fichier HTML unique et passer progressivement vers une application organisée en dossiers :

- `index.html` : structure de la page uniquement.
- `css/style.css` : design.
- `assets/logo.jpg` : logo extrait du HTML.
- `js/app.js` : logique actuelle de l’application, extraite du fichier historique.
- `js/*.js` : fichiers préparés pour la phase 2, où chaque module sera séparé par métier.

## Important

Cette V3 est une phase 1 de modularisation : elle doit fonctionner comme la V2.1.1, mais avec CSS/JS séparés.
Pour ne pas casser l’application, toute la logique reste pour l’instant dans `js/app.js`.

## Test conseillé

1. Ouvrir `index.html`.
2. Vérifier l’affichage `TEST V3.0.0 MODULAIRE`.
3. Se connecter.
4. Tester un atelier avec prestation complémentaire.
5. Générer un devis et une facture.
6. Vérifier la trésorerie / ventilation URSSAF.

## Étape suivante

Découper progressivement `js/app.js` vers :

- `ateliers.js`
- `devis.js`
- `factures.js`
- `finances.js`
- `mariages.js`
- `clients.js`
- `dashboard.js`

Chaque découpage devra être testé avant de passer au module suivant.
