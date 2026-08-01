# MyBusiness V5.1.3 SECURE TEST

## Périmètre figé

1. La future mariée crée son compte avec son e-mail et un mot de passe.
2. Elle remplit le formulaire et ajoute ses photos.
3. Sa demande apparaît dans **MyBusiness > Demandes mariage**.
4. L’administratrice consulte, complète et valide la demande.
5. Le bouton **Créer la fiche mariage** crée une fiche liée au compte Firebase de la cliente.
6. Les devis envoyés et les factures envoyées apparaissent dans son espace.
7. La cliente peut consulter le détail d’un devis, le valider ou demander une modification.
8. La validation est répercutée dans MyBusiness.

## Installation obligatoire

### 1. Compte administrateur
Dans **Firebase Authentication > Utilisateurs**, copier l’UID du compte utilisé pour ouvrir MyBusiness.

Dans **Firestore > Données**, créer :

- collection : `admins`
- identifiant du document : `VOTRE_UID`
- champ : `role` (chaîne) = `admin`

### 2. Règles Firestore
Dans **Firestore > Règles**, remplacer le contenu par `firestore.rules`, puis publier.

### 3. Règles Storage
Dans **Storage > Règles**, remplacer le contenu par `storage.rules`, puis publier.

### 4. Hébergement
Mettre en ligne l’ensemble du dossier, sans modifier les chemins. Le lien transmis aux futures mariées est :

`espace-client.html`

## Comportement des documents

- Un devis apparaît après passage au statut **Envoyé**, **Accepté** ou **Refusé** dans MyBusiness.
- Une facture apparaît après passage au statut **Envoyée** ou **Payée**.
- Un brouillon n’est jamais visible dans l’espace cliente.
- Une validation cliente fait passer le devis correspondant au statut **Accepté** dans MyBusiness.

## Sécurité

- Une cliente ne peut lire que son projet et ses documents.
- Elle ne peut pas modifier les montants, lignes, statuts administratifs ou factures.
- Elle peut uniquement enregistrer son formulaire, gérer ses propres photos et indiquer sa décision sur un devis.
- Les photos sont limitées à 5 Mo et aux fichiers image.


## Correctifs V5.1.2
- Vérification obligatoire du document administrateur `admins/{uid}` avant ouverture de MyBusiness.
- Écran Demandes mariage clarifié comme file d’attente sécurisée.
- Les demandes Firestore apparaissent automatiquement, sans import manuel obligatoire.
- Consultation, enregistrement et transformation en fiche mariage conservés.

## Correctif V5.1.3
- Isolation complète de la session Firebase de l'espace client grâce à une application Firebase nommée `clientPortal`.
- Persistance cliente limitée à l'onglet (`SESSION`).
- Une connexion cliente ne remplace plus la session administratrice MyBusiness ouverte dans un autre onglet.
- Les erreurs de chargement Firestore ne provoquent plus un retour trompeur à l'écran de connexion.
