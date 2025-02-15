export interface Location {
	name: string;
	address: string;
}

export interface Category {
	icon: string;
	title: string;
	locations: Location[];
}

export interface SearchResult extends Location {
	categoryTitle: string;
	categoryIcon: string;
}

export const categories: Category[] = [
	{
		icon: "Building2",
		title: "Apartment Building",
		locations: [
			{ name: "The Grand Towers", address: "123 Main St" },
			{ name: "Sunset Apartments", address: "456 Park Ave" },
			{ name: "Highland Residences", address: "789 Hill Rd" },
		],
	},
	{
		icon: "Hotel",
		title: "Hotel",
		locations: [
			{ name: "Luxury Plaza Hotel", address: "321 Downtown Blvd" },
			{ name: "Oceanview Resort", address: "654 Beach Dr" },
			{ name: "Mountain Lodge", address: "987 Peak Way" },
		],
	},
	{
		icon: "Car",
		title: "Valet",
		locations: [
			{ name: "Grand Hotel Valet", address: "123 Luxury Lane" },
			{ name: "Plaza Premium Valet", address: "456 Elite St" },
			{ name: "Royal Valet Services", address: "789 Crown Ave" },
		],
	},
	{
		icon: "School",
		title: "School",
		locations: [
			{ name: "Washington Elementary", address: "111 Education Dr" },
			{ name: "Lincoln High School", address: "222 Learning Ln" },
			{ name: "Central Academy", address: "333 Scholar St" },
		],
	},
	{
		icon: "Flame",
		title: "Camp",
		locations: [
			{ name: "Pine Valley Camp", address: "444 Forest Rd" },
			{ name: "Lake Adventure Camp", address: "555 Lakeside Dr" },
			{ name: "Mountain View Camp", address: "666 Summit Way" },
		],
	},
];