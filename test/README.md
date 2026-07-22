# MyBusiness — V4.0.7 TEST

## Nouveauté Finances

Dans **Finances > Trésorerie**, un nouveau bloc affiche désormais :

- le montant restant à encaisser pour les **ateliers** ;
- le montant restant à encaisser pour les **mariages** ;
- le **total général à encaisser** ;
- le détail de chaque dossier avec sa date, son statut et un bouton pour ouvrir directement la fiche.

Les montants sont calculés automatiquement après déduction des paiements déjà encaissés. Les ateliers annulés ou terminés et les mariages annulés, perdus ou terminés sont exclus.

## Test conseillé

1. Ouvrir **Finances > Trésorerie**.
2. Vérifier les trois indicateurs Ateliers, Mariages et Total.
3. Comparer un atelier avec son reste à encaisser affiché dans sa fiche.
4. Comparer un mariage avec le reste affiché dans son budget.
5. Cliquer sur **Ouvrir** depuis le tableau financier.

# MyBusiness — V4.0.6 TEST

## Nouveauté

- Ajout du statut **En attente de validation du devis** dans le menu déroulant des ateliers.
- Ce statut est désormais sélectionné par défaut lors de la création d’un nouvel atelier.
- Les statuts et les ateliers existants restent inchangés.
- La réservation automatique du stock continue de fonctionner dès l’enregistrement, y compris avec ce nouveau statut.

## Test conseillé

1. Créer un nouvel atelier.
2. Vérifier que le statut par défaut est **En attente de validation du devis**.
3. Enregistrer et contrôler que l’atelier apparaît dans le groupe correspondant.
4. Passer ensuite le statut à **Booké** et vérifier le déplacement dans la liste.


## Répartition immédiate des participants

Cette version corrige l’ergonomie de la sélection multi-ateliers.

- Dès qu’un type d’atelier est coché, le champ **Participants pour cette création** apparaît immédiatement.
- Il n’est plus nécessaire d’enregistrer puis de rouvrir l’atelier.
- Plusieurs créations peuvent toujours être sélectionnées.
- Le total des participants reste obligatoire et doit correspondre à la somme répartie.
- Le stock réel est toujours déduit uniquement lors de l’enregistrement de l’atelier.

## Test conseillé

1. Créer un nouvel atelier.
2. Cocher un premier type de création et vérifier que le champ participants apparaît immédiatement.
3. Cocher un second type et saisir les deux répartitions.
4. Vérifier le récapitulatif du total.
5. Enregistrer et contrôler la déduction du stock.
