## V3.2.0 TEST

- Nouveau tableau de bord allégé et orienté actions.
- La version reste visible en haut, mais le journal complet est déplacé.
- Le journal est accessible via le bouton `Notes de version` et dans `Paramètres > À propos de l’application`.
- Ajout des cartes rapides : à encaisser, devis en attente, ateliers à venir, mariages à venir.
- Ajout d’un bloc synthétique des 7 prochains jours.

## V3.1.2 TEST
- Ajout du centre de notifications prioritaires sur le tableau de bord.
- Alertes automatiques : factures échues, factures à encaisser sous 7 jours, devis à relancer, mariages proches, ateliers proches et stock bas.
- Ajout de boutons d'accès direct vers les documents ou fiches concernés.

## V3.1.1 TEST
- Correction du calcul “À encaisser prochainement” pour les ateliers avec prestations complémentaires.
- Si un devis atelier existe, son total devient la référence.
- Les factures liées au devis sont déduites du reste à facturer, même si elles ne sont pas encore payées.

# Changelog

## TEST V3.1.0 MODULAIRE

- Ajout de la bibliothèque de prestations dans les paramètres.
- Intégration des prestations actives dans les boutons rapides des prestations complémentaires atelier.
- Conservation du correctif V3.0.4 sur les encaissements ateliers.

# Journal des modifications

## V3.0.4 PROD — Correctif encaissements ateliers

- Correction du calcul **À encaisser prochainement**.
- Lorsqu’un atelier privé ou structure possède déjà une facture d’acompte, une facture de solde ou une facture totale liée à son devis, le montant global de l’atelier n’est plus ajouté en double dans “À facturer”.
- Les factures créées depuis un devis atelier héritent désormais automatiquement des informations atelier.
- Les anciennes factures déjà créées sont reconnues via le lien avec le devis atelier.

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
