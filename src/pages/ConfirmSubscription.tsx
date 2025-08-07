import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertCircle, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { confirmNewsletterSubscription } from "@/lib/firebaseService";
import { sendWelcomeEmail } from "@/lib/emailService";

const ConfirmSubscription = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const token = searchParams.get("token");
    
    if (!token) {
      setStatus("error");
      return;
    }

    // Simulate confirmation process
    setTimeout(() => {
      try {
        const existingSubscribers = JSON.parse(localStorage.getItem("newsletterSubscribers") || "[]");
        const subscriber = existingSubscribers.find((sub: { confirmToken: string }) => sub.confirmToken === token);
        
        if (subscriber) {
          subscriber.confirmed = true;
          localStorage.setItem("newsletterSubscribers", JSON.stringify(existingSubscribers));
          setStatus("success");
          
          toast({
            title: "Email confirmé !",
            description: "Votre inscription à la newsletter est maintenant active.",
          });
          
          // Send welcome email
          sendWelcomeEmailToUser(subscriber.email);
        } else {
          setStatus("error");
          
          toast({
            title: "Erreur de confirmation",
            description: "Le lien de confirmation est invalide ou expiré.",
            variant: "destructive",
          });
        }
      } catch (error) {
        setStatus("error");
        
        toast({
          title: "Erreur",
          description: "Une erreur est survenue lors de la confirmation.",
          variant: "destructive",
        });
      }
    }, 1500);
  }, [searchParams, toast]);

  const sendWelcomeEmailToUser = async (email: string) => {
    // Send welcome email using email service
    const result = await sendWelcomeEmail(email);
    
    if (result && !result.success) {
      console.error("Failed to send welcome email:", result.error);
    }
  };

  const handleReturnHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 py-12 px-4">
      <div className="max-w-md mx-auto">
        <Card className="shadow-xl border-0">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-t-lg text-center">
            <CardTitle className="text-xl flex items-center justify-center">
              <Mail className="w-5 h-5 mr-2" />
              <span>Confirmation d'abonnement</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 text-center">
            {status === "loading" && (
              <div className="py-8">
                <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Vérification en cours...
                </h3>
                <p className="text-gray-600">
                  Nous vérifions votre lien de confirmation
                </p>
              </div>
            )}

            {status === "success" && (
              <div className="py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Email confirmé avec succès !
                </h3>
                <p className="text-gray-600 mb-6">
                  Merci d'avoir confirmé votre abonnement à notre newsletter. Vous recevrez bientôt nos prochains contenus.
                </p>
                <Button
                  onClick={handleReturnHome}
                  className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-semibold py-3 rounded-lg transition-all duration-300"
                >
                  Retour à l'accueil
                </Button>
              </div>
            )}

            {status === "error" && (
              <div className="py-8">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Échec de la confirmation
                </h3>
                <p className="text-gray-600 mb-6">
                  Le lien de confirmation est invalide ou a expiré. Veuillez vérifier l'URL ou réessayer de vous inscrire.
                </p>
                <Button
                  onClick={handleReturnHome}
                  className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-semibold py-3 rounded-lg transition-all duration-300"
                >
                  Retour à l'accueil
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ConfirmSubscription;