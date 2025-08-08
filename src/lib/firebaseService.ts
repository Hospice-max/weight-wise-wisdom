import { db } from "@/lib/firebase";
import { collection, addDoc, getDocs, query, where, deleteDoc, doc, Timestamp, updateDoc } from "firebase/firestore";

// Collection names
const NEWSLETTER_COLLECTION = "newsletterSubscribers";
const TESTIMONIALS_COLLECTION = "testimonials";

// Newsletter subscription types
export interface NewsletterSubscriber {
  id?: string;
  email: string;
  subscribedAt: Timestamp | Date | string;
  confirmed: boolean;
  confirmToken: string;
}

// Testimonial types
export interface Testimonial {
  id?: string;
  name: string;
  age: string;
  story: string;
  weightLoss: string;
  timeframe: string;
  image: string | null;
  userId: string;
  createdAt: Timestamp;
}

// Add a newsletter subscriber
export const addNewsletterSubscriber = async (subscriber: Omit<NewsletterSubscriber, "id">) => {
  try {
    let timestamp: Timestamp;
    
    if (subscriber.subscribedAt instanceof Timestamp) {
      timestamp = subscriber.subscribedAt;
    } else if (subscriber.subscribedAt instanceof Date) {
      timestamp = Timestamp.fromDate(subscriber.subscribedAt);
    } else {
      // Assume it's a string
      timestamp = Timestamp.fromDate(new Date(subscriber.subscribedAt));
    }
    
    const subscriberWithTimestamp = {
      ...subscriber,
      subscribedAt: timestamp
    };
    
    const docRef = await addDoc(collection(db, NEWSLETTER_COLLECTION), subscriberWithTimestamp);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error adding newsletter subscriber: ", error);
    return { success: false, error };
  }
};

// Get all newsletter subscribers
export const getNewsletterSubscribers = async () => {
  try {
    const q = query(collection(db, NEWSLETTER_COLLECTION));
    const querySnapshot = await getDocs(q);
    const subscribers: NewsletterSubscriber[] = [];
    
    querySnapshot.forEach((doc) => {
      subscribers.push({ id: doc.id, ...doc.data() } as NewsletterSubscriber);
    });
    
    return { success: true, data: subscribers };
  } catch (error) {
    console.error("Error getting newsletter subscribers: ", error);
    return { success: false, error };
  }
};

// Check if email is already subscribed
export const isEmailSubscribed = async (email: string) => {
  try {
    const q = query(
      collection(db, NEWSLETTER_COLLECTION),
      where("email", "==", email)
    );
    const querySnapshot = await getDocs(q);
    
    return !querySnapshot.empty;
  } catch (error) {
    console.error("Error checking email subscription: ", error);
    return false;
  }
};

// Confirm newsletter subscription
export const confirmNewsletterSubscription = async (token: string) => {
  try {
    const q = query(
      collection(db, NEWSLETTER_COLLECTION),
      where("confirmToken", "==", token)
    );
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      return { success: false, error: "Invalid token" };
    }
    
    const doc = querySnapshot.docs[0];
    const docRef = doc.ref;
    
    await updateDoc(docRef, {
      confirmed: true
    });
    
    return { success: true, data: doc.data() };
  } catch (error) {
    console.error("Error confirming subscription: ", error);
    return { success: false, error };
  }
};

// Add a testimonial
export const addTestimonial = async (testimonial: Omit<Testimonial, "id" | "createdAt">) => {
  try {    
    const testimonialWithTimestamp = {
      ...testimonial,
      createdAt: Timestamp.now()
    };
    
    const docRef = await addDoc(collection(db, TESTIMONIALS_COLLECTION), testimonialWithTimestamp);    
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error adding testimonial: ", error);
    return { success: false, error };
  }
};

// Get all testimonials
export const getTestimonials = async () => {
  try {    
    const q = query(collection(db, TESTIMONIALS_COLLECTION));
    const querySnapshot = await getDocs(q);
    const testimonials: Testimonial[] = [];
    
    querySnapshot.forEach((doc) => {
      testimonials.push({ id: doc.id, ...doc.data() } as Testimonial);
    });
        
    return { success: true, data: testimonials };
  } catch (error) {
    console.error("Error getting testimonials: ", error);
    return { success: false, error };
  }
};

// Delete a testimonial
export const deleteTestimonial = async (id: string) => {
  try {    
    await deleteDoc(doc(db, TESTIMONIALS_COLLECTION, id));    
    return { success: true };
  } catch (error) {
    console.error("Error deleting testimonial: ", error);
    return { success: false, error };
  }
};