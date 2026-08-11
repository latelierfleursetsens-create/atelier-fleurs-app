# MyBusiness V7.6.0 SAFE

Cette version part de V7.5.11 PROD et remplace le mécanisme de sauvegarde automatique de la base principale par un enregistrement manuel contrôlé.

## Fonctionnement
- Aucune écriture automatique de la base principale après une simple modification.
- Une modification affiche `🟠 Modifications non enregistrées` et le bouton `💾 Enregistrer`.
- Les boutons explicites `Enregistrer` des fiches mariage/demandes déclenchent aussi l'enregistrement contrôlé.
- En quittant une fiche avec des modifications non enregistrées, MyBusiness propose de les enregistrer avant de continuer.
- Le cache local de la base n'est plus chargé au démarrage afin qu'une ancienne copie locale ne puisse pas remplacer la base en ligne.
- La sauvegarde Google Drive automatique au démarrage est désactivée. Le téléchargement manuel JSON reste disponible.

## Multi-appareil
Au moment de l'enregistrement, une transaction relit la version serveur et fusionne les collections fiche par fiche.
- Deux appareils modifiant des fiches différentes : fusion automatique.
- Deux appareils modifiant la même fiche : enregistrement bloqué, aucune version n'est écrasée.

## Conservé
Firebase reste utilisé pour l'authentification, l'espace client sécurisé, les documents portail, les inspirations et les fonctions calendrier/rappels nécessaires.
