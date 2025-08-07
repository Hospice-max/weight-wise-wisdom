import { useState, ChangeEvent } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Share2, Send, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Taille maximale de l'image en octets (1 Mo)
const MAX_IMAGE_SIZE = 1 * 1024 * 1024;

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
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (!file) {
      setImageError(null);
      setImagePreview(null);
      setFormData(prev => ({ ...prev, image: null }));
      return;
    }

    // Vérification de la taille de l'image
    if (file.size > MAX_IMAGE_SIZE) {
      toast({
        title: "Image trop volumineuse",
        description: "L'image ne doit pas dépasser 1 Mo. Veuillez en sélectionner une plus petite.",
        variant: "destructive",
      });
      setImageError("L'image est trop volumineuse (max 1 Mo)");
      setImagePreview(null);
      setFormData(prev => ({ ...prev, image: null }));
      return;
    }

    // Vérification du type de fichier
    if (!file.type.match('image.*')) {
      toast({
        title: "Type de fichier non supporté",
        description: "Veuillez sélectionner une image valide (JPEG, PNG, etc.)",
        variant: "destructive",
      });
      setImageError("Type de fichier non supporté");
      setImagePreview(null);
      setFormData(prev => ({ ...prev, image: null }));
      return;
    }

    // Création de l'aperçu de l'image
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
      setFormData(prev => ({ ...prev, image: file }));
    };
    reader.readAsDataURL(file);
    setImageError(null);
  };

  const removeImage = () => {
    setImagePreview(null);
    setFormData(prev => ({ ...prev, image: null }));
    setImageError(null);
    // Réinitialiser l'input file
    const fileInput = document.getElementById('image-upload') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  };

  const stockage = async () => {
    try {
      // Vérification des champs obligatoires
      if (!formData.name || !formData.age || !formData.story || !formData.weightLoss || !formData.timeframe) {
        toast({
          title: "Champs manquants",
          description: "Veuillez remplir tous les champs obligatoires.",
          variant: "destructive",
        });
        return;
      }

      // Vérification de l'image si elle a été sélectionnée
      if (formData.image && formData.image instanceof File) {
        if (formData.image.size > MAX_IMAGE_SIZE) {
          toast({
            title: "Image trop volumineuse",
            description: "L'image ne doit pas dépasser 1 Mo. Veuillez en sélectionner une plus petite.",
            variant: "destructive",
          });
          return;
        }
      }

      // Récupération des données existantes
      let existingData = [];
      const storedData = localStorage.getItem("Témoignages");
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        existingData = Array.isArray(parsedData) ? parsedData : [];
      }
      
      // Récupérer l'ID utilisateur actuel
      const currentUserId = localStorage.getItem('currentUserId');
      
      // Conversion de l'image en base64 si nécessaire
      let base64Image = null;
      if (formData.image) {
        base64Image = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = () => resolve(null);
          reader.readAsDataURL(formData.image);
        });
      }
  
      // Création de l'objet à sauvegarder avec l'ID utilisateur
      const dataToSave = {
        ...formData,
        image: base64Image,
        userId: currentUserId, // Ajout de l'ID utilisateur
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
    fileInput.id = 'image-upload';
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.style.display = "none";
    document.body.appendChild(fileInput);
    
    fileInput.addEventListener("change", (event) => {
      handleImageChange(event as unknown as ChangeEvent<HTMLInputElement>);
      document.body.removeChild(fileInput);
    });
    
    fileInput.click();
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
                {imagePreview ? (
                  <div className="relative group">
                    <img
                      src={imagePreview}
                      alt="Aperçu"
                      className="w-16 h-16 object-cover rounded-full"
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeImage();
                      }}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Supprimer l'image"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ) : (
                  <div 
                    onClick={openFileInput}
                    className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 30 30"
                      width="30"
                      height="30"
                      className="text-gray-400"
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
                  </div>
                )}
                {!imagePreview && (
                  <button
                    onClick={openFileInput}
                    className="absolute bottom-0 right-0 bg-blue-600 p-1.5 rounded-full text-white hover:bg-blue-700 transition-colors"
                    title="Ajouter une image"
                    type="button"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M17.414 2.586a2 2 0 0 0-2.828 0L6 11.172V14h2.828l8.586-8.586a2 2 0 0 0 0-2.828zM4 16a1 1 0 0 1-1-1v-3.586l2 2V16z" />
                    </svg>
                  </button>
                )}
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
