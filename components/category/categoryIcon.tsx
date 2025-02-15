import {
	Building2,
	School,
	Flame,
	Car,
	Hotel,
} from "lucide-react";

const iconMap = {
	Building2,
	School,
	Flame,
	Car,
	Hotel,
};

interface Props {
	iconName: keyof typeof iconMap;
    className?: string;
}

function CategoryIcon({ iconName, className }: Props) {
    const Icon = iconMap[iconName];
    console.warn(typeof(Icon));

    return <Icon className={className} />
}

export default CategoryIcon;
