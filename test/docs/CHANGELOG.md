# V4.0.7 TEST — Argent à encaisser dans Finances

- Ajout des cartes **Ateliers à encaisser**, **Mariages à encaisser** et **Total à encaisser**.
- Ajout d’un tableau détaillé des dossiers restant à payer.
- Déduction automatique des paiements déjà encaissés.
- Exclusion des dossiers annulés, perdus ou terminés.
- Accès direct aux fiches atelier et mariage depuis Finances.

# V4.0.6 TEST — Statut devis en attente

- Ajout de **En attente de validation du devis** aux statuts des ateliers.
- Nouveau statut utilisé par défaut à la création.
- Ajout du groupe correspondant dans la liste des ateliers.
- Aucun changement sur la logique de réservation automatique du stock.

# V4.0.4 TEST — Répartition immédiate des participants

- Correction du sélecteur multi-ateliers.
- Affichage immédiat du champ de participants dès qu’une création est cochée.
- Suppression de l’étape inutile consistant à enregistrer puis rouvrir l’atelier.
- Conservation du contrôle obligatoire entre le total prévu et la répartition par création.
- La déduction du stock reste déclenchée par l’enregistrement de l’atelier.

# V4.0.3 PROD — Réservation automatique du stock

- Déduction du matériel dès l’enregistrement d’un atelier programmé.
- Ajustement automatique après modification des créations ou des participants.
- Réintégration automatique lors de l’annulation ou de la suppression.
- Maintien de la sélection multi-ateliers et de la répartition obligatoire des participants.
- Stock négatif autorisé pour visualiser immédiatement les achats à prévoir.
- Suppression du bouton manuel « Préparer le matériel ».

# V4.0.2 PROD

- Bibliothèque des ateliers dynamique renforcée.
- Recherche et filtre Actifs / Archivés.
- Classement visuel par statut.
- Contrôle des noms en double.
- Validation participants minimum / maximum.
- Accès direct à la configuration du matériel.

## V3.9.2 PROD

- Passage en production de la version V3.9.1 validée.
- Bibliothèque des ateliers visible dans Matériel.
- Sélection de plusieurs types de créations pour un atelier.
- Classement des ateliers par statut.
- Liste des thèmes disponible pour les ateliers thématiques, structures et privés.
- Nombre de participants obligatoire pour le calcul et le décompte du matériel.

# Changelog

## V3.9.1 PROD

- Classement des ateliers par statut.
- Sélection de plusieurs types de créations pour un même atelier client.
- Addition automatique des recettes matériel correspondantes.
- Bibliothèque des ateliers disponible également pour les ateliers thématiques du site.
- Ajout du contexte « Thématique / site » lors de la création ou modification d’un modèle.
- Nombre de participants obligatoire pour les ateliers thématiques, en structure et privés.
- Contrôle bloquant avant enregistrement et préparation du matériel.
- Compatibilité conservée avec les anciens ateliers utilisant un seul modèle.

## V3.9.0 PROD

- Ajout d’un onglet dédié **Bibliothèque des ateliers** dans le module Matériel.
- Bouton visible **Créer un nouveau thème**.
- Liste alphabétique des thèmes actifs et archivés.
- Modification, duplication, archivage et réactivation.
- Accès direct à la recette via **Matériel nécessaire**.
- Séparation claire entre articles de stock, bibliothèque et recettes.

# V3.8.5 PROD — Bibliothèque dynamique des ateliers

- Création libre de nouveaux thèmes d’atelier depuis le module Matériel.
- Modification des informations d’un atelier : nom, catégorie, durée, tarif, nombre mini/maxi, description et contextes.
- Duplication d’un atelier avec copie automatique de sa recette matériel.
- Archivage et réactivation des ateliers saisonniers.
- Suppression sécurisée des ateliers personnalisés non utilisés.
- Affichage automatique des ateliers actifs lors de la création d’un atelier.
- Association de chaque atelier à un ou plusieurs articles du stock avec quantité par personne.
- Conservation du décompte réel sécurisé au statut Matériel préparé.

# V3.8.4 PROD — Décompte réel du matériel

- Ajout du statut **Matériel préparé**.
- Décompte réel du stock uniquement après confirmation.
- Contrôle des stocks insuffisants avant validation.
- Ajustement du stock après modification du nombre de personnes ou de la recette.
- Réintégration manuelle ou lors de l’annulation/suppression d’un atelier.
- Historique des mouvements de stock avec le nom de l’atelier.

---

# V3.8.3 PROD — Bibliothèque Matériel

- Tri alphabétique de la liste.
- Recherche et filtre par catégorie.
- Édition complète de tous les champs d’un article.
- Ajout des références et emplacements.
- Statuts visuels et historique des modifications.
- Recettes ateliers et mode simulation conservés.

# V3.8.2 PROD

- Recettes matériel modifiables par atelier depuis le stock.
- Association d’un article à plusieurs ateliers avec quantité par personne.
- Ajout de fournitures saisonnières ou spécifiques sans modifier le code.
- Mode simulation conservé : aucune quantité réelle décomptée.

# Journal des versions

## V3.8.0 PROD — Recettes ateliers et stock automatique
- Calcul du matériel par atelier et par personne.
- Décompte automatique, ajustement des écarts et restitution en cas d’annulation.
- Import du stock initial communiqué.

## V3.7.2 PROD — Correctif Ajouter au carnet

- Correction du bouton dans **Clients > Encaissements manuels**.
- Listener direct compatible Safari/iPhone.
- Prise en charge des décimales avec virgule.
- Cache-busting des fichiers CSS/JS.


