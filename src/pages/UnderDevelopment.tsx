import { useLocation } from "react-router-dom";

interface DevelopmentMessage {
  title: string;
  description: string;
  details: string;
  icon: string;
}

const UnderDevelopment = () => {
  const location = useLocation();

  // Check if the path is related to resources or tools
  const isResourcePath = [
    "/guides-nutritionnels",
    "/programmes-exercices",
    "/recettes-saines",
    "/groupes-soutien",
    "/toutes-les-ressources"
  ].includes(location.pathname);

  // Check if the path suggests a partnership
  const isPartnershipPath = location.pathname.includes("partenariat") || 
                            location.pathname.includes("partenaire") ||
                            location.pathname.includes("partner");

  // Determine the appropriate message
  const getMessage = (): DevelopmentMessage => {
    if (isPartnershipPath) {
      return {
        title: "Partenariat en Cours",
        description: "Cette section est en cours de développement dans le cadre d'un partenariat stratégique.",
        details: "Nous travaillons activement avec nos partenaires pour vous offrir une expérience exceptionnelle. Revenez bientôt pour découvrir nos nouvelles fonctionnalités !",
        icon: "🤝"
      };
    } else if (isResourcePath) {
      return {
        title: "Ressource en Développement",
        description: "Cette ressource est actuellement en cours de création.",
        details: "Notre équipe travaille dur pour vous fournir du contenu de qualité. Revenez dans quelques jours pour accéder à cette ressource !",
        icon: "🛠️"
      };
    } else {
      return {
        title: "Fonctionnalité en Cours de Développement",
        description: "Cette fonctionnalité est actuellement en cours de développement.",
        details: "Notre équipe travaille activement sur cette fonctionnalité. Revenez bientôt pour découvrir ce que nous avons préparé pour vous !",
        icon: "⚙️"
      };
    }
  };

  const message = getMessage();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50 p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-green-500 p-6 text-white text-center">
          <div className="text-6xl mb-4">{message.icon}</div>
          <h1 className="text-3xl font-bold">{message.title}</h1>
        </div>
        
        <div className="p-8 text-center">
          <p className="text-xl text-gray-700 mb-4">{message.description}</p>
          <p className="text-gray-600 mb-8">{message.details}</p>
          
          <div className="bg-blue-50 rounded-lg p-6 mb-8">
            <h2 className="text-lg font-semibold text-blue-800 mb-2">Restez Informé</h2>
            <p className="text-blue-600">
              Inscrivez-vous à notre newsletter pour être notifié dès que cette page sera disponible.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/" 
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-green-500 text-white font-medium rounded-lg hover:from-blue-600 hover:to-green-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Retour à l'Accueil
            </a>
            <a 
              href="/#resources" 
              className="px-6 py-3 bg-white border-2 border-blue-500 text-blue-500 font-medium rounded-lg hover:bg-blue-50 transition-all duration-300"
            >
              Voir les Ressources Disponibles
            </a>
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 text-center text-sm text-gray-500">
          <p>Chemin: {location.pathname}</p>
        </div>
      </div>
    </div>
  );
};

export default UnderDevelopment;