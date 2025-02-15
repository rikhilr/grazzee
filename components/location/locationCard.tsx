// src/components/LocationCard.tsx

import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import CategoryIcon from "../category/categoryIcon";
import Link from "next/link";

interface Props {
	icon: any;
	name: string;
	address: string;
	categoryTitle: string;
}

function LocationCard({ icon, name, address, categoryTitle }: Props) {
	return (
		<Link
			href={`./location/${name.replace(/\s+/g, "-").toLowerCase()}`}
			key={name}
		>
			<Card className="group bg-gray-900 border-gray-700 hover:border-gray-500 transition-all duration-300">
				<CardContent className="p-6">
					<div className="flex items-center space-x-4 mb-4">
						<div className="p-3 rounded-full bg-gray-800 group-hover:bg-gray-700 transition-colors">
							<CategoryIcon iconName={icon} />
						</div>
						<div className="flex-1">
							<h3 className="text-lg font-semibold text-white">
								{name}
							</h3>
							<p className="text-gray-400">{categoryTitle}</p>
						</div>
						<ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors transform group-hover:translate-x-1 duration-300" />
					</div>
					<p className="text-gray-300">{address}</p>
				</CardContent>
			</Card>
		</Link>
	);
}

export default LocationCard;