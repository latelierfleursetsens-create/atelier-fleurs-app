# MyBusiness V5.2.2 SECURE TEST

Correctifs du portail cliente :

- autorisation sécurisée d'enregistrer uniquement la fiche du compte connecté ;
- ajout de plusieurs photos d'inspiration, en une ou plusieurs sélections ;
- limite de 6 photos et 5 Mo par image ;
- aperçu et suppression individuelle ;
- stockage des images dans Firebase Storage ;
- messages d'erreur explicites si les règles Firebase ne sont pas publiées.

## Important

Les fichiers `firestore.rules` et `storage.rules` doivent être publiés dans Firebase. Mettre uniquement les fichiers HTML sur GitHub ne suffit pas.

## V5.2.2 SECURE TEST
- Reprise des URL Firebase Storage dans l'onglet Inspirations de la fiche mariage.
- Restauration automatique des inspirations pour les fiches déjà créées depuis une demande sécurisée.
- Conservation des médias distants lors de la synchronisation cloud, sans stocker les images base64 volumineuses.

## Correctif V5.2.2
- Une fiche mariage supprimée est aussi retirée de la sauvegarde locale de secours.
- Les sauvegardes temporaires sont vidées après confirmation d'une synchronisation Firebase réussie.
- La suppression d'une fiche liée au portail remet la demande cliente à l'état non transformé, sans recréer automatiquement la fiche.

## V5.2.2 — Notification e-mail
Lors de la première transmission d'une demande depuis l'espace client, un e-mail est envoyé automatiquement à `latelierfleursetsens@gmail.com` via le Worker Cloudflare déjà utilisé par MyBusiness. Une modification ultérieure de la fiche ne déclenche pas un nouvel e-mail. Si l'envoi de l'alerte échoue, la demande reste enregistrée dans Firebase et apparaît dans MyBusiness.


## V5.2.2 SECURE TEST
- Ajout du choix de rendez-vous téléphonique (Oui/Non) et affichage des disponibilités.
- Enregistrement de ce choix dans la demande et affichage dans MyBusiness.
- Fenêtre de confirmation après l’enregistrement de la fiche.


## V5.2.2 — Créneaux téléphoniques
- Si la cliente demande un rendez-vous, elle choisit une date et une heure.
- Du samedi au lundi : créneaux de 9 h à 20 h, toutes les 30 minutes.
- Du mardi au vendredi : créneaux de 18 h à 20 h, toutes les 30 minutes.
- Le créneau est enregistré dans Firestore, affiché dans MyBusiness et repris dans l’e-mail automatique.


## Correctif V5.2.2 — alerte e-mail
L'alerte repose désormais sur `notificationEmailSentAt`. Elle est retentée tant qu'aucun envoi n'a été confirmé. En cas d'échec, le détail est enregistré dans `notificationEmailError` et affiché dans le portail.


## Correctif V5.2.2 — notification des modifications
- Envoi d’un e-mail « Demande mariage mise à jour » lorsqu’une cliente enregistre une modification réelle.
- Aucun e-mail lors d’une simple ouverture ou d’un enregistrement sans changement.
- En cas d’échec, l’alerte de modification est retentée lors de l’enregistrement suivant.
