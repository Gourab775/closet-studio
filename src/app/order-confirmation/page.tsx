import Link from "next/link"
import { CheckCircle } from "lucide-react"

export default function OrderConfirmationPage() {
  return (
    <main className="min-h-screen pt-24">
      <div className="max-w-2xl mx-auto px-6 md:px-10 py-32 md:py-40 text-center">
        <div className="flex justify-center mb-10">
          <CheckCircle size={56} className="text-foreground" strokeWidth={1.5} />
        </div>

        <span className="text-[9px] font-bold tracking-[0.6em] text-muted-foreground uppercase block mb-6">
          ORDER CONFIRMED
        </span>
        <h1 className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tighter text-foreground mb-8">
          THANK YOU
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground font-light leading-relaxed max-w-md mx-auto mb-6">
          Your order has been placed successfully. A confirmation email will be
          sent shortly with your order details and tracking information.
        </p>
        <p className="text-[10px] sm:text-xs text-muted-foreground/60 font-light tracking-widest mb-16">
          Order #CLS-2024-0847
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
          <Link
            href="/store"
            className="w-full sm:w-auto h-16 bg-primary text-primary-foreground hover:bg-primary/90 text-[11px] font-bold uppercase tracking-[0.3em] text-center leading-[64px] rounded-full transition-all duration-300 px-14"
          >
            Continue Shopping
          </Link>
          <Link
            href="/"
            className="w-full sm:w-auto h-16 border border-border text-[11px] font-bold uppercase tracking-[0.25em] text-foreground hover:bg-muted text-center leading-[64px] rounded-full transition-all duration-300 px-14"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  )
}