## V3.7.1 PROD — Photos d’inspiration mariage
- Import multiple de photos et fichiers pendant la préparation du rendez-vous.
- Les inspirations importées sont transférées automatiquement dans la nouvelle fiche mariage.
- Ajout d’un onglet **Inspirations** dans le CRM Mariage.
- Ajout, aperçu et suppression des médias possibles après la création de la fiche.
- Validation automatique de l’étape « Inspirations reçues » lorsqu’un média est ajouté.

## V3.7.0 PROD — Tableau de bord simplifié
- Suppression des aperçus URSSAF, Stock, Clients, ventes site, calendrier et statistiques du tableau de bord.
- Conservation de Bonjour Élodie, Todo, notifications et mariages en cours.
- Ajout de trois accès rapides : rendez-vous mariage, atelier et devis.
- Toutes les données restent accessibles dans leurs modules dédiés.

## V3.6.4 PROD
- Correctif téléphone sur devis mariage : priorité à la fiche cliente mise à jour, même en cas de doublon client.
- Lorsqu’une fiche cliente est enregistrée, elle reçoit désormais un `updatedAt` pour être priorisée dans les futurs devis.

## PROD V3.6.3 — Correctif devis mariage

- Le canal de communication n’apparaît plus sur les devis ni les factures côté client.
- Lors de la création/recréation d’un devis depuis une fiche mariage, les coordonnées sont reprises depuis la fiche cliente à jour si elle existe.
- Correction utile notamment après modification du numéro de téléphone dans la fiche cliente.

## PROD V3.6.1 — CRM Mariage sans bouton Nouvelle cliente

- Passage en production de la V3.6.1 validée.
- CRM Mariage avec fiche en onglets.
- Retrait du bouton + Nouvelle cliente au profit de Préparer mon rendez-vous.

## PROD V3.6.1 — CRM Mariage sans bouton Nouvelle cliente

- Retrait du bouton **+ Nouvelle cliente** dans le suivi mariages.
- La création d’un nouveau dossier mariage passe maintenant par **🎯 Préparer mon rendez-vous**.

## PROD V3.6.0 — CRM Mariage

- Réorganisation de la fiche mariage en onglets.
- Onglets ajoutés : Résumé, Fiche, Créations, Documents, Suivi, Budget, Historique.
- Conservation du bandeau Wedding Manager en haut de fiche.
- Conservation du bouton retour à la liste en haut.
- Objectif : rendre les fiches mariage plus lisibles et moins longues.

## PROD V3.5.3 — Wedding Manager sans jalons J-
- Retrait du bloc Jalons J- de la fiche mariage.
- Conservation du bandeau, de la timeline, de la todo mariage, des documents et du budget.

# Journal des modifications

## PROD V3.5.3
- Ajout d’un bouton **Retour à la liste des mariages** en haut des fiches mariage.
- Le bouton reste dans une barre supérieure discrète pour éviter de devoir descendre dans toute la fiche ouverte.


## PROD V3.5.1 MODULAIRE
- Ajout du bouton **Préparer mon rendez-vous** dans le module Mariages.
- Ajout d’un assistant de rendez-vous téléphonique mariage.
- Création automatique d’une fiche mariage complète depuis les réponses du rendez-vous.
- Génération automatique des articles, de la synthèse, des notes et des tâches de suivi.


## PROD V3.4.2 MODULAIRE
- Tri du bloc “Mariages en cours” par date de livraison, du plus proche au plus éloigné.
- Les dossiers sans date de livraison sont placés en bas de liste.

# CHANGELOG

## V3.4.1 PROD — Suivi mariages semi-automatique

- Les étapes devis/factures/livraison/photos/mariage terminé peuvent être validées manuellement pour les anciens dossiers.
- Les étapes restent validées automatiquement quand un document lié est détecté.
- Ajout des statuts “Automatique” et “Manuel” dans la checklist mariage.
- Ajout de la prochaine étape recommandée dans la fiche mariage.
- Pas de modification du module ateliers.


## V3.4.0 PROD — Centre de suivi des mariages

### Nouveautés
- Ajout du bloc **Mariages en cours** sur le tableau de bord.
- Ajout d’une checklist métier dans chaque fiche mariage.
- Calcul automatique de la progression d’un dossier mariage.
- Étapes automatiques selon les données existantes : devis envoyé, devis accepté, acompte payé, solde payé, livraison, photos et statut terminé.
- Étapes manuelles : inspirations reçues, moodboard, choix des fleurs, commande fournisseur, bouquet réalisé et accessoires réalisés.
- Ajout d’une chronologie automatique dans la fiche mariage.
- Les notes internes ajoutées depuis la fiche mariage sont intégrées à la chronologie.

### Conservé depuis V3.3.1 PROD
- Prestations complémentaires disponibles dans les ateliers et les mariages.
- Module Paramètres enrichi.
- Tableau de bord V3.2.1 validé.
- To-Do list placée entre Bonjour Elodie et le centre de notifications.
- Centre de notifications.
- Correctifs encaissements ateliers.

## V4.0.2 PROD — Recettes et répartition multi-ateliers

- Sélection de plusieurs créations dans un même atelier programmé.
- Nombre total de participants obligatoire.
- Répartition obligatoire des participants pour chaque création sélectionnée.
- Blocage de l’enregistrement et de la préparation si la somme répartie ne correspond pas au total.
- Calcul des recettes selon le nombre réellement affecté à chaque création.
- Aperçu du matériel avec la répartition utilisée.
- Conservation du décompte, des ajustements et de la réintégration sécurisée du stock.


## V4.0.6 TEST
- Tableau Finances : préparation des cartes Encaissements (Ateliers + Mariages) et évolution du tableau de trésorerie.
