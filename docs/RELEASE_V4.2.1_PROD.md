# Version V4.2.1 PROD

Correctif de sécurité pour les dossiers mariage et les devis liés.

## Corrections

- L’enregistrement d’un nouvel e-mail ou téléphone dans une fiche mariage met à jour la fiche cliente et le devis lié.
- Une modification de coordonnées ne reconstruit plus les lignes du devis.
- Les prix déjà saisis dans le devis sont conservés lors d’une modification des créations ou prestations complémentaires.
- Une synchronisation qui ferait passer un devis payant à 0 € est refusée.
- Lorsqu’un devis déjà passé à 0 € possède une facture ou une commande liée avec ses anciennes lignes, son montant est restauré automatiquement à l’aperçu, au téléchargement ou avant l’envoi.
- En l’absence de source de restauration, l’envoi et le téléchargement d’un devis à 0 € sont bloqués afin d’éviter un envoi erroné.
