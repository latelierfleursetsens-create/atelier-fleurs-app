# MyBusiness V7.7.1 SAFE — Réparation transformations orphelines

Cette version conserve le stockage Firebase compressé V7.7.0.

Correction :
- une demande `transformee` n'est classée dans « Transformées en mariage » que si une fiche mariage liée existe réellement ;
- une demande transformée sans fiche liée est affichée dans « Nouvelles demandes » avec l'alerte « Transformation incomplète » ;
- le bouton « Recréer la fiche mariage » permet de réparer le dossier ;
- si une fiche existe déjà via `sourceDemandeId`, elle est réutilisée et aucun doublon n'est créé ;
- aucune demande, fiche, devis ou inspiration n'est supprimé automatiquement.
