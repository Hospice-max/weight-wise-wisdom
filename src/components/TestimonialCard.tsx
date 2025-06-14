
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Quote } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  age: number;
  story: string;
  weightLoss: number;
  timeframe: string;
  image: string | null;
}

interface TestimonialCardProps {
  testimonial: Testimonial;
}
const TestimonialCard = ({ testimonial }: TestimonialCardProps) => {
  console.log("testimonials", testimonial);
  return (
    <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg bg-gradient-to-br from-white to-blue-50">
      <CardContent className="p-6">
        <Quote className="w-8 h-8 text-blue-400 mb-4" />
        
        <p className="text-gray-700 mb-6 leading-relaxed italic">
          "{testimonial.story}"
        </p>
        
        <div className="flex items-center gap-3 mb-4">
          <Avatar className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500">
            {!testimonial.image ? (
              <AvatarFallback className="text-white bg-blue-600 font-bold">
                {testimonial.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            ) : (
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-full h-full object-cover"
              />
            )}
          </Avatar>
          <div>
            <div className="font-semibold text-gray-800">{testimonial.name}</div>
            <div className="text-sm text-gray-500">{testimonial.age} ans</div>
          </div>
        </div>
        
        <div className="flex gap-2 flex-wrap">
          <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-200">
            -{testimonial.weightLoss}kg
          </Badge>
          <Badge variant="outline" className="border-blue-200 text-blue-700">
            {testimonial.timeframe}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default TestimonialCard;
