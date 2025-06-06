import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, BookOpen, Activity, Utensils, Users } from "lucide-react";

const ResourcesSection = () => {
  const resources = [
    {
      icon: BookOpen,
      title: "Guides Nutritionnels",
      description: "Des guides pratiques pour adopter une alimentation équilibrée et durable",
      link: "/guides-nutritionnels",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Activity,
      title: "Programmes d'Exercices",
      description: "Routines adaptées à tous les niveaux pour intégrer le sport au quotidien",
      link: "/programmes-exercices",
      color: "from-green-500 to-green-600"
    },
    {
      icon: Utensils,
      title: "Recettes Saines",
      description: "Découvrez des recettes savoureuses et équilibrées pour varier vos repas",
      link: "/recettes-saines",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: Users,
      title: "Groupes de Soutien",
      description: "Rejoignez des groupes locaux ou en ligne pour un accompagnement personnalisé",
      link: "/groupes-soutien",
      color: "from-orange-500 to-orange-600"
    }
  ];

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Ressources & Outils
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Accédez à une sélection de ressources fiables pour vous accompagner dans votre démarche
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {resources.map((resource, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg">
              <CardHeader className="text-center">
                <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-r ${resource.color} rounded-full flex items-center justify-center`}>
                  <resource.icon className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                  {resource.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {resource.description}
                </p>
                <a href={resource.link} className="w-full">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full group-hover:bg-blue-50 group-hover:border-blue-300 transition-all duration-300 hover:scale-105 hover:bg-blue-100 hover:border-blue-400 hover:text-blue-600"
                  >
                    <ExternalLink className="w-4 h-4 mr-2 transition-transform group-hover:translate-x-1" />
                    Découvrir
                  </Button>
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-sm text-gray-500 mb-4">
            Toutes nos ressources sont validées par des professionnels de santé
          </p>
          <a href="/toutes-les-ressources">
            <Button variant="outline" className="px-8 transition-all duration-300 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600">
              Voir toutes les ressources
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ResourcesSection;
