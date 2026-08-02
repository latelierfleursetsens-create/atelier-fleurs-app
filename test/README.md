# MyBusiness V5.3.2 SECURITY TEST

## Sécurité administrateur
- Connexion administrateur uniquement avec Google.
- Validation en deux étapes et alertes de connexion gérées par Google.
- Refus automatique des comptes Google non autorisés par le document `admins/{uid}`.
- Déconnexion automatique après 30 minutes d’inactivité.
- Journal des connexions réussies et des déconnexions automatiques dans `adminSecurityLogs`.
- Badge visuel « Connexion sécurisée Google ».

## Mise en place
1. Mettre les fichiers dans le dossier GitHub `test`.
2. Publier également `firestore.rules` afin d’autoriser le journal de sécurité.
3. Recharger avec Ctrl + F5.

Le portail cliente conserve sa connexion e-mail/mot de passe.

# MyBusiness V5.3.0 SECURITY TEST

## Sécurité administrateur renforcée

Cette version migre le compte administrateur vers **Se connecter avec Google**. Le portail cliente conserve son accès e-mail/mot de passe inchangé.

### Première activation
1. Dans Firebase > Authentication > Méthode de connexion, activez **Google** et sélectionnez l’adresse d’assistance du projet.
2. Vérifiez dans Authentication > Paramètres > Domaines autorisés que `latelierfleursetsens-create.github.io` est présent.
3. Mettez cette version dans le dossier GitHub `test`, puis rechargez avec Ctrl + F5.
4. Ouvrez « Première activation », connectez-vous une dernière fois avec l’ancien mot de passe administrateur.
5. Cliquez sur « Lier et sécuriser avec Google » et choisissez exactement le compte Google correspondant à l’adresse administrateur.
6. Après validation, l’ancien fournisseur mot de passe est retiré du compte administrateur.

### Connexions suivantes
Utilisez uniquement **Se connecter avec Google**. La validation en deux étapes, les clés d’accès et les alertes de connexion inhabituelle sont alors gérées par le compte Google.

### Important
- Ne supprimez pas le document `admins/{uid}` : la liaison conserve le même UID Firebase.
- N’utilisez pas une autre adresse Google pendant la migration.
- Testez exclusivement dans le dossier `test` avant toute mise en production.
- Cette version ne modifie ni le portail cliente, ni les demandes mariage, ni les devis/factures.


## Connexion cliente Google
- Les clientes peuvent se connecter ou créer leur espace avec Google.
- La connexion e-mail/mot de passe reste disponible.
- Si une adresse existe déjà avec un mot de passe, le portail demande ce mot de passe une seule fois afin de lier Google au même UID et au même dossier.
- Aucune modification des règles Firebase n’est nécessaire.
