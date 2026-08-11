# MyBusiness V7.6.3 SAFE

- Aucun chargement de cache local comme base de référence.
- Aucun `afs_pending_mariages` ne peut réinjecter une fiche supprimée ou ancienne.
- Aucun `afs_portal_requests` historique ne peut réinjecter une demande ou une inspiration.
- Les demandes clientes arrivent uniquement via Firebase `portalProjects` en temps réel.
- La base principale est écrite uniquement via le bouton Enregistrer et transaction contrôlée.
- Les conflits multi-appareils restent comparés champ par champ.
- Les inspirations restent stockées durablement dans Firebase Storage avant rattachement à la fiche.
