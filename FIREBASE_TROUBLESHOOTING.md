# Dépannage Firebase - Erreur 400 Bad Request

## Table des matières
1. [Compréhension de l'erreur](#compréhension-de-lerreur)
2. [Vérification de la configuration Firebase](#vérification-de-la-configuration-firebase)
3. [Variables d'environnement](#variables-denvironnement)
4. [Règles de sécurité Firestore](#règles-de-sécurité-firestore)
5. [Problèmes de réseau](#problèmes-de-réseau)
6. [Débogage avancé](#débogage-avancé)

## Compréhension de l'erreur

L'erreur `400 Bad Request` lors de la connexion à Firestore signifie que la requête envoyée au serveur Firebase est incorrecte ou mal formée. Cela peut être dû à:

- Configuration Firebase incorrecte
- Problèmes d'authentification
- Variables d'environnement manquantes
- Règles de sécurité trop restrictives

## Vérification de la configuration Firebase

### 1. Vérifier les informations du projet Firebase

Assurez-vous que les informations dans votre fichier `.env` correspondent exactement à celles de votre projet Firebase:

```env
VITE_FIREBASE_API_KEY=votre_api_key_exacte
VITE_FIREBASE_AUTH_DOMAIN=votre_domaine_auth
VITE_FIREBASE_PROJECT_ID=votre_id_de_projet_exact
VITE_FIREBASE_STORAGE_BUCKET=votre_bucket_de_stockage
VITE_FIREBASE_MESSAGING_SENDER_ID=votre_id_dexpediteur
VITE_FIREBASE_APP_ID=votre_id_dapplication
```

### 2. Obtenir les informations de configuration

1. Accédez à la [Console Firebase](https://console.firebase.google.com/)
2. Sélectionnez votre projet
3. Cliquez sur l'icône "Réglages" (engrenage) à côté de "Vue d'ensemble du projet"
4. Cliquez sur "Paramètres du projet"
5. Dans l'onglet "Général", trouvez la section "Votre application"
6. Si vous n'avez pas d'application, cliquez sur "Ajouter une application" et sélectionnez "Web"
7. Copiez les informations de configuration

### 3. Vérifier le fichier firebase.ts

Assurez-vous que votre fichier `src/lib/firebase.ts` est correctement configuré:

```typescript
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Configuration Firebase - vérifiez que les variables sont définies
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Vérification des variables d'environnement
if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
  console.error("Configuration Firebase incomplète. Vérifiez vos variables d'environnement.");
  console.log("Variables actuelles:", {
    apiKey: firebaseConfig.apiKey ? "Définie" : "Manquante",
    authDomain: firebaseConfig.authDomain ? "Définie" : "Manquante",
    projectId: firebaseConfig.projectId ? "Définie" : "Manquante",
    storageBucket: firebaseConfig.storageBucket ? "Définie" : "Manquante",
    messagingSenderId: firebaseConfig.messagingSenderId ? "Définie" : "Manquante",
    appId: firebaseConfig.appId ? "Définie" : "Manquante"
  });
}

// Initialisation de Firebase
const app = initializeApp(firebaseConfig);

// Initialisation de Firestore
const db = getFirestore(app);

// Initialisation de Firebase Authentication
const auth = getAuth(app);

export { app, db, auth };
```

## Variables d'environnement

### 1. Vérifier le fichier .env

Assurez-vous que votre fichier `.env` existe à la racine du projet et contient toutes les variables requises:

```env
VITE_FIREBASE_API_KEY=AIzaSyB1234567890abcdefg
VITE_FIREBASE_AUTH_DOMAIN=project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=project-id
VITE_FIREBASE_STORAGE_BUCKET=project-id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=1234567890
VITE_FIREBASE_APP_ID=1:1234567890:web:abcdef1234567890
```

### 2. Redémarrer le serveur de développement

Après avoir modifié le fichier `.env`, redémarrez votre serveur de développement:

```bash
# Arrêter le serveur (Ctrl+C)
# Puis redémarrer
npm run dev
```

### 3. Vérifier le chargement des variables

Ajoutez ce code temporairement dans votre composant pour vérifier que les variables sont chargées:

```typescript
// Ajoutez ce code dans un composant pour vérifier les variables
useEffect(() => {
  console.log("Variables d'environnement Firebase:");
  console.log("API Key:", import.meta.env.VITE_FIREBASE_API_KEY ? "Définie" : "Manquante");
  console.log("Project ID:", import.meta.env.VITE_FIREBASE_PROJECT_ID ? "Définie" : "Manquante");
  console.log("Auth Domain:", import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ? "Définie" : "Manquante");
}, []);
```

## Règles de sécurité Firestore

### 1. Vérifier les règles de sécurité

Dans la Console Firebase:
1. Allez dans "Firestore Database"
2. Cliquez sur l'onglet "Règles"
3. Assurez-vous que les règles permettent la lecture/écriture pour votre application

Règles de base pour le développement (NE PAS utiliser en production):

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

Règles plus sécurisées:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Accès en lecture pour tout le monde
    match /newsletterSubscribers/{document} {
      allow read: if true;
      allow write: if request.method == 'create';
    }
    
    match /testimonials/{document} {
      allow read: if true;
      allow write: if request.method == 'create';
    }
  }
}
```

### 2. Publier les règles

Après avoir modifié les règles:
1. Cliquez sur "Publier"
2. Attendez la confirmation de la publication

## Problèmes de réseau

### 1. Vérifier la connexion Internet

Assurez-vous que votre connexion Internet est stable et fonctionnelle.

### 2. Vérifier le pare-feu

Si vous êtes derrière un pare-feu d'entreprise:
- Contactez votre administrateur réseau
- Vérifiez que les connexions à `*.firebaseio.com` et `*.googleapis.com` sont autorisées

### 3. Utiliser un réseau différent

Essayez de vous connecter à un réseau différent (par exemple, votre téléphone en partage de connexion) pour éliminer les problèmes de réseau local.

## Débogage avancé

### 1. Activer les logs détaillés

Ajoutez ce code à votre fichier `src/lib/firebase.ts` pour activer les logs détaillés:

```typescript
import { initializeApp } from "firebase/app";
import { getFirestore, enableNetwork, disableNetwork } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Activer les logs Firebase (uniquement pour le développement)
if (import.meta.env.DEV) {
  // Vous pouvez ajouter des logs supplémentaires ici
  console.log("Firebase: Mode développement activé");
}

// Votre configuration existante...
```

### 2. Vérifier les erreurs détaillées

Modifiez votre service Firebase pour capturer les erreurs détaillées:

```typescript
// Dans src/lib/firebaseService.ts
export const getTestimonials = async () => {
  try {
    const q = query(collection(db, TESTIMONIALS_COLLECTION));
    const querySnapshot = await getDocs(q);
    const testimonials: Testimonial[] = [];
    
    querySnapshot.forEach((doc) => {
      testimonials.push({ id: doc.id, ...doc.data() } as Testimonial);
    });
    
    return { success: true, data: testimonials };
  } catch (error: any) {
    console.error("Erreur détaillée Firestore:", error);
    console.error("Code d'erreur:", error.code);
    console.error("Message d'erreur:", error.message);
    
    // Retourner des informations d'erreur plus détaillées
    return { 
      success: false, 
      error: error.message,
      code: error.code
    };
  }
};
```

### 3. Tester la connexion Firebase

Ajoutez ce code temporairement pour tester la connexion:

```typescript
// Test de connexion Firebase
import { app, db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

const testFirebaseConnection = async () => {
  try {
    console.log("Test de connexion Firebase...");
    console.log("App initialized:", app ? "Oui" : "Non");
    
    // Test simple de lecture
    const testCollection = collection(db, "test");
    const snapshot = await getDocs(testCollection);
    console.log("Connexion réussie, documents trouvés:", snapshot.size);
  } catch (error: any) {
    console.error("Erreur de test Firebase:", error);
    console.error("Code:", error.code);
    console.error("Message:", error.message);
  }
};

// Appelez cette fonction dans un composant pour tester
// testFirebaseConnection();
```

## Solutions spécifiques

### 1. Problème de projectId

Assurez-vous que votre `projectId` est exactement le même que dans la Console Firebase. Il ne doit pas contenir d'espaces ou de caractères spéciaux.

### 2. Problème de clé API

Si vous obtenez des erreurs liées à la clé API:
1. Générez une nouvelle clé dans la Console Firebase
2. Remplacez l'ancienne clé dans votre fichier `.env`
3. Redémarrez votre serveur de développement

### 3. Problème de domaine d'authentification

Pour les applications web, le `authDomain` doit être:
```
VOTRE_PROJECT_ID.firebaseapp.com
```

## Support Firebase

Si le problème persiste:
1. Consultez la [documentation officielle Firebase](https://firebase.google.com/docs)
2. Posez une question sur [Stack Overflow](https://stackoverflow.com/questions/tagged/firebase)
3. Contactez le support Firebase si vous avez un plan payant

## Nettoyage

Après avoir résolu le problème, n'oubliez pas de:
1. Supprimer les logs de débogage temporaires
2. Vérifier que votre application fonctionne en production
3. Mettre à jour les règles de sécurité pour la production