import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import TestimonialCard from "@/components/TestimonialCard";
import ShareExperienceForm from "@/components/ShareExperienceForm";
import ResourcesSection from "@/components/ResourcesSection";
import { useEffect, useState } from "react";

const Index = () => {
  const defaultTestimonials = [
    {
      id: 1,
      name: "Marie L.",
      age: 34,
      story:
        "Après avoir perdu 25kg en 18 mois, je peux dire que la clé c'est la patience et l'accompagnement. N'hésitez pas à vous faire aider !",
      weightLoss: 25,
      timeframe: "18 mois",
      image: null,
    },
    {
      id: 2,
      name: "Thomas B.",
      age: 42,
      story:
        "Le sport m'a sauvé la vie. Commencez petit : 10 minutes de marche par jour, puis augmentez progressivement. L'important c'est la régularité.",
      weightLoss: 18,
      timeframe: "12 mois",
      image: null,
    },
    {
      id: 3,
      name: "Sarah K.",
      age: 29,
      story:
        "Changer mes habitudes alimentaires sans me priver complètement a été la solution. 80% d'alimentation saine, 20% de plaisir !",
      weightLoss: 15,
      timeframe: "10 mois",
      image: null,
    },
  ];

  const [testimonials, setTestimonials] = useState(defaultTestimonials);

  useEffect(() => {
    const testim = localStorage.getItem("Témoignages");
    if (testim) {
      const parsedTestim = JSON.parse(testim);
      if (Array.isArray(parsedTestim)) {
        setTestimonials((prev) => [...prev, ...parsedTestim]);
      } else {
        setTestimonials((prev) => [...prev, parsedTestim]);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <HeroSection />
      <StatsSection />

      {/* Section témoignages */}
      <section id="testimonials" className="py-16 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Témoignages & Conseils
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Découvrez les expériences inspirantes de notre communauté et
            partagez la vôtre
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.id ?? `testimonial-${index}`}
              testimonial={testimonial}
            />
          ))}
        </div>
      </section>

      <ShareExperienceForm />
      <ResourcesSection />

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gray-300">
            2024 Ensemble Contre l'Obésité - Une communauté bienveillante pour
            un mode de vie sain
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
