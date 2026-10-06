# Swarme — LCB-FT pour les petits cabinets comptables

La landing présente le projet Swarme pour les cabinets d’expertise comptable de 2 à 10 personnes. Les textes ont été adaptés au projet LCB-FT. La mise en page d’origine, les typographies, les couleurs, les images, les cartes et les animations sont conservées, avec les ressources Next.js locales d’origine.

## Voir le site

```sh
python -m http.server 8080 --directory dist
```

Ouvrir http://localhost:8080/fr/. Le dossier `dist` se sert à la racine d’un hébergement statique. La landing utilise ses fichiers HTML et ses ressources Next.js compilées. `replica-lcb.js` relie les boutons de démo au contact du projet. Les pages de contact et les pages juridiques se trouvent sous `dist/fr/`.

## Produit prévu

La première version prévoit une fiche client, le dépôt des pièces, une checklist des diligences et l’export du registre avec les justificatifs classés. Les dossiers de la landing sont fictifs. L’application de conformité n’est pas encore construite.

La lecture automatique, le scoring assisté et l’aide à la déclaration Tracfin sont envisagés dans un second temps. Le professionnel conserve la responsabilité de ses décisions et de ses obligations.

Le pilote est envisagé à 99 € HT par mois, puis le tarif Cabinet à 199 € HT par mois. Les demandes de démo préparent un e-mail vers `contact.ocremousse@gmail.com` dans la messagerie du visiteur. Le visiteur doit l’envoyer lui-même.

## État du projet

Cette vitrine ne traite pas de dossiers clients réels et ne crée aucun paiement ni abonnement. L’hébergement en France, le chiffrement, les accès, la journalisation et les règles de conservation restent à mettre en œuvre pour l’application. Les informations juridiques de l’éditeur sont à compléter avant l’ouverture commerciale.

Les anciennes routes de la vitrine et du prototype redirigent vers la présentation actuelle. Aucune session privée ni aucun secret ne figure dans le dépôt.
