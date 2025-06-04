
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Share2, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ShareExperienceForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    story: "",
    weightLoss: "",
    timeframe: ""
  });
  
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulation d'envoi - dans la vraie app, cela irait vers Laravel/MongoDB
    console.log("Données du témoignage:", formData);
    
    toast({
      title: "Témoignage envoyé !",
      description: "Merci de partager votre expérience. Elle sera vérifiée avant publication.",
    });
    
    // Reset du formulaire
    setFormData({
      name: "",
      age: "",
      story: "",
      weightLoss: "",
      timeframe: ""
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section className="py-16 px-4 bg-gradient-to-r from-blue-50 to-green-50">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <Share2 className="w-12 h-12 mx-auto mb-4 text-blue-600" />
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Partagez Votre Expérience
          </h2>
          <p className="text-lg text-gray-600">
            Votre histoire peut inspirer et aider d'autres personnes dans leur parcours
          </p>
        </div>
        
        <Card className="shadow-xl border-0">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-t-lg">
            <CardTitle className="text-center text-xl">Nouveau Témoignage</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name" className="text-gray-700 font-medium">
                    Prénom (optionnel)
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Marie L."
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="age" className="text-gray-700 font-medium">
                    Âge (optionnel)
                  </Label>
                  <Input
                    id="age"
                    name="age"
                    type="number"
                    value={formData.age}
                    onChange={handleChange}
                    placeholder="34"
                    className="mt-1"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="story" className="text-gray-700 font-medium">
                  Votre histoire ou conseil *
                </Label>
                <Textarea
                  id="story"
                  name="story"
                  value={formData.story}
                  onChange={handleChange}
                  placeholder="Partagez votre expérience, vos conseils, ce qui vous a aidé..."
                  className="mt-1 min-h-[120px]"
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="weightLoss" className="text-gray-700 font-medium">
                    Perte de poids (kg, optionnel)
                  </Label>
                  <Input
                    id="weightLoss"
                    name="weightLoss"
                    type="number"
                    value={formData.weightLoss}
                    onChange={handleChange}
                    placeholder="25"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="timeframe" className="text-gray-700 font-medium">
                    Durée (optionnel)
                  </Label>
                  <Input
                    id="timeframe"
                    name="timeframe"
                    value={formData.timeframe}
                    onChange={handleChange}
                    placeholder="18 mois"
                    className="mt-1"
                  />
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-semibold py-3 rounded-lg transition-all duration-300"
              >
                <Send className="w-4 h-4 mr-2" />
                Partager mon témoignage
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ShareExperienceForm;
