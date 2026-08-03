# MyBusiness V6.2.0 PROD

Ajout des ajustements commerciaux lors de la création ou modification des devis et factures : remise en pourcentage, remise fixe, avoir et montant fixe positif ou négatif. Les montants sont recalculés dans l’éditeur, le PDF et le versioning.

# Historique de base V6.0.1 PROD

## Nouveauté

- Calendrier MyBusiness avec rendez-vous téléphoniques, livraisons et dates de mariage.
- Abonnement iCalendar privé pour le calendrier natif de l’iPhone.
- Mise à jour automatique du flux après les modifications enregistrées dans MyBusiness.
- Date et heure du rendez-vous téléphonique visibles dans la fiche mariage.

## Important

L’abonnement automatique nécessite le déploiement du Worker Cloudflare fourni dans le dossier `calendar-worker`. Suivre `CALENDRIER_APPLE_INSTALLATION.md`.


## Calendrier Apple synchronisé

La V6.0.1 publie un flux iCalendar privé via un Worker Cloudflare. Consulte `CALENDRIER_APPLE_INSTALLATION.md` avant d’activer l’abonnement dans MyBusiness.
