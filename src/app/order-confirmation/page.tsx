import Link from "next/link"
import { CheckCircle } from "lucide-react"

export default function OrderConfirmationPage() {
  return (
    <main className="min-h-screen pt-16">
      <div className="max-w-2xl mx-auto px-6 md:px-10 py-20 md:py-32 text-center">
        <div className="flex justify-center mb-8">
          <CheckCircle size={48} className="text-foreground" strokeWidth={1} />
        </div>

        <span className="text-[9px] font-bold tracking-[0.5em] text-muted-foreground uppercase block mb-4">
          ORDER CONFIRMED
        </span>
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter text-foreground mb-6">
          THANK YOU
        </h1>
        <p className="text-sm text-muted-foreground font-light leading-relaxed max-w-md mx-auto mb-4">
          Your order has been placed successfully. A confirmation email will be
          sent shortly with your order details and tracking information.
        </p>
        <p className="text-[10px] text-muted-foreground/60 font-light tracking-wider mb-12">
          Order #CLS-2024-0847
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/store"
            className="w-full sm:w-auto h-14 bg-primary text-primary-foreground hover:bg-primary/90 text-[10px] font-bold uppercase tracking-[0.25em] text-center leading-[56px] rounded-full transition-colors duration-300 px-10"
          >
            Continue Shopping
          </Link>
          <Link
            href="/"
            className="w-full sm:w-auto h-14 border border-border text-[10px] font-bold uppercase tracking-[0.2em] text-foreground hover:bg-muted text-center leading-[56px] rounded-full transition-colors duration-300 px-10"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  )
}
