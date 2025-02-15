"use client";

import { Input } from "@/components/ui/input";
import { Search, ChevronLeft } from "lucide-react";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import CategoryCard from "@/components/category/categoryCard";
import LocationCard from "@/components/location/locationCard";
import { categories, Category, Location, SearchResult } from "@/data/data";

export default function Home() {
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

	const searchResults: SearchResult[] = useMemo(() => {
		if (!searchQuery) return [];
		return categories.flatMap((category) =>
			category.locations
				.filter(
					(location) =>
						location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
						location.address.toLowerCase().includes(searchQuery.toLowerCase())
				)
				.map((location) => ({
					...location,
					categoryTitle: category.title,
					categoryIcon: category.icon,
				}))
		);
	}, [searchQuery]);

	const handleCategoryClick = (categoryTitle: string) => {
		setSelectedCategory(categoryTitle);
		setSearchQuery("");
	};

	const handleBackClick = () => {
		setSelectedCategory(null);
		setSearchQuery("");
	};

	const renderLocationCard = (location: Location, categoryTitle: string, icon: string) => (
		<LocationCard
			key={location.name}
			name={location.name}
			address={location.address}
			categoryTitle={categoryTitle}
			icon={icon}
		/>
	);

	const renderLocationsForCategory = (categoryTitle: string) => {
		const category = categories.find((cat) => cat.title === categoryTitle);
		if (!category) return null;

		return category.locations.map((location) =>
			renderLocationCard(location, categoryTitle, category.icon)
		);
	};

	const renderSearchResults = () => {
		if (searchResults.length === 0) {
			return (
				<div className="col-span-full text-center text-gray-400 py-12">
					No locations found matching your search.
				</div>
			);
		}

		return searchResults.map((result) =>
			renderLocationCard(result, result.categoryTitle, result.categoryIcon)
		);
	};

	const renderCategories = () => {
		return categories.map((category) => (
			<CategoryCard
				key={category.title}
				{...category}
				handleCategoryClick={() => handleCategoryClick(category.title)}
			/>
		));
	};

	const renderContent = () => {
		if (selectedCategory) {
			return renderLocationsForCategory(selectedCategory);
		}

		if (searchQuery) {
			return renderSearchResults();
		}

		return renderCategories();
	};

	return (
		<div className="min-h-screen flex flex-col bg-black text-white">
			<main className="flex-grow px-4 py-12 sm:px-6 lg:px-8">
				<div className="max-w-7xl mx-auto space-y-16">
					<div className="text-center space-y-6">
						<h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight">
							Send Cash Gifts
							<span className="block text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-400">
								with Ease
							</span>
						</h1>
						<p className="text-xl sm:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
							Search and find staff members at any location
						</p>
					</div>

					{selectedCategory ? (
						<>
							<Button
								onClick={handleBackClick}
								className="mb-6 bg-gray-800 hover:bg-gray-700 text-white"
								aria-label="Back to Categories"
							>
								<ChevronLeft className="mr-2 h-4 w-4" /> Back to Categories
							</Button>
							<h2 className="text-3xl font-bold mb-6">{selectedCategory}</h2>
						</>
					) : (
						<div className="max-w-2xl mx-auto mb-12">
							<div className="relative">
								<Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
								<Input
									type="text"
									placeholder="Search locations (e.g., 'Grand Hotel Valet', 'Sunset Apartments')..."
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
									className="w-full pl-12 pr-4 py-6 text-lg bg-gray-900 border-gray-700 rounded-full focus:ring-2 focus:ring-white focus:border-transparent placeholder:text-gray-500 text-white"
									aria-label="Search locations"
								/>
							</div>
						</div>
					)}

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{renderContent()}
					</div>
				</div>
			</main>
		</div>
	);
}