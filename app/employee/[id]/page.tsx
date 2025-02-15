"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { loadStripe } from "@stripe/stripe-js"
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle2, DollarSign, Star, ChevronLeft } from "lucide-react"

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "")

// Mock data for staff members
const staffMembers = [
  { id: 1, name: "John Doe", position: "Concierge", image: "/placeholder.svg?height=300&width=300", rating: 4.8 },
  { id: 2, name: "Jane Smith", position: "Valet", image: "/placeholder.svg?height=300&width=300", rating: 4.9 },
  { id: 3, name: "Mike Johnson", position: "Bellhop", image: "/placeholder.svg?height=300&width=300", rating: 4.7 },
  { id: 4, name: "Emily Brown", position: "Housekeeper", image: "/placeholder.svg?height=300&width=300", rating: 4.6 },
  { id: 5, name: "Alex Lee", position: "Front Desk", image: "/placeholder.svg?height=300&width=300", rating: 4.9 },
  { id: 6, name: "Sarah Wilson", position: "Concierge", image: "/placeholder.svg?height=300&width=300", rating: 4.8 },
]

function CheckoutForm({ amount, onSuccess }: { amount: number; onSuccess: () => void }) {
  const stripe = useStripe()
  const elements = useElements()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setIsLoading(true)

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/payment-success`,
      },
    })

    if (error) {
      console.error(error)
    } else {
      onSuccess()
    }

    setIsLoading(false)
  }

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <Button type="submit" disabled={!stripe || isLoading} className="mt-4 w-full">
        {isLoading ? "Processing..." : `Pay $${amount}`}
      </Button>
    </form>
  )
}

export default function LocationPage() {
  const params = useParams()
  const router = useRouter()
  const [selectedStaff, setSelectedStaff] = useState<(typeof staffMembers)[0] | null>(null)
  const [tipAmount, setTipAmount] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [paymentSuccess, setPaymentSuccess] = useState(false)

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
      console.error("Stripe publishable key is not set")
    }
  }, [])

  const handleTip = (staff: (typeof staffMembers)[0]) => {
    setSelectedStaff(staff)
    setIsDialogOpen(true)
  }

    // filepath: /Users/rikhilrao/Documents/Programming/Projects/grazzee/grazzee/app/location/[id]/page.tsx
    const handlePayment = async () => {
        const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            amount: Number(tipAmount) * 100, // Convert to cents
            currency: 'usd',
        }),
        });
    
        const data = await response.json();
        setClientSecret(data.client_secret);
    };

  const handlePaymentSuccess = () => {
    setIsDialogOpen(false)
    setTipAmount("")
    setPaymentSuccess(true)
    setTimeout(() => {
      setPaymentSuccess(false)
      router.push("/")
    }, 5000)
  }

  return (
    <div className="min-h-screen flex flex-col bg-black text-white bg-grid-pattern">
      {paymentSuccess && (
        <Alert className="bg-green-500 text-white">
          <CheckCircle2 className="h-4 w-4" />
          <AlertTitle>Payment Successful</AlertTitle>
          <AlertDescription>
            Thank you for tipping {selectedStaff?.name}! You will be redirected to the home page shortly.
          </AlertDescription>
        </Alert>
      )}
      <main className="flex-grow px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <Button onClick={() => router.back()} className="mb-6 bg-gray-800 hover:bg-gray-700 text-white">
              <ChevronLeft className="mr-2 h-4 w-4" /> Back
            </Button>
            <h1 className="text-4xl font-bold">Staff at {params.id}</h1>
            <p className="text-xl text-gray-400">Show your appreciation with a tip</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {staffMembers.map((staff) => (
              <Card
                key={staff.id}
                className="bg-gradient-to-b from-gray-800 to-gray-900 border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-gray-700/50"
              >
                <div className="relative">
                  <img src={staff.image || "/placeholder.svg"} alt={staff.name} className="w-full h-48 object-cover" />
                  <div className="absolute top-2 right-2 bg-black bg-opacity-70 rounded-full p-2 flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                    <span className="text-sm font-semibold">{staff.rating}</span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-2 text-white">{staff.name}</h2>
                  <p className="text-gray-300 mb-4 font-medium">{staff.position}</p>
                  <Button
                    onClick={() => handleTip(staff)}
                    className="w-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold py-2 px-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    <DollarSign className="mr-2 h-5 w-5" /> Tip {staff.name}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-gray-900 text-white">
          <DialogHeader>
            <DialogTitle>Tip {selectedStaff?.name}</DialogTitle>
            <DialogDescription>Enter the amount you'd like to tip.</DialogDescription>
          </DialogHeader>
          {!clientSecret ? (
            <div className="py-4">
              <Label htmlFor="tipAmount" className="text-white">
                Tip Amount ($)
              </Label>
              <Input
                id="tipAmount"
                value={tipAmount}
                onChange={(e) => setTipAmount(e.target.value)}
                placeholder="Enter tip amount"
                className="bg-gray-800 text-white border-gray-700"
              />
              <Button onClick={handlePayment} className="mt-4 w-full">
                Proceed to Payment
              </Button>
            </div>
          ) : (
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <CheckoutForm amount={Number.parseFloat(tipAmount)} onSuccess={handlePaymentSuccess} />
            </Elements>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

