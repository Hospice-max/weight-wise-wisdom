# Guide Firebase pour Weight Wise Wisdom

## Table des matières
1. [Introduction](#introduction)
2. [Configuration du projet Firebase](#configuration-du-projet-firebase)
3. [Installation des dépendances](#installation-des-dépendances)
4. [Configuration de Firebase dans l'application](#configuration-de-firebase-dans-lapplication)
5. [Utilisation de Firestore](#utilisation-de-firestore)
6. [Variables d'environnement](#variables-denvironnement)
7. [Sécurité et règles d'accès](#sécurité-et-règles-daccès)
8. [Déploiement](#déploiement)

## Introduction

Firebase est une plateforme de développement d'applications web et mobiles proposée par Google. Elle fournit des services backend tels que la base de données en temps réel, l'authentification, le stockage et plus encore. Dans cette application, nous utilisons Firebase Firestore pour stocker les témoignages et les abonnements à la newsletter.

## Configuration du projet Firebase

1. Rendez-vous sur [Firebase Console](https://console.firebase.google.com/)
2. Cliquez sur "Créer un projet"
3. Entrez un nom pour votre projet (ex: "Weight Wise Wisdom")
4. Acceptez les conditions d'utilisation
5. Cliquez sur "Créer un projet"

### Ajout d'une application web

1. Dans le tableau de bord de votre projet, cliquez sur "Ajouter une application"
2. Sélectionnez l'icône Web (</>)
3. Donnez un nom à votre application
4. Enregistrez l'application

### Récupération des informations de configuration

Après avoir enregistré votre application, Firebase vous fournira un snippet de code contenant les informations de configuration. Ces informations doivent être ajoutées à votre fichier `.env` :

```env
VITE_FIREBASE_API_KEY=votre_api_key
VITE_FIREBASE_AUTH_DOMAIN=votre_domaine_auth
VITE_FIREBASE_PROJECT_ID=votre_id_de_projet
VITE_FIREBASE_STORAGE_BUCKET=votre_bucket_de_stockage
VITE_FIREBASE_MESSAGING_SENDER_ID=votre_id_d'expéditeur
VITE_FIREBASE_APP_ID=votre_id_d'application
```

## Installation des dépendances

Les dépendances Firebase ont déjà été installées dans le projet :

```bash
npm install firebase
```

## Configuration de Firebase dans l'application

Le fichier `src/lib/firebase.ts` contient la configuration de base :

```typescript
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
```

## Utilisation de Firestore

Firestore est la base de données NoSQL de Firebase. Dans notre application, nous utilisons deux collections :

### Collection "newsletterSubscribers"

Stocke les abonnements à la newsletter avec les champs suivants :
- `email`: string - Adresse email de l'abonné
- `subscribedAt`: Timestamp - Date d'abonnement
- `confirmed`: boolean - Statut de confirmation
- `confirmToken`: string - Jeton de confirmation

### Collection "testimonials"

Stocke les témoignages avec les champs suivants :
- `name`: string - Nom de l'utilisateur
- `age`: string - Âge de l'utilisateur
- `story`: string - Témoignage
- `weightLoss`: string - Perte de poids
- `timeframe`: string - Durée
- `image`: string | null - Image (base64)
- `userId`: string - ID de l'utilisateur
- `createdAt`: Timestamp - Date de création

### Service Firebase

Le fichier `src/lib/firebaseService.ts` contient toutes les opérations CRUD pour interagir avec Firestore :

```typescript
// Ajouter un abonné à la newsletter
export const addNewsletterSubscriber = async (subscriber: Omit<NewsletterSubscriber, "id">) => {
  // Implémentation
};

// Obtenir tous les abonnés
export const getNewsletterSubscribers = async () => {
  // Implémentation
};

// Ajouter un témoignage
export const addTestimonial = async (testimonial: Omit<Testimonial, "id" | "createdAt">) => {
  // Implémentation
};

// Obtenir tous les témoignages
export const getTestimonials = async () => {
  // Implémentation
};
```

## Variables d'environnement

Les variables d'environnement sont stockées dans le fichier `.env` à la racine du projet. Pour des raisons de sécurité, ce fichier ne doit jamais être commité dans le dépôt Git.

Exemple de fichier `.env` :

```env
VITE_FIREBASE_API_KEY=AIzaSyB1234567890abcdefg
VITE_FIREBASE_AUTH_DOMAIN=project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=project-id
VITE_FIREBASE_STORAGE_BUCKET=project-id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=1234567890
VITE_FIREBASE_APP_ID=1:1234567890:web:abcdef1234567890
```

## Sécurité et règles d'accès

Les règles de sécurité de Firestore sont configurées dans le tableau de bord Firebase. Voici un exemple de configuration basique :

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Accès en lecture pour tout le monde
    match /newsletterSubscribers/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    match /testimonials/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

Pour une configuration plus sécurisée, vous pouvez implémenter des règles spécifiques à chaque utilisateur :

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /testimonials/{document} {
      // Tout le monde peut lire
      allow read: if true;
      // Seulement l'utilisateur propriétaire peut écrire
      allow write: if request.auth != null && request.auth.uid == request.resource.data.userId;
    }
  }
}
```

## Déploiement

Lors du déploiement de votre application, assurez-vous que :

1. Les variables d'environnement sont correctement configurées sur votre plateforme d'hébergement
2. Les règles de sécurité Firestore sont mises à jour
3. Le projet Firebase est configuré pour autoriser les domaines de votre application

Pour Vercel :
1. Ajoutez les variables d'environnement dans les paramètres du projet
2. Déployez votre application normalement

Pour Firebase Hosting :
1. Installez Firebase CLI : `npm install -g firebase-tools`
2. Connectez-vous : `firebase login`
3. Initialisez le projet : `firebase init`
4. Déployez : `firebase deploy`

## Dépannage

### Erreurs de configuration

Si vous recevez des erreurs de configuration :
1. Vérifiez que toutes les variables d'environnement sont définies
2. Assurez-vous que les clés API sont correctes
3. Vérifiez les règles de sécurité dans Firebase Console

### Problèmes de connexion

Si l'application ne se connecte pas à Firebase :
1. Vérifiez votre connexion Internet
2. Assurez-vous que les règles de pare-feu autorisent les connexions sortantes
3. Vérifiez les logs de la console du navigateur

### Problèmes d'écriture

Si vous ne pouvez pas écrire dans Firestore :
1. Vérifiez les règles de sécurité
2. Assurez-vous que l'utilisateur est authentifié si nécessaire
3. Vérifiez les quotas d'écriture de votre projet Firebase

## Ressources supplémentaires

- [Documentation Firebase](https://firebase.google.com/docs)
- [Documentation Firestore](https://firebase.google.com/docs/firestore)
- [Console Firebase](https://console.firebase.google.com/)
- [Tarification Firebase](https://firebase.google.com/pricing)

## Support

Pour obtenir de l'aide supplémentaire :
- Consultez la documentation officielle de Firebase
- Posez des questions sur Stack Overflow avec le tag "firebase"
- Contactez le support Firebase pour les problèmes liés au compte