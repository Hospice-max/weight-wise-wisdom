
import { TrendingUp, Users, MessageCircle, Award } from "lucide-react";

const StatsSection = () => {
  const stats = [
    {
      icon: Users,
      number: "2,847",
      label: "Membres actifs",
      color: "text-blue-600"
    },
    {
      icon: MessageCircle,
      number: "12,450",
      label: "Conseils partagés",
      color: "text-green-600"
    },
    {
      icon: TrendingUp,
      number: "89%",
      label: "Taux de réussite",
      color: "text-purple-600"
    },
    {
      icon: Award,
      number: "156",
      label: "Objectifs atteints ce mois",
      color: "text-orange-600"
    }
  ];

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Notre Impact Ensemble
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="text-center p-6 rounded-xl bg-gray-50 hover:shadow-lg transition-shadow duration-300">
              <stat.icon className={`w-10 h-10 mx-auto mb-3 ${stat.color}`} />
              <div className="text-3xl font-bold text-gray-800 mb-1">{stat.number}</div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
