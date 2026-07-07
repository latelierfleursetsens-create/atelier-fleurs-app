# Journal des modifications — L’Atelier Fleurs & Sens

## V3.0.3 TEST — Journal des modifications

- Ajout d’un bloc **Journal des modifications** sur le tableau de bord.
- Affichage de la version active : `TEST V3.0.3 MODULAIRE`.
- Affichage des modifications récentes.
- Affichage des prochaines étapes prévues.
- Conservation du correctif V3.0.2 sur le bouton `Ajouter le client`.
- Conservation des prestations complémentaires ateliers et des mentions internes masquées côté client.

## V3.0.2 TEST — Correctif ajout client

- Correction renforcée du bouton `Ajouter le client` dans l’onglet `Fiches clientes`.
- Ajout d’un listener direct et prioritaire pour éviter que le clic ne soit bloqué par le découpage modulaire.

## V3.0.1 TEST — Premier correctif client

- Premier correctif sur l’ajout client après migration vers la V3 modulaire.

## V3.0.0 TEST — Architecture modulaire

- Passage d’un fichier HTML unique vers une structure en dossiers.
- Extraction du CSS dans `css/style.css`.
- Extraction de la logique principale dans `js/app.js`.
- Création de fichiers modules préparatoires : `clients.js`, `ateliers.js`, `devis.js`, `factures.js`, `finances.js`, etc.

## V2.1.1 TEST — Prestations complémentaires ateliers

- Ajout de prestations complémentaires dans les ateliers.
- Quantité, prix unitaire, total automatique.
- Ventilation URSSAF conservée en interne.
- Mentions `bien` / `service` masquées sur les devis et factures client.
