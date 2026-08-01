# MyBusiness V5.1.5 SECURE TEST

Correctifs du portail cliente :

- autorisation sécurisée d'enregistrer uniquement la fiche du compte connecté ;
- ajout de plusieurs photos d'inspiration, en une ou plusieurs sélections ;
- limite de 6 photos et 5 Mo par image ;
- aperçu et suppression individuelle ;
- stockage des images dans Firebase Storage ;
- messages d'erreur explicites si les règles Firebase ne sont pas publiées.

## Important

Les fichiers `firestore.rules` et `storage.rules` doivent être publiés dans Firebase. Mettre uniquement les fichiers HTML sur GitHub ne suffit pas.
