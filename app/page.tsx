"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services } from "@/data/services";
import ServiceCard from "@/components/serviceCard/serviceCard";

export default function Home() {
	return (
		<div className="min-h-screen flex flex-col bg-black text-white overflow-hidden">
			<main className="flex-grow px-4 py-12 sm:px-6 lg:px-8 relative">
				<div className="max-w-7xl mx-auto space-y-12 relative z-10">
					<div className="text-center space-y-6">
						<h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight">
							Send Cash Gifts
							<span className="block text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-400 animate-gradient">
								with Ease
							</span>
						</h1>
						<p className="text-xl sm:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
							Effortlessly distribute cash gifts to various groups
							with our intuitive platform
						</p>
					</div>
					<div className="grid sm:grid-cols-2 gap-8">
						{services.map((service) => (
							<ServiceCard
								key={service.title}
								icon={
									<service.icon className="w-8 h-8 text-white" />
								}
								title={service.title}
								description={service.description}
							/>
						))}
					</div>
					<div className="flex justify-center mt-20">
						<Link
							href="/send-money"
							className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-medium transition-all duration-300 ease-out hover:scale-105 bg-white text-black hover:text-black hover:bg-white/90 rounded-full overflow-hidden"
						>
							<div className="absolute inset-0 bg-gradient-to-r from-white via-gray-100 to-white opacity-0 group-hover:opacity-100 group-hover:animate-shine" />
							<span className="relative flex items-center gap-2">
								Start Sending Money Now
								<ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
							</span>
							<div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
								<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-wave" />
								<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-wave-delayed" />
							</div>
							<div className="absolute inset-0 rounded-full opacity-25 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_30px_8px_rgba(255,255,255,0.5)] blur-md" />
						</Link>
					</div>
				</div>
			</main>
		</div>
	);
}
