"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getAllWatches } from "@/lib/api";
import { Watch } from "@/types/watch";

export default function HeroSlider() {
    const [watches, setWatches] = useState<Watch[]>([]);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        async function fetchData() {
            const data = await getAllWatches();
            setWatches(data.slice(0, 5));
        }
        fetchData();
    }, []);

    useEffect(() => {
        if (watches.length === 0) return;
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % watches.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [watches]);

    if (watches.length === 0) {
        return <div className="min-h-[70vh] bg-charcoal" />;
    }

    const activeWatch = watches[activeIndex];

    return (
        <section className="relative min-h-[70vh] flex items-center overflow-hidden bg-charcoal">
            {/* Background Image with Fade */}
            <div className="absolute inset-0">
                {watches.map((watch, index) => (
                    <div
                        key={watch._id}
                        className={`absolute inset-0 transition-opacity duration-1000 ${index === activeIndex ? "opacity-40" : "opacity-0"
                            }`}
                    >
                        <Image
                            src={watch.images?.[0] || "https://via.placeholder.com/1200x800.png"}
                            alt={watch.title}
                            fill
                            sizes="100vw"
                            className="object-cover"
                            priority={index === 0}
                        />
                    </div>
                ))}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/60 to-charcoal/20" />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-3xl mx-auto text-center px-6">
                <p className="font-body text-xs text-gold uppercase tracking-[0.3em] mb-4">
                    {activeWatch.brand}
                </p>
                <h1 className="font-display text-5xl md:text-6xl text-ivory mb-4">
                    {activeWatch.title}
                </h1>
                <p className="font-body text-ivory/60 max-w-xl mx-auto mb-8">
                    {activeWatch.tagline}
                </p>
                <Link
                    href="/explore"
                    className="inline-block px-8 py-3 rounded-sm border border-gold text-gold font-body text-sm hover:bg-gold hover:text-charcoal transition-all duration-300"
                >
                    Explore Horology Vault
                </Link>

                {/* Slider Dots */}
                <div className="flex justify-center gap-2 mt-10">
                    {watches.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveIndex(index)}
                            className={`h-1 rounded-full transition-all duration-300 ${index === activeIndex ? "w-8 bg-gold" : "w-2 bg-gold/30"
                                }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}