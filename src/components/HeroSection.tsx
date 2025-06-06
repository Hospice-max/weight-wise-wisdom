import { Heart, Users, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from 'react-scroll';

const HeroSection = () => {
  return (
    <section className="relative py-20 px-4 text-center bg-gradient-to-r from-blue-600 via-blue-500 to-green-500">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="relative max-w-4xl mx-auto text-white">
        <div className="mb-8">
          <Heart className="w-16 h-16 mx-auto mb-4 text-white/90" />
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Ensemble Contre l'Obésité
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto leading-relaxed">
            Une communauté bienveillante où chacun peut partager son expérience, 
            donner des conseils et trouver du soutien dans sa démarche de bien-être
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold rounded-full">
            <Link to="share-experience" smooth={true} duration={500} spy={true}>
              Partager mon expérience
            </Link>
          </Button>
          <Button asChild className="border-white text-blue-600 hover:bg-gray-100 bg-white px-8 py-3 text-lg font-semibold rounded-full cursor-pointer">
            <Link to="testimonials" smooth={true} duration={500} spy={true}>
              Lire les témoignages
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white/90">
          <div className="flex flex-col items-center">
            <Users className="w-8 h-8 mb-2" />
            <p className="font-semibold">Communauté Bienveillante</p>
          </div>
          <div className="flex flex-col items-center">
            <Target className="w-8 h-8 mb-2" />
            <p className="font-semibold">Objectifs Réalisables</p>
          </div>
          <div className="flex flex-col items-center">
            <Heart className="w-8 h-8 mb-2" />
            <p className="font-semibold">Soutien Mutuel</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
