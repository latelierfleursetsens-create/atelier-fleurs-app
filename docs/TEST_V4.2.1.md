# Tests V4.2.1 PROD

## Scénario principal

1. Ouvrir une fiche mariage possédant un devis lié et tarifé.
2. Modifier uniquement l’adresse e-mail.
3. Enregistrer la fiche.
4. Vérifier que l’e-mail est mis à jour dans la fiche cliente et dans le devis.
5. Vérifier que le total du devis reste inchangé.
6. Ouvrir l’aperçu puis lancer l’envoi : l’adresse proposée doit être la nouvelle et le montant doit rester correct.

## Garde-fous testés

- Synchronisation d’une fiche mariage dont les articles ne portent aucun prix : le tarif déjà présent dans le devis est conservé.
- Tentative de remplacement d’un devis payant par des lignes à 0 € : remplacement refusé.
- Devis à 0 € avec facture liée tarifée : lignes restaurées depuis la facture.
- Devis à 0 € sans facture ni commande exploitable : envoi et téléchargement bloqués.
