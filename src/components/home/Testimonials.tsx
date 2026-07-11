"use client";

import { Star } from "lucide-react";

interface Testimonial {
    name: string;
    role: string;
    quote: string;
    rating: number;
}

const testimonials: Testimonial[] = [
    {
        name: "James Whitfield",
        role: "Private Collector, London",
        quote:
            "The authenticity verification gave me complete confidence. My Nautilus arrived exactly as described, papers included.",
        rating: 5,
    },
    {
        name: "Elena Marchetti",
        role: "Vintage Enthusiast, Milan",
        quote:
            "Found a Reverso I had been hunting for three years. The details page alone told me more than most auction houses do.",
        rating: 5,
    },
    {
        name: "Rashid Al-Farsi",
        role: "Watch Investor, Dubai",
        quote:
            "Clean process from browsing to purchase. The condition grading matched perfectly with what arrived at my door.",
        rating: 5,
    },
];

export default function Testimonials() {
    return (
        <section className="max-w-7xl mx-auto px-6 py-16">
            <div className="text-center mb-12">
                <h2 className="font-display text-3xl text-ivory mb-2">
                    Trusted by <span className="text-gold">Collectors</span>
                </h2>
                <p className="font-body text-sm text-ivory/50">
                    What the community says about their acquisitions
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {testimonials.map((t, index) => (
                    <div
                        key={index}
                        className="bg-slate rounded-t-2xl border border-gold/20 p-6 hover:border-gold/40 transition-all duration-300"
                    >
                        <div className="flex gap-1 mb-4">
                            {Array.from({ length: t.rating }).map((_, i) => (
                                <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                            ))}
                        </div>

                        <p className="font-body text-sm text-ivory/70 leading-relaxed mb-6">
                            &ldquo;{t.quote}&rdquo;
                        </p>

                        <div className="h-px bg-gold/20 mb-4" />

                        <p className="font-display text-lg text-ivory">{t.name}</p>
                        <p className="font-body text-xs text-gold/70">{t.role}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}