"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, DollarSign } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const menuItems = [
	{ title: "Home", href: "/" },
    { title: "Send Money", href: "/send-money" },
];

export function Navbar() {
	const [isOpen, setIsOpen] = React.useState(false);
	const pathname = usePathname();

	return (
		<nav className="bg-background border-b">
			<div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
				<div className="flex items-center flex-1">
					<div className="hidden md:block ml-5">
						<div className="flex items-baseline space-x-4">
							{menuItems.map((item) => (
								<Link
									key={item.title}
									href={item.href}
									className={cn(
										"px-3 py-2 rounded-md text-sm font-medium",
										pathname === item.href
											? "bg-primary text-primary-foreground"
											: "text-muted-foreground hover:text-primary hover:bg-primary/10"
									)}
								>
									{item.title}
								</Link>
							))}
						</div>
					</div>
				</div>
				<div className="md:hidden">
					<Sheet open={isOpen} onOpenChange={setIsOpen}>
						<SheetTrigger asChild>
							<Button variant="ghost" size="icon">
								<Menu className="h-6 w-6" />
								<span className="sr-only">Open menu</span>
							</Button>
						</SheetTrigger>
						<SheetContent side="right">
							<div className="flex flex-col space-y-4">
								{menuItems.map((item) => (
									<Link
										key={item.title}
										href={item.href}
										className={cn(
											"px-3 py-2 rounded-md text-sm font-medium",
											pathname === item.href
												? "bg-primary text-primary-foreground"
												: "text-muted-foreground hover:text-primary hover:bg-primary/10"
										)}
										onClick={() => setIsOpen(false)}
									>
										{item.title}
									</Link>
								))}
								<Separator />
								<Button
									variant="outline"
									onClick={() => setIsOpen(false)}
								>
									Sign In
								</Button>
							</div>
						</SheetContent>
					</Sheet>
				</div>
			</div>
		</nav>
	);
}