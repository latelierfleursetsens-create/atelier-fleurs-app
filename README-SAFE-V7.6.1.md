# MyBusiness V7.6.1 SAFE

## Inspirations mariage sécurisées

- Les nouvelles photos de fiche mariage sont compressées puis envoyées dans Firebase Storage.
- L’application vérifie que le fichier existe réellement dans Storage avant de l’afficher comme prêt.
- Après l’ajout, la photo porte l’état **À enregistrer**. La fiche n’est modifiée dans la base commune qu’après clic sur **💾 Enregistrer**.
- Les anciennes inspirations intégrées uniquement sous forme de data URL sont migrées vers Firebase Storage lors du prochain enregistrement de leur fiche.
- Une photo enregistrée est référencée par son URL permanente et son `storagePath`, ce qui permet son affichage sur les autres appareils connectés au même compte administrateur.
- Une suppression dans la fiche ne supprime pas immédiatement le fichier physique dans Storage : elle attend l’enregistrement de la fiche et ne peut donc pas détruire une image à cause d’un simple rafraîchissement/conflit.
- La protection multi-appareil de V7.6.0 reste active : si la même fiche a été modifiée ailleurs, l’enregistrement est bloqué plutôt que d’écraser l’autre version.
