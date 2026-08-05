# MyBusiness V6.5.0 TEST

## V6.5.0 TEST

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
