# MyBusiness V7.5.10 PROD — REFUSÉS / SANS SUITE
- **V7.5.10 PROD** : classement des fiches mariage qui n’aboutissent pas dans un onglet « Refusés / sans suite », avec motif, conservation de l’historique, réactivation possible et prise en compte du dernier devis non accepté dans l’analyse commerciale.

# MyBusiness V7.5.4 TEST — DOMAINE ESPACE MARIAGE
- **V7.5.4 TEST** : tous les nouveaux liens générés ou envoyés aux clientes pointent vers `https://mariage.latelierfleursetsens.fr`. L’ancien `espace-client.html` reste présent et fonctionnel pour les liens déjà envoyés.

# MyBusiness V7.5.3 PROD — FACTURE 100 % PAYÉE = PRÉPARATION COMMANDE
- **V7.5.3 PROD** : une facture mariage totale à 100 % marquée payée fait désormais basculer automatiquement la fiche dans « Préparation commande ».
- **V7.5.1 PROD** : pour les mariages, la facture de solde propose automatiquement une échéance à J-1 mois de la date du mariage, tout en restant modifiable manuellement.

## Évolution V7.4.2
- Analyse commerciale calculée par fiche mariage.
- Une seule version de devis est comptée : la dernière version active associée à la fiche mariage.
- Les versions archivées / remplacées sont exclues des nombres, du CA gagné, du CA potentiel et du panier moyen.
- « Dossiers décidés » devient « Devis avec décision ».

- L’analyse commerciale mariage quitte le tableau de bord et rejoint l’onglet **Finances**.
- Finances est maintenant classé en **Vue d’ensemble / À encaisser / Analyse commerciale / Achats fournisseurs**.
- Le taux de transformation est calculé sur les décisions réelles : **devis acceptés ÷ (acceptés + refusés)**. Les devis encore en attente ne faussent plus le résultat.
- L’analyse affiche aussi le CA gagné, le CA potentiel encore en attente, le panier moyen accepté et le délai moyen d’acceptation lorsque la date est disponible.
- La liste des paiements restant à encaisser est conservée intégralement mais rangée par **Mariages** et **Ateliers**, avec détails repliés par défaut.
- Les ventes du mois sont synthétisées en une ligne et le détail est affiché uniquement via **Voir les ventes**.
- Aucun chiffre budgétaire détaillé n’est ajouté au tableau de bord.
- Les mécanismes devis/factures, la sécurité contre les modifications automatiques des devis et la fluidité V7.3.3 restent inchangés.

# MyBusiness V7.3.2 TEST — FLEURS PREMIUM VISIBLES À LA CRÉATION DU DEVIS

Lors de la création d’un devis depuis une fiche mariage, l’étape « Créations » affiche désormais un encart clair avec le choix des fleurs premium stabilisées et les quantités demandées par la cliente. Roses et pivoines : rappel +6 € par fleur (6 cm). Les autres fleurs restent indiquées « tarif sur devis ». Cet encart est informatif : il ne modifie jamais automatiquement un devis existant.

Ajout de la plaquette tarifaire bouquets et d’un choix de quantité pour chaque fleur premium stabilisée. Les modifications clientes restent enregistrées dans le portail et ne modifient jamais automatiquement un devis déjà créé dans MyBusiness.

# MyBusiness V7.0.8 PROD — HOTFIX SÉCURITÉ

Cette version bloque toute modification automatique des lignes, quantités, prix et montants des devis existants depuis l’espace client ou la fiche mariage. Les modifications clientes restent consultables dans les demandes mariage et devront être intégrées manuellement dans une future nouvelle version du devis.

# MyBusiness V7.0.7 PROD

## Étape 4 — Nouveaux articles

Ajout des créations détaillées demandées dans les catégories Mariée, Marié, Enfants, Témoins, Voiture, Décoration de salle et Cérémonie, dont le **mini bouquet de table**. Les quantités et les anciennes données restent compatibles.

## V7.0.7 PROD

- Après un envoi par e-mail confirmé par le Worker, le devis ou la facture passe automatiquement au statut **Envoyé(e)**.
- La date et l’heure précises ainsi que le mode d’envoi sont mémorisés.
- En cas d’échec de l’e-mail, le statut reste inchangé.
- Les boutons manuels **Marquer envoyé / Marquer envoyée** restent disponibles et sont distingués dans l’historique.

## V6.4.12 TEST
- Nouveau planning graphique des week-ends fondé sur le classement métier des fiches : Préparation commande, Livraison et Archives.
- Les dossiers encore dans Études mariage ne sont pas comptés.
- Rendez-vous téléphoniques indisponibles du 24 août au 6 septembre 2026 inclus dans l’espace client.


## Nouveautés

- Date d’échéance demandée à la création ou à la modification d’un devis.
- Échéance proposée par défaut à un mois, modifiable librement.
- Date d’échéance demandée pour les factures créées depuis un devis.
- Les factures directes conservent leur champ d’échéance, proposé à un mois.
- Les devis envoyés et non acceptés apparaissent dans le calendrier Apple.
- Les factures envoyées et non payées apparaissent dans le calendrier Apple.
- Dès qu’un devis est accepté/refusé ou qu’une facture est payée, l’échéance disparaît automatiquement du calendrier lors de la prochaine synchronisation.
- Les rendez-vous téléphoniques, livraisons, mariages et ateliers restent conservés dans l’historique du calendrier.

Aucune modification des règles Firebase ou du Worker Cloudflare n’est nécessaire.


## V6.4.0 — Suivi des modifications clientes
- Détail avant/après dans le mail de notification.
- Badge « Modification cliente » dans la liste des demandes.
- Mise en évidence des champs modifiés.
- Historique permanent avec date et heure.
- Bouton « Marquer comme consulté ».

## V6.4.3 TEST — Planning mariages compact

- Affichage automatique de l'année en cours et des deux années suivantes.
- Bouton « Ajouter une année » pour étendre le planning sans limite prédéfinie.
- Une case par week-end, avec le nombre exact de mariages confirmés.
- Seuls les mariages liés à une facture d'acompte marquée payée sont comptés.
- Clic sur une case occupée pour ouvrir le dossier correspondant ; choix proposé si plusieurs mariages sont présents.


## V6.4.4 TEST — Correctif facture d’acompte

- L’acompte est calculé sur le montant net du devis après remises, avoirs et ajustements.
- Exemple vérifié : 156,00 € - 10 % = 140,40 €, puis acompte 30 % = 42,12 €.
- La facture de solde est calculée sur le même montant net et déduit l’acompte exact.

## V6.4.12 TEST

- Barre de recherche globale centrée dans l’en-tête.
- Contraste renforcé des boutons de l’aperçu devis/facture.


## V7.0.7 PROD — Étape 1
- Réorganisation visuelle de « Mes besoins » par catégories.
- Ajout de deux guides visuels des tailles de bouquet.
- Aucune modification des données sauvegardées ni des anciens espaces clients.
- Mon projet, les inspirations clientes et le rendez-vous téléphonique restent inchangés.


## V7.0.7 PROD
- Fleurs premium détaillées : Rose, Pivoine, Hortensia, Camélia, Arum et Autre.
- Champ de précision affiché lorsque « Autre » est sélectionné.
- Migration non destructive de l’ancien texte libre vers la nouvelle structure.

## V7.0.7 PROD — Retrait à l’atelier

- Ajout de messages visibles dans l’espace client pour les compositions volumineuses.
- Composition de capot de voiture : retrait à l’atelier, livraison impossible.
- Centres de table, table d’honneur et décorations volumineuses : retrait à l’atelier.
- Décoration d’arche et grosses compositions de cérémonie : retrait à l’atelier.
- Aucun changement sur les données existantes, les inspirations ou les créneaux téléphoniques.


## V7.0.7 PROD
- Ajout d’une section « Autres demandes » avec un grand champ texte libre.
- Conservation du champ technique `autrePrestation` pour assurer la compatibilité avec les dossiers existants.
- Aucune modification des inspirations ni des créneaux téléphoniques.