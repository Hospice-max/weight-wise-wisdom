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
    id: Date.now(),
    name: "",
    age: "",
    story: "",
    image: null as File | null,
    weightLoss: "",
    timeframe: "",
  });

  const { toast } = useToast();
  const stockage = async () => {
    try {
      // Récupération des données existantes, avec validation pour garantir un tableau
      let existingData = [];
      const storedData = localStorage.getItem("Témoignages");
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        existingData = Array.isArray(parsedData) ? parsedData : [];
      }
  
      // Limiter le nombre d'éléments stockés (par exemple, 10 maximum)
      // const MAX_ITEMS = 10;
      // if (existingData.length >= MAX_ITEMS) {
      //   existingData = existingData.slice(-MAX_ITEMS + 1); // Garde les plus récents
      // }
  
      // Conversion de l'image en base64 si nécessaire
      let base64Image = null;
      if (formData.image instanceof File) {
        // Optionnel : Vérifier la taille du fichier avant conversion
        if (formData.image.size > 1 * 1024 * 1024) { // Limite à 1 MB
          toast({
            title: "Erreur",
            description: "L'image est trop volumineuse. Veuillez utiliser une image plus petite.",
            variant: "destructive",
          });          
        }
        
        base64Image = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = () => reject(new Error("Erreur lors de la lecture du fichier image"));
          reader.readAsDataURL(formData.image);
        });
      } else if (typeof formData.image === "string" && formData.image) {
        base64Image = formData.image;
      }
  
      // Création de l'objet à sauvegarder
      const dataToSave = {
        ...formData,
        image: base64Image,
      };
  
      // Ajout des données
      existingData.push(dataToSave);
  
      // Vérifier la taille des données avant sauvegarde
      const serializedData = JSON.stringify(existingData);
      const dataSizeKB = new TextEncoder().encode(serializedData).length / 1024;
      if (dataSizeKB > 4000) { // Limite à ~4 MB pour rester sous la limite typique de 5 MB
        toast({
          title: "Erreur",
          description: "Merci de votre témoignage, mais notre quota de témoignages est atteint. Revenez plus tard !",
          variant: "destructive",
        });
      }else {
        toast({
          title: "Témoignage envoyé !",
          description:
            "Merci de partager votre expérience. Elle sera vérifiée avant publication.",
        });
      }
  
      // Sauvegarde des données
      localStorage.setItem("Témoignages", serializedData);
    } catch (error) {
      if (error.name === "QuotaExceededError") {
        console.error("Erreur : La limite de stockage du navigateur est dépassée.");       
        toast({
          title: "Erreur",
          description: "Merci de votre témoignage, mais notre quota de témoignages est atteint. Revenez plus tard !",
          variant: "destructive",
        });
      } else {
        console.error("Erreur lors de la sauvegarde des données :", error);
      }
      throw error; // Relancer l'erreur pour la gestion par l'appelant
    }
  };

  const handleSubmit = async () => {
    try {
    // e.preventDefault();
    await stockage();
   

    setFormData({
      id: Date.now(),
      name: "",
      age: "",
      story: "",
      image: null,
      weightLoss: "",
      timeframe: "",
    });
    } catch (error) {
      console.error("Erreur lors de l'envoi du formulaire :", error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const openFileInput = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.style.display = "none";
    document.body.appendChild(fileInput);
    fileInput.click();

    fileInput.addEventListener("change", (event) => {
      const target = event.target as HTMLInputElement;
      const file = target.files?.[0];
      if (file) {
        setFormData((prev) => ({
          ...prev,
          image: file,
        }));

        const reader = new FileReader();
        reader.onload = (e) => {
          const previewImage = document.getElementById("previewImage");
          if (previewImage) {
            (previewImage as HTMLImageElement).src = e.target?.result as string;
          }
        };
        reader.readAsDataURL(file);
      }

      document.body.removeChild(fileInput);
    });
  };

  return (
    <section
      id="share-experience"
      className="py-16 px-4 bg-gradient-to-r from-blue-50 to-green-50"
    >
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <Share2 className="w-12 h-12 mx-auto mb-4 text-blue-600" />
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Partagez Votre Expérience
          </h2>
          <p className="text-lg text-gray-600">
            Votre histoire peut inspirer et aider d'autres personnes dans leur
            parcours
          </p>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-t-lg">
            <CardTitle className="text-center text-xl flex justify-between items-center">
              <div className="relative">
                {formData.image ? (
                  <img
                    id="previewImage"
                    src={
                      typeof formData.image === "string"
                        ? formData.image
                        : URL.createObjectURL(formData.image)
                    }
                    alt="Preview"
                    className="w-16 h-16 object-cover rounded-full"
                  />
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 30 30"
                    width="35"
                    height="35"
                  >
                    <path
                      fill="currentColor"
                      d="M16 8a5 5 0 1 0 5 5a5 5 0 0 0-5-5"
                    />
                    <path
                      fill="currentColor"
                      d="M16 2a14 14 0 1 0 14 14A14.016 14.016 0 0 0 16 2m7.993 22.926A5 5 0 0 0 19 20h-6a5 5 0 0 0-4.992 4.926a12 12 0 1 1 15.985 0"
                    />
                  </svg>
                )}

                <button
                  onClick={openFileInput}
                  className="absolute bottom-0 right-0 bg-blue-600 p-1 rounded-full text-white hover:bg-blue-700"
                  title="Changer l'image"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-2 w-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M17.414 2.586a2 2 0 0 0-2.828 0L6 11.172V14h2.828l8.586-8.586a2 2 0 0 0 0-2.828zM4 16a1 1 0 0 1-1-1v-3.586l2 2V16z" />
                  </svg>
                </button>
              </div>

              <span className="flex-1 text-center">Nouveau Témoignage</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name" className="text-gray-700 font-medium">
                    Prénom*
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Marie L."
                    className="mt-1"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="age" className="text-gray-700 font-medium">
                    Âge *
                  </Label>
                  <Input
                    id="age"
                    name="age"
                    type="number"
                    value={formData.age}
                    onChange={handleChange}
                    placeholder="34"
                    className="mt-1"
                    required
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
                  <Label
                    htmlFor="weightLoss"
                    className="text-gray-700 font-medium"
                  >
                    Perte de poids (kg)*
                  </Label>
                  <Input
                    id="weightLoss"
                    name="weightLoss"
                    type="number"
                    value={formData.weightLoss}
                    onChange={handleChange}
                    placeholder="25"
                    className="mt-1"
                    required
                  />
                </div>
                <div>
                  <Label
                    htmlFor="timeframe"
                    className="text-gray-700 font-medium"
                  >
                    Durée *
                  </Label>
                  <Input
                    id="timeframe"
                    name="timeframe"
                    value={formData.timeframe}
                    onChange={handleChange}
                    placeholder="18 mois"
                    className="mt-1"
                    required
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
