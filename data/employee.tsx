// src/data/employees.ts

export interface Employee {
	id: string;
	name: string;
	role: string;
	location: string;
	stripe_id?: string;
}

export const employees: Employee[] = [
	{
		id: "1",
		name: "John Doe",
		role: "Concierge",
		location: "The Grand Towers",
		stripe_id: 'acct_1Qm1XcEDQbEL5UC3',
	},
	{
		id: "2",
		name: "Jane Smith",
		role: "Maintenance",
		location: "The Grand Towers",
	},
	{
		id: "3",
		name: "Alice Johnson",
		role: "Security",
		location: "The Grand Towers",
	},
	{
		id: "4",
		name: "Bob Brown",
		role: "Manager",
		location: "Sunset Apartments",
	},
	{
		id: "5",
		name: "Charlie Davis",
		role: "Janitor",
		location: "Sunset Apartments",
	},
	{
		id: "6",
		name: "Eve Wilson",
		role: "Receptionist",
		location: "Highland Residences",
	},
];