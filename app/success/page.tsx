"use client"; // Mark this as a Client Component

import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function SuccessPage() {
	const searchParams = useSearchParams();
	const session_id = searchParams.get("session_id");
	const [message, setMessage] = useState("");

	useEffect(() => {
		if (session_id) {
			// Call the GET endpoint to confirm the payment and trigger payouts
			fetch(`/api/create-payment-link?session_id=${session_id}`)
				.then((response) => response.json())
				.then((data) => {
					if (data.success) {
						setMessage(
							"Payment successful! Funds transferred to employees."
						);
					} else {
						setMessage("Payment failed or not completed.");
					}
				})
				.catch((error) => {
					console.error("Error confirming payment:", error);
					setMessage(
						"An error occurred while confirming the payment."
					);
				});
		}
	}, [session_id]);

	return (
		<div className="min-h-screen flex items-center justify-center bg-black p-6">
			<div className="max-w-md w-full bg-gray-900 rounded-2xl shadow-lg p-8 text-center">
				<div className="flex flex-col items-center justify-center">
					<CheckCircle className="h-28 w-28 text-green-500 mb-6" />
					<h1 className="text-3xl font-bold text-white mb-4">
						Payment Success!
					</h1>
					<p className="text-gray-400 mb-6">
            Funds have been sent!
					</p>
					<Link
						href="/"
						className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-500 transition-all"
					>
						Go Back Home
					</Link>
				</div>
			</div>
		</div>
	);
}
