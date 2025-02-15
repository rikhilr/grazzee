// src/data/services.ts

import { Flame, Building2, School, Bell } from "lucide-react";

export interface Service {
  icon: any; // Use `any` for Lucide icons
  title: string;
  description: string;
  link: string;
  href: string;
}

export const services: Service[] = [
  {
    icon: Flame,
    title: "Day/Overnight Camps",
    description: "Parents can easily send money to all camp staff at once",
    link: "Grazzee for Camps",
    href: "/camps",
  },
  {
    icon: Building2,
    title: "Apartment Buildings",
    description: "Residents love the option to send all building staff holiday cash gifts at once.",
    link: "Grazzee for Buildings",
    href: "/buildings",
  },
  {
    icon: School,
    title: "Schools",
    description: "Parents love this option for sending cash gifts to their kids teachers over the holidays.",
    link: "Grazzee for Schools",
    href: "/schools",
  },
  {
    icon: Bell,
    title: "Hotels",
    description: "Guests can scan a QR code to send hotel staff money in an instant.",
    link: "Grazzee for Hotels",
    href: "/hotels",
  },
];