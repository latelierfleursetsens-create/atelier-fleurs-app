# L’Atelier Fleurs & Sens — V3.0.4 PROD modulaire

Cette version correspond à la V3.0.4 PROD modulaire avec correctif sur le calcul “À encaisser prochainement” des ateliers.

## Objectif de cette V3

Sortir du fichier HTML unique et passer progressivement vers une application organisée en dossiers :

- `index.html` : structure de la page uniquement.
- `css/style.css` : design.
- `assets/logo.jpg` : logo extrait du HTML.
- `js/app.js` : logique actuelle de l’application, extraite du fichier historique.
- `js/*.js` : fichiers préparés pour la phase 2, où chaque module sera séparé par métier.
- `docs/CHANGELOG.md` : journal des versions et des corrections.

## Nouveauté V3.0.4

- Correctif du calcul **À encaisser prochainement** : un atelier déjà couvert par une facture d’acompte, une facture de solde ou une facture totale liée à son devis n’est plus ajouté une seconde fois en “À facturer”.
- Les factures créées depuis un devis atelier héritent désormais automatiquement des informations atelier.
- Les anciennes factures déjà créées et liées au devis atelier sont reconnues, même si elles avaient été enregistrées comme factures de devis classiques.

## Nouveauté V3.0.3

Un bloc **Journal des modifications** apparaît sur le tableau de bord avec :

- la version active ;
- les dernières corrections ;
- les prochaines étapes prévues.

Cela permet de savoir rapidement ce qui a changé après la mise en production.

## Important

Cette V3 est la nouvelle base de production, avec une modularisation progressive : elle fonctionne comme la V2.1.1 / V3.0.3 TEST validée, mais avec CSS/JS séparés.
Pour ne pas casser l’application, toute la logique reste encore majoritairement dans `js/app.js`.

## Vérifications après mise en ligne

1. Ouvrir `index.html` ou le lien GitHub Pages.
2. Vérifier l’affichage `PROD V3.0.4 MODULAIRE`.
3. Vérifier que le bloc Journal des modifications est visible sur le tableau de bord.
4. Se connecter.
5. Tester le bouton `Ajouter le client` dans Fiches clientes.
6. Tester un atelier avec prestation complémentaire.
7. Générer un devis et une facture.
8. Vérifier la trésorerie / ventilation URSSAF.

## Étape suivante

Découper progressivement `js/app.js` vers :

- `clients.js`
- `ateliers.js`
- `devis.js`
- `factures.js`
- `finances.js`
- `mariages.js`
- `dashboard.js`

Chaque découpage devra être fait en TEST, puis validé avant d’être remis en production.
