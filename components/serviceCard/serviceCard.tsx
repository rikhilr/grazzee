import { Card, CardContent } from "@/components/ui/card";
import { ReactNode } from "react";

interface Props {
  icon: ReactNode;
  title: string;
  description: string;
}

function ServiceCard({ icon, title, description }: Props) {
  return (
    <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 hover:border-gray-600 transition-all duration-300 group overflow-hidden">
      <CardContent className="p-8 flex flex-col h-full relative">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="flex items-center space-x-4 mb-6 relative z-10">
          <div className="p-3 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors duration-300">
            {icon}
          </div>
          <h2 className="text-2xl font-bold text-white">{title}</h2>
        </div>
        <p className="text-gray-300 text-lg flex-grow relative z-10">{description}</p>
        <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-radial from-gray-700 to-transparent opacity-50 rounded-full transform translate-x-1/2 translate-y-1/2"></div>
      </CardContent>
    </Card>
  );
}

export default ServiceCard;