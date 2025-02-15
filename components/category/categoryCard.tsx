import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react"
import CategoryIcon from "./categoryIcon";

interface Props {
    icon: any
	title: string;
	locations: { name: string; address: string }[]
	handleCategoryClick: (title: string) => void;
}

function CategoryCard({ icon, title, locations, handleCategoryClick }: Props) {
	return (
		<Card
			key={title}
			className="group bg-gray-900 border-gray-700 hover:border-gray-500 transition-all duration-300 cursor-pointer"
			onClick={() => handleCategoryClick(title)}
		>
			<CardContent className="p-6">
				<div className="flex items-center space-x-4">
					<div className="p-3 rounded-full bg-gray-800 group-hover:bg-gray-700 transition-colors">
						<CategoryIcon iconName={icon} />
					</div>
					<div className="flex-1">
						<h3 className="text-lg font-semibold text-white">
							{title}
						</h3>
						<p className="text-gray-400">
							{locations.length} locations
						</p>
					</div>
					<ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors transform group-hover:translate-x-1 duration-300" />
				</div>
			</CardContent>
		</Card>
	);
}

export default CategoryCard;