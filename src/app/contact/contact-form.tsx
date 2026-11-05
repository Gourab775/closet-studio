"use client"

import { FormEvent, useState } from "react"

export function ContactForm() {
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      setSubmitted(true)
    }, 800)
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col gap-8">
      {submitted ? (
        <div className="text-center py-8">
          <span className="text-[9px] font-bold tracking-[0.35em] text-foreground uppercase block mb-3">
            Message Sent
          </span>
          <p className="text-sm text-muted-foreground font-light">
            Thank you for reaching out. We&apos;ll get back to you soon.
          </p>
        </div>
      ) : (
        <>
          <div>
            <label
              htmlFor="name"
              className="text-[9px] font-bold tracking-[0.3em] text-muted-foreground uppercase block mb-3"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              required
              aria-required="true"
              className="w-full bg-transparent border-b border-border/60 py-4 text-sm text-foreground font-light focus:outline-none focus:border-foreground transition-colors duration-300 placeholder:text-muted-foreground/40"
              placeholder="Your name"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="text-[9px] font-bold tracking-[0.3em] text-muted-foreground uppercase block mb-3"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              aria-required="true"
              className="w-full bg-transparent border-b border-border/60 py-4 text-sm text-foreground font-light focus:outline-none focus:border-foreground transition-colors duration-300 placeholder:text-muted-foreground/40"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label
              htmlFor="subject"
              className="text-[9px] font-bold tracking-[0.3em] text-muted-foreground uppercase block mb-3"
            >
              Subject
            </label>
            <input
              id="subject"
              type="text"
              required
              aria-required="true"
              className="w-full bg-transparent border-b border-border/60 py-4 text-sm text-foreground font-light focus:outline-none focus:border-foreground transition-colors duration-300 placeholder:text-muted-foreground/40"
              placeholder="How can we help?"
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="text-[9px] font-bold tracking-[0.3em] text-muted-foreground uppercase block mb-3"
            >
              Message
            </label>
            <textarea
              id="message"
              rows={5}
              required
              aria-required="true"
              className="w-full bg-transparent border-b border-border/60 py-4 text-sm text-foreground font-light focus:outline-none focus:border-foreground transition-colors duration-300 resize-none placeholder:text-muted-foreground/40"
              placeholder="Tell us more..."
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="mt-4 w-full h-16 bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed text-[11px] font-bold uppercase tracking-[0.3em] rounded-full transition-all duration-300 leading-[64px]"
          >
            {submitting ? "Sending..." : "Send Message"}
          </button>
        </>
      )}
    </form>
  )
}
