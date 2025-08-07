import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { addNewsletterSubscriber, isEmailSubscribed } from "@/lib/firebaseService";
import { sendNewsletterConfirmationEmail } from "@/lib/emailService";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { toast } = useToast();

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail(email)) {
      toast({
        title: "Email invalide",
        description: "Veuillez entrer une adresse email valide.",
        variant: "destructive",
      });
      return;
    }

    // Check if already subscribed
    const isAlreadySubscribed = await isEmailSubscribed(email);
    
    if (isAlreadySubscribed) {
      toast({
        title: "Déjà abonné",
        description: "Cette adresse email est déjà inscrite à notre newsletter.",
        variant: "destructive",
      });
      return;
    }

    // Add to Firebase
    const newSubscriber = {
      email,
      subscribedAt: new Date(),
      confirmed: false,
      confirmToken: Math.random().toString(36).substring(2, 15)
    };
    
    const result = await addNewsletterSubscriber(newSubscriber);
    
    if (result.success) {
      // Send confirmation email
      await sendConfirmationEmail(email, newSubscriber.confirmToken);
      
      setIsSubscribed(true);
      setEmail("");
      
      toast({
        title: "Inscription réussie !",
        description: "Un email de confirmation a été envoyé à votre adresse.",
      });
    } else {
      toast({
        title: "Erreur d'inscription",
        description: "Une erreur est survenue lors de votre inscription. Veuillez réessayer.",
        variant: "destructive",
      });
    }
  };

  const sendConfirmationEmail = async (email: string, token: string) => {
    // Send confirmation email using email service
    const result = await sendNewsletterConfirmationEmail(email, token);
    
    if (!result.success) {
      console.error("Failed to send confirmation email:", result.error);
    }
  };

  return (
    <section className="py-12 px-4 bg-gradient-to-r from-blue-50 to-green-50">
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-xl border-0">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-t-lg">
            <CardTitle className="text-center text-xl flex items-center justify-center">
              <Mail className="w-5 h-5 mr-2" />
              <span>Newsletter Ensemble Contre l'Obésité</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {!isSubscribed ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="email" className="text-gray-700 font-medium">
                    Votre adresse email *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="votre.email@exemple.com"
                    className="mt-1"
                    required
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Recevez nos conseils, témoignages et ressources directement dans votre boîte email
                  </p>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-semibold py-3 rounded-lg transition-all duration-300"
                >
                  <Send className="w-4 h-4 mr-2" />
                  S'inscrire à la newsletter
                </Button>
              </form>
            ) : (
              <div className="text-center py-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Merci pour votre inscription !
                </h3>
                <p className="text-gray-600 mb-4">
                  Un email de confirmation a été envoyé à <span className="font-semibold">{email}</span>.
                  Veuillez cliquer sur le lien dans l'email pour confirmer votre inscription.
                </p>
                <p className="text-sm text-gray-500">
                  Vous n'avez pas reçu d'email ? Vérifiez vos spams ou{" "}
                  <button
                    type="button"
                    className="text-blue-600 hover:underline"
                    onClick={() => setIsSubscribed(false)}
                  >
                    réessayez
                  </button>
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Newsletter;