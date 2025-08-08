# Weight Wise Wisdom 🌟

Une plateforme communautaire moderne et bienveillante pour partager des témoignages de perte de poids et trouver de l'encouragement dans votre parcours de bien-être.

## 🚀 Aperçu du projet

Weight Wise Wisdom est une application web React qui permet aux utilisateurs de :
- **Partager leurs témoignages** de perte de poids avec la communauté
- **Découvrir des histoires inspirantes** d'autres membres
- **Accéder à des ressources** pour un mode de vie sain
- **S'abonner à une newsletter** pour recevoir des conseils et du soutien
- **Gérer leurs propres témoignages** (modification et suppression)

## ✨ Fonctionnalités principales

### 🏠 Page d'accueil
- Section héro avec présentation du projet
- Statistiques de la communauté
- Galerie de témoignages inspirants
- Formulaire de partage d'expérience
- Section ressources avec conseils pratiques
- Newsletter pour rester connecté

### 📝 Gestion des témoignages
- Formulaire de soumission avec validation complète
- Affichage dynamique des témoignages
- Système d'identification utilisateur unique
- Possibilité de supprimer ses propres témoignages
- Persistance des données avec Firebase

### 🔐 Système utilisateur
- Génération automatique d'ID utilisateur unique
- Stockage local de l'identité utilisateur
- Gestion des permissions (suppression de ses propres témoignages uniquement)

## 🛠️ Technologies utilisées

### Frontend
- **React 18** - Bibliothèque UI moderne
- **TypeScript** - Typage statique pour plus de sécurité
- **Vite** - Outil de build ultra-rapide
- **Tailwind CSS** - Framework CSS utilitaire
- **Shadcn/ui** - Composants UI accessibles et personnalisables

### Gestion des formulaires et validation
- **React Hook Form** - Gestion performante des formulaires
- **Zod** - Validation de schémas TypeScript-first
- **@hookform/resolvers** - Intégration Zod avec React Hook Form

### UI/UX et composants
- **Radix UI** - Primitives UI accessibles
- **Lucide React** - Icônes modernes
- **Class Variance Authority** - Gestion des variantes de composants
- **Tailwind Merge** - Fusion intelligente des classes CSS
- **Sonner** - Notifications toast élégantes

### Backend et données
- **Firebase** - Base de données en temps réel et authentification
- **Firestore** - Base de données NoSQL pour les témoignages et abonnements
- **React Query (@tanstack/react-query)** - Gestion d'état serveur

### Routing et navigation
- **React Router DOM** - Routing côté client
- **React Scroll** - Navigation fluide entre sections

### Outils de développement
- **ESLint** - Linting du code
- **PostCSS** - Traitement CSS
- **Autoprefixer** - Préfixes CSS automatiques

## 📋 Prérequis

- **Node.js** (version 18 ou supérieure)
- **npm** ou **yarn** ou **bun**
- **Compte Firebase** (pour la base de données)

## 🚀 Installation et configuration

### 1. Cloner le projet
```bash
git clone https://github.com/Hospice-max/weight-wise-wisdom.git
cd weight-wise-wisdom
```

### 2. Installer les dépendances
```bash
npm install
```

### 3. Configuration Firebase
1. Créez un projet Firebase sur [console.firebase.google.com](https://console.firebase.google.com)
2. Activez Firestore Database
3. Copiez la configuration Firebase
4. Créez un fichier `.env` à la racine du projet :
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 4. Lancer le serveur de développement
```bash
npm run dev
```

L'application sera accessible à `http://localhost:5173`

## 📁 Structure du projet

```
weight-wise-wisdom/
├── public/                 # Assets statiques
│   ├── favicon.ico
│   ├── weight.png
│   └── robots.txt
├── src/
│   ├── components/         # Composants réutilisables
│   │   ├── ui/            # Composants UI de base (Shadcn)
│   │   ├── HeroSection.tsx
│   │   ├── StatsSection.tsx
│   │   ├── TestimonialCard.tsx
│   │   ├── ShareExperienceForm.tsx
│   │   ├── ResourcesSection.tsx
│   │   └── Newsletter.tsx
│   ├── hooks/             # Hooks personnalisés
│   │   ├── use-mobile.tsx
│   │   └── use-toast.ts
│   ├── lib/               # Utilitaires et services
│   │   ├── firebase.ts
│   │   ├── firebaseService.ts
│   │   ├── emailService.ts
│   │   ├── emailTemplates.ts
│   │   └── utils.ts
│   ├── pages/             # Pages de l'application
│   │   ├── Index.tsx
│   │   ├── ConfirmSubscription.tsx
│   │   ├── NotFound.tsx
│   │   └── UnderDevelopment.tsx
│   ├── App.tsx
│   └── main.tsx
├── DEPLOYMENT.md          # Guide de déploiement
├── FIREBASE_GUIDE.md      # Guide Firebase
├── FIREBASE_TROUBLESHOOTING.md
└── README.md
```

## 🎯 Scripts disponibles

```bash
# Développement
npm run dev              # Lance le serveur de développement

# Build
npm run build           # Build de production
npm run build:dev       # Build de développement

# Qualité du code
npm run lint            # Vérification ESLint

# Prévisualisation
npm run preview         # Prévisualise le build de production
```

## 🚀 Déploiement

### Vercel (Recommandé)
L'application est optimisée pour Vercel avec la configuration `vercel.json` incluse.

1. Connectez votre dépôt GitHub à Vercel
2. Configurez les variables d'environnement Firebase
3. Déployez automatiquement à chaque push

Voir [DEPLOYMENT.md](DEPLOYMENT.md) pour plus de détails.

### Autres plateformes
- **Netlify** : Compatible avec les SPA React
- **Firebase Hosting** : Intégration native avec Firebase
- **GitHub Pages** : Pour les projets open source

## 🔧 Configuration Firebase

### Collections Firestore
- `testimonials` : Stockage des témoignages utilisateurs
- `newsletterSubscribers` : Gestion des abonnements newsletter

### Règles de sécurité recommandées
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /testimonials/{document} {
      allow read: if true;
      allow write: if request.auth != null;
      allow delete: if request.auth != null && request.auth.uid == resource.data.userId;
    }
    match /newsletterSubscribers/{document} {
      allow read, write: if true;
    }
  }
}
```

## 🤝 Contribution


Les contributions sont les bienvenues ! Voici comment contribuer :

1. **Fork** le projet
2. Créez votre branche feature (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Poussez vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une **Pull Request**

### Guidelines de contribution
- Respectez les conventions de code existantes
- Ajoutez des tests pour les nouvelles fonctionnalités
- Mettez à jour la documentation si nécessaire
- Vérifiez que `npm run lint` passe sans erreur

## 🐛 Signaler des bugs

Utilisez les [GitHub Issues](https://github.com/Hospice-max/weight-wise-wisdom/issues) pour signaler des bugs ou proposer des améliorations.

## 📈 Roadmap

### Version 1.1
- [ ] Système d'authentification complet
- [ ] Modération des témoignages
- [ ] Système de likes/réactions
- [ ] Filtres et recherche dans les témoignages

### Version 1.2
- [ ] Application mobile (React Native)
- [ ] Notifications push
- [ ] Système de badges et récompenses
- [ ] Intégration avec des APIs de fitness

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 👥 Équipe

- **Hospice Ahouandjinou** - Développeur principal - [@Hospice-max](https://github.com/Hospice-max)

- Votre nom - [Hospice AHOUANDJINOU]


## 🙏 Remerciements

- **Shadcn/ui** pour les composants UI magnifiques
- **Radix UI** pour les primitives accessibles
- **Firebase** pour l'infrastructure backend
- **Vercel** pour l'hébergement gratuit
- **La communauté open source** pour tous les outils utilisés

## 📞 Support

- 📧 Email : [hospicesegnongiovanni@gmail.com]
- 🐛 Issues : [GitHub Issues](https://github.com/Hospice-max/weight-wise-wisdom/issues)

---

**Ensemble, créons une communauté bienveillante pour un mode de vie sain ! 💪✨**
