# MyBusiness — V5.4.4 DOCUMENTS PORTAIL TEST

Cette version publie automatiquement les devis et les factures dans l’espace client après leur envoi par e-mail.

- PDF sauvegardé dans Firebase Storage ;
- métadonnées enregistrées dans `portalDocuments` ;
- consultation et téléchargement depuis l’espace client ;
- validation en ligne des devis conservée ;
- synchronisation en temps réel pendant que la cliente est connectée.

Avant le test, publiez les fichiers `firestore.rules` et `storage.rules` dans Firebase.
