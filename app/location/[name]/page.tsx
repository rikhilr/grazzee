"use client"; // Ensure the component is a Client Component

import { useState } from "react";
import { employees } from "@/data/employee";
import { useRouter } from "next/navigation";
import { CheckIcon, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmployeeListProps {
  params: {
    name: string;
  };
}

export default function EmployeeList({ params }: EmployeeListProps) {
  // Decode the location name from the URL
  const locationName = params.name.replace(/-/g, " ");

  // Filter employees for the selected location
  const locationEmployees = employees.filter(
    (employee) =>
      employee.location.toLowerCase() === locationName.toLowerCase()
  );

  // State to keep track of selected employees and their individual tip amounts
  const [selectedEmployees, setSelectedEmployees] = useState<{
    [key: number]: number;
  }>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentLink, setPaymentLink] = useState<string | null>(null);

  // Use Next.js router for navigation
  const router = useRouter();

  // Function to handle selection/deselection of employees and setting tip amounts
  const handleSelectEmployee = (employeeId: number, amount: number) => {
    setSelectedEmployees((prevSelected) => {
      const newSelected = { ...prevSelected };
      if (newSelected[employeeId]) {
        delete newSelected[employeeId]; // Deselect employee
      } else {
        newSelected[employeeId] = amount; // Select employee with the current tip amount
      }
      return newSelected;
    });
  };

  // Calculate the subtotal
  const subtotal = Object.values(selectedEmployees).reduce(
    (total, amount) => total + amount,
    0
  );

  const formattedSubtotal = subtotal.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  // Function to handle individual tip amount change for each employee
  const handleTipAmountChange = (employeeId: number, amount: number) => {
    if (amount < 0) {
      amount = 0;
    }

    setSelectedEmployees((prevSelected) => {
      const newSelected = { ...prevSelected };
      if (newSelected[employeeId] !== undefined) {
        newSelected[employeeId] = amount;
      }
      return newSelected;
    });
  };

  const handleTip = async () => {
    // Check if any employees are selected and if they have a stripe_id
    const invalidEmployees = Object.keys(selectedEmployees).filter(
      (employeeId) => {
        const employee = employees.find(
          (emp) => Number(emp.id) === Number(employeeId)
        );
        return !employee?.stripe_id; // Check if stripe_id exists
      }
    );

    if (invalidEmployees.length > 0) {
      alert(
        "One or more selected employees do not have a valid Stripe account. Please remove them from the selection."
      );
      return;
    }

    // If all employees have a stripe_id, proceed with payment creation
    try {
      // Prepare the employee data for the backend
      const employeeIds = Object.keys(selectedEmployees).map(Number); // Convert string keys to numbers
      const tipAmounts = Object.values(selectedEmployees); // Tip amounts

      // Call the API to create the payment link with the subtotal and selected employees' data
      const response = await fetch("/api/create-payment-link", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: subtotal,
          employeeIds: employeeIds,
          tipAmounts: tipAmounts,
        }),
      });

      const data = await response.json();

      // If a payment link is returned, redirect to it
      if (data.url) {
        setPaymentLink(data.url);
        window.location.href = data.url; // Redirect to Stripe checkout
      } else {
        alert("Failed to create payment link.");
      }
    } catch (error) {
      console.error("Error while creating payment link:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-black text-white p-8">
      <h1 className="text-4xl font-bold mb-8">Employees at {locationName}</h1>
      <div className="max-w-7xl ml-0 space-y-12">
        <Button
          onClick={() => router.back()}
          className="mb-6 bg-gray-800 hover:bg-gray-700 text-white"
          aria-label="Back to Categories"
        >
          <ChevronLeft className="mr-2 h-4 w-4" /> Back to Categories
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {locationEmployees.length > 0 ? (
          locationEmployees.map((employee) => {
            const hasStripeAccount = employee.stripe_id;
            return (
              <div
                key={employee.id}
                className={`bg-gray-900 p-6 rounded-lg border border-gray-700 transition-all duration-300 ${
                  selectedEmployees[Number(employee.id)] ? "border-green-500" : ""
                }`}
              >
                <div className="relative">
                  {/* Button for selecting employee */}
                  <Button
                    variant="ghost"
                    className="absolute top-2 right-2 p-2 rounded-full bg-gray-700 hover:bg-gray-600"
                    onClick={() =>
                      hasStripeAccount
                        ? handleSelectEmployee(
                            Number(employee.id),
                            selectedEmployees[Number(employee.id)] || 5
                          )
                        : alert("This employee doesn't have a Stripe account.")
                    }
                  >
                    {selectedEmployees[Number(employee.id)] ? (
                      <CheckIcon className="text-green-500" />
                    ) : (
                      <CheckIcon className="text-gray-400" />
                    )}
                  </Button>

                  <h2 className="text-xl font-semibold text-white mb-2">
                    {employee.name}
                  </h2>
                  <p className="text-gray-400 mb-4">{employee.role}</p>

                  {hasStripeAccount ? (
                    <div className="flex items-center space-x-2 mb-4">
                      <input
                        type="number"
                        value={selectedEmployees[Number(employee.id)] || ""}
                        onChange={(e) =>
                          handleTipAmountChange(
                            Number(employee.id),
                            Number(e.target.value)
                          )
                        }
                        className="px-4 py-2 border border-gray-700 rounded-md bg-gray-800 text-white"
                        placeholder="Enter tip amount"
                      />
                    </div>
                  ) : (
                    <p className="text-red-500 text-sm">
                      No Stripe account available
                    </p>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-gray-400">No employees found for this location.</p>
        )}
      </div>

      <div className="mt-8">
        <div className="text-lg font-semibold text-gray-400">
          Subtotal: {formattedSubtotal}
        </div>

        <Button
          onClick={handleTip}
          className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-md shadow-md transition-all"
        >
          Tip Selected Employees
        </Button>
      </div>
    </div>
  );
}
