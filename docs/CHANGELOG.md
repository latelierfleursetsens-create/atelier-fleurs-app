# Journal des versions

## V3.7.1 PROD — Photos d’inspiration mariage
- Import multiple de photos et fichiers pendant la préparation du rendez-vous.
- Les inspirations importées sont transférées automatiquement dans la nouvelle fiche mariage.
- Ajout d’un onglet **Inspirations** dans le CRM Mariage.
- Ajout, aperçu et suppression des médias possibles après la création de la fiche.
- Validation automatique de l’étape « Inspirations reçues » lorsqu’un média est ajouté.

## V3.7.0 TEST — Tableau de bord simplifié
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

## TEST V3.6.1 — CRM Mariage sans bouton Nouvelle cliente

- Retrait du bouton **+ Nouvelle cliente** dans le suivi mariages.
- La création d’un nouveau dossier mariage passe maintenant par **🎯 Préparer mon rendez-vous**.

## TEST V3.6.0 — CRM Mariage

- Réorganisation de la fiche mariage en onglets.
- Onglets ajoutés : Résumé, Fiche, Créations, Documents, Suivi, Budget, Historique.
- Conservation du bandeau Wedding Manager en haut de fiche.
- Conservation du bouton retour à la liste en haut.
- Objectif : rendre les fiches mariage plus lisibles et moins longues.

## TEST V3.5.3 — Wedding Manager sans jalons J-
- Retrait du bloc Jalons J- de la fiche mariage.
- Conservation du bandeau, de la timeline, de la todo mariage, des documents et du budget.

# Journal des modifications

## TEST V3.5.3
- Ajout d’un bouton **Retour à la liste des mariages** en haut des fiches mariage.
- Le bouton reste dans une barre supérieure discrète pour éviter de devoir descendre dans toute la fiche ouverte.


## TEST V3.5.1 MODULAIRE
- Ajout du bouton **Préparer mon rendez-vous** dans le module Mariages.
- Ajout d’un assistant de rendez-vous téléphonique mariage.
- Création automatique d’une fiche mariage complète depuis les réponses du rendez-vous.
- Génération automatique des articles, de la synthèse, des notes et des tâches de suivi.


## TEST V3.4.2 MODULAIRE
- Tri du bloc “Mariages en cours” par date de livraison, du plus proche au plus éloigné.
- Les dossiers sans date de livraison sont placés en bas de liste.

# CHANGELOG

## V3.4.1 TEST — Suivi mariages semi-automatique

- Les étapes devis/factures/livraison/photos/mariage terminé peuvent être validées manuellement pour les anciens dossiers.
- Les étapes restent validées automatiquement quand un document lié est détecté.
- Ajout des statuts “Automatique” et “Manuel” dans la checklist mariage.
- Ajout de la prochaine étape recommandée dans la fiche mariage.
- Pas de modification du module ateliers.


## V3.4.0 TEST — Centre de suivi des mariages

### Nouveautés
- Ajout du bloc **Mariages en cours** sur le tableau de bord.
- Ajout d’une checklist métier dans chaque fiche mariage.
- Calcul automatique de la progression d’un dossier mariage.
- Étapes automatiques selon les données existantes : devis envoyé, devis accepté, acompte payé, solde payé, livraison, photos et statut terminé.
- Étapes manuelles : inspirations reçues, moodboard, choix des fleurs, commande fournisseur, bouquet réalisé et accessoires réalisés.
- Ajout d’une chronologie automatique dans la fiche mariage.
- Les notes internes ajoutées depuis la fiche mariage sont intégrées à la chronologie.

### Conservé depuis V3.3.1 TEST
- Prestations complémentaires disponibles dans les ateliers et les mariages.
- Module Paramètres enrichi.
- Tableau de bord V3.2.1 validé.
- To-Do list placée entre Bonjour Elodie et le centre de notifications.
- Centre de notifications.
- Correctifs encaissements ateliers.
