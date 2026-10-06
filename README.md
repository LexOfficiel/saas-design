# Swarme — SaaS website design

Sauvegarde complète du site Swarme : accueil, connexion, inscription, réinitialisation de mot de passe, polices, images, CSS et JavaScript.

## Démarrer localement

Avec Python installé :

```sh
python -m http.server 8080 --directory dist
```

Ouvrir http://localhost:8080/fr/. Les pages de compte sont disponibles sous /login/, /signup/ et /reset-password/. Le dossier `dist` est prêt pour un hébergement statique à la racine d’un domaine.

## État du projet

Les pages reproduisent l’interface de référence avec le nom Swarme. Les formulaires valident localement les champs et n’envoient ni ne stockent les mots de passe. L’authentification, Google OAuth, l’envoi de codes, le moteur GEO et l’onboarding connecté restent à implémenter. Les liens éditoriaux et les tests de visibilité renvoient encore au service d’origine.

Cet export contient le HTML et les fichiers publics nécessaires au rendu, dont les scripts compilés. Il ne contient pas le code source original des composants Next.js ni le backend du service de référence.

## Correction du rendu

Le flux React Flight utilise des enregistrements texte avec une longueur UTF-8. Le changement de marque recalcule ces longueurs pour éviter l’erreur React #412. Les images et polices nécessaires au rendu sont locales.

La configuration de l’hébergement ChatGPT et les identifiants d’accès sont exclus de ce dépôt.
