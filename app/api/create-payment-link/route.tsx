import Stripe from "stripe";
import { NextResponse } from "next/server";
import { employees } from "@/data/employee";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2024-12-18.acacia", // Use the latest API version
});

// Function to transfer funds to employees
async function transferFundsToEmployees(
    employeeIds: number[],
    tipAmounts: number[],
    feeAmount: number
) {
    try {
        for (let i = 0; i < employeeIds.length; i++) {
            const employeeId = employeeIds[i];
            const amount = tipAmounts[i];

            const employee = employees.find(
                (emp) => emp.id === employeeId.toString()
            );

            if (!employee || !employee.stripe_id) {
                console.error(
                    `Employee with ID ${employeeId} not found or Stripe account not set.`
                );
                continue;
            }

            try {
                const transfer = await stripe.transfers.create({
                    amount: amount * 100, // Convert to cents
                    currency: "usd",
                    destination: employee.stripe_id,
                });
                console.log("Transfer created:", transfer);
            } catch (error) {
                console.error("Error creating transfer:", error);
            }
        }
    } catch (error) {
        console.error("Error transferring funds: ", error);
        throw new Error("Error transferring funds to employees.");
    }
}

// POST: Create a payment link
export async function POST(req: Request) {
    try {
        const { amount, employeeIds, tipAmounts } =
            await req.json();
        const feeAmount = 0.5; // Fixed fee (example)

        // Create a price for the payment
        const price = await stripe.prices.create({
            currency: "usd",
            product_data: {
                name: "Tip for Employees",
            },
            unit_amount: (amount + feeAmount) * 100, // Total amount (including fee)
        });

        // Create a payment link
        const paymentLink = await stripe.paymentLinks.create({
            line_items: [
                {
                    price: price.id,
                    quantity: 1,
                },
            ],
            metadata: {
                employeeIds: JSON.stringify(employeeIds),
                tipAmounts: JSON.stringify(tipAmounts),
            },
            after_completion: {
                type: "redirect",
                redirect: {
                    url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
                },
            },
        });

        // Return the payment link URL
        return NextResponse.json({ url: paymentLink.url }, { status: 200 });
    } catch (error) {
        console.error("Error creating payment link: ", error);
        return NextResponse.json(
            { error: "Failed to create payment link." },
            { status: 500 }
        );
    }
}

// GET: Confirm payment and transfer funds
export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const session_id = searchParams.get("session_id");

    if (!session_id) {
        return NextResponse.json(
            { success: false, message: "Session ID is required." },
            { status: 400 }
        );
    }

    try {
        // Retrieve the Stripe session
        const session = await stripe.checkout.sessions.retrieve(session_id);

        if (session.payment_status === "paid") {
            // Check if metadata exists
            if (!session.metadata) {
                throw new Error("Session metadata is null.");
            }

            // Parse metadata
            const employeeIds: number[] = JSON.parse(session.metadata.employeeIds);
            const tipAmounts: number[] = JSON.parse(session.metadata.tipAmounts);
            const feeAmount = 0.5;

            // Transfer funds to employees
            await transferFundsToEmployees(employeeIds, tipAmounts, feeAmount);

            return NextResponse.json({
                success: true,
                message: "Payment successful, funds transferred to employees.",
            });
        } else {
            return NextResponse.json(
                { success: false, message: "Payment failed or not completed." },
                { status: 400 }
            );
        }
    } catch (error) {
        console.error("Error processing payment: ", error);
        return NextResponse.json(
            { error: "Error processing payment." },
            { status: 500 }
        );
    }
}