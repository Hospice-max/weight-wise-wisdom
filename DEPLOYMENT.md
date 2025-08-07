# Deployment avec Vercel

Ce document explique comment déployer l'application "Weight Wise Wisdom" sur Vercel.

## Configuration requise

- Un compte Vercel (gratuit disponible sur [vercel.com](https://vercel.com))
- Le code source de l'application
- Git installé (optionnel mais recommandé)

## Modifications apportées pour le déploiement

### 1. Fichier `vercel.json`

Un fichier `vercel.json` a été ajouté à la racine du projet avec la configuration suivante :

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ]
}
```

Cette configuration permet :
- La réécriture des routes pour le routing côté client de React Router
- L'utilisation du builder statique de Vercel pour les applications Vite

### 2. Fichier `vite.config.ts`

La configuration du serveur a été supprimée car elle n'est pas nécessaire pour le déploiement sur Vercel :

```js
// Configuration supprimée
server: {
  host: "::",
  port: 8080,
},
```

### 3. Fichier `package.json`

Le script de build a été simplifié pour supprimer le flag `--legacy-peer-deps` qui peut causer des problèmes sur l'environnement de build de Vercel :

```json
// Avant
"build": "npm install --legacy-peer-deps && vite build"

// Après
"build": "vite build"
```

## Étapes de déploiement

### Méthode 1 : Via l'interface web de Vercel (Recommandée)

1. Rendez-vous sur [vercel.com](https://vercel.com) et connectez-vous
2. Cliquez sur "New Project"
3. Connectez votre dépôt Git (GitHub, GitLab, ou Bitbucket)
4. Sélectionnez le dépôt contenant l'application
5. Vercel détectera automatiquement qu'il s'agit d'une application Vite
6. Assurez-vous que les paramètres de build sont corrects :
   - Build Command: `vite build`
   - Output Directory: `dist`
   - Framework Preset: Vite
7. Cliquez sur "Deploy"

### Méthode 2 : Via l'interface en ligne de commande

1. Installez Vercel CLI globalement :
   ```bash
   npm install -g vercel
   ```

2. Connectez-vous à votre compte Vercel :
   ```bash
   vercel login
   ```

3. Accédez au répertoire du projet :
   ```bash
   cd chemin/vers/weight-wise-wisdom
   ```

4. Déployez le projet :
   ```bash
   vercel
   ```

5. Suivez les instructions dans le terminal pour configurer le déploiement

## Variables d'environnement

Cette application n'utilise pas de variables d'environnement sensibles, donc aucune configuration supplémentaire n'est nécessaire.

## Limitations importantes

### Stockage local

L'application utilise `localStorage` pour stocker les témoignages. Cela signifie que :

- Les données sont stockées localement dans le navigateur de chaque utilisateur
- Les témoignages ne sont pas partagés entre différents utilisateurs
- Les témoignages sont perdus si l'utilisateur efface ses données de navigation

Pour une application de production, il serait recommandé d'implémenter un backend avec une base de données pour stocker les témoignages de manière persistante et partagée.

## Problèmes connus et solutions

### Problèmes de build

Si vous rencontrez des problèmes de build liés aux dépendances :

1. Vérifiez que vous utilisez la dernière version de Node.js
2. Supprimez `node_modules` et `package-lock.json` et réinstallez :
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

### Problèmes de routage

Si les routes ne fonctionnent pas correctement après le déploiement :

1. Vérifiez que le fichier `vercel.json` est présent à la racine du projet
2. Assurez-vous que la configuration des rewrites est correcte
3. Redéployez l'application si nécessaire

## Maintenance et mises à jour

Pour déployer de nouvelles versions de l'application :

1. Poussez vos modifications sur le dépôt Git
2. Si vous utilisez l'intégration Git, Vercel déploiera automatiquement les nouvelles modifications
3. Sinon, exécutez à nouveau la commande `vercel` pour déployer manuellement

## Coûts

Vercel offre un plan gratuit généreux qui devrait suffire pour cette application :
- 100 GB de bande passante par mois
- 1000 déploiements par mois
- 500 builds par mois
- 1 projet

Si vous dépassez ces limites, Vercel propose des plans payants à partir de 20 $/mois.