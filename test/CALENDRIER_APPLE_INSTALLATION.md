# Installation du calendrier Apple synchronisé — MyBusiness V6.0.1

Cette installation est à réaliser **une seule fois**. Ensuite, les rendez-vous téléphoniques, les livraisons/retraits et les dates de mariage renseignés dans MyBusiness seront publiés automatiquement dans un calendrier auquel l’iPhone est abonné.

## Ce que le calendrier contient

- Rendez-vous téléphoniques : heure précise, durée de 30 minutes.
- Livraisons ou retraits : événement sur la journée.
- Dates de mariage : événement sur la journée.

Le calendrier ne donne aucun accès à MyBusiness, aux finances, aux devis ou aux factures. Le lien d’abonnement reste toutefois privé : toute personne qui le possède peut lire les événements du calendrier.

## A. Créer le stockage KV dans Cloudflare

1. Ouvrir le tableau de bord Cloudflare.
2. Aller dans **Storage & Databases → KV**.
3. Cliquer sur **Create namespace**.
4. Nommer le namespace : `CALENDAR_KV`.
5. Valider.

## B. Créer le Worker calendrier

1. Aller dans **Compute → Workers & Pages**.
2. Cliquer sur **Create → Worker**.
3. Nommer le Worker exactement : `atelier-fleurs-calendar`.
4. Ouvrir **Edit code**.
5. Remplacer tout le code par le contenu de `calendar-worker/worker.js`.
6. Cliquer sur **Deploy**.

L’adresse attendue par MyBusiness est :

`https://atelier-fleurs-calendar.latelierfleursetsens.workers.dev`

## C. Relier le Worker au stockage KV

1. Dans le Worker `atelier-fleurs-calendar`, ouvrir **Settings → Bindings**.
2. Ajouter un binding de type **KV Namespace**.
3. Variable : `CALENDAR_KV`.
4. Namespace : `CALENDAR_KV`.
5. Enregistrer puis redéployer le Worker si Cloudflare le demande.

## D. Vérifier le service dans MyBusiness

1. Mettre en ligne les fichiers V6.2.0 PROD.
2. Ouvrir **Calendrier** dans MyBusiness.
3. Cliquer sur **Vérifier le service**.
4. Le badge doit indiquer **Service prêt**.
5. Cliquer sur **Activer l’abonnement**.
6. Cliquer sur **Mettre à jour maintenant**.

## E. Ajouter le calendrier dans l’iPhone

Méthode depuis l’iPhone :

1. Ouvrir MyBusiness sur l’iPhone.
2. Aller dans **Calendrier**.
3. Cliquer sur **Ouvrir l’abonnement**.
4. Confirmer l’ajout dans Calendrier Apple.

Méthode manuelle :

1. Dans MyBusiness sur le PC, cliquer sur **Copier le lien**.
2. Faire parvenir ce lien sur l’iPhone de façon privée.
3. Sur l’iPhone : **Calendrier → Calendriers → Ajouter un calendrier → Ajouter un calendrier avec abonnement**.
4. Coller le lien HTTPS privé et valider.

## Fonctionnement quotidien

Après chaque enregistrement synchronisé dans MyBusiness, le calendrier est republié automatiquement. Apple décide ensuite du moment de rafraîchissement de l’abonnement : une modification peut prendre quelques minutes avant d’apparaître sur l’iPhone.

Les modifications doivent être faites dans MyBusiness. Un calendrier par abonnement est en lecture seule dans l’iPhone.

## En cas de fuite du lien privé

Dans **MyBusiness → Calendrier**, cliquer sur **Régénérer le lien**. L’ancien lien devient inutilisable après la nouvelle publication. Il faudra remplacer l’abonnement sur l’iPhone par le nouveau lien.

## Dépannage

- **Service non configuré** : vérifier le binding `CALENDAR_KV`.
- **Accès administrateur refusé** : se reconnecter à MyBusiness avec le compte Google administrateur.
- **Calendrier introuvable** : cliquer sur **Mettre à jour maintenant** après l’activation.
- **Événements en retard sur l’iPhone** : patienter ; le délai de rafraîchissement est contrôlé par Apple.
