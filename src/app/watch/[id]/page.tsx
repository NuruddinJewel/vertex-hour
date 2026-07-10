"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getWatchById } from "@/lib/api";
import { Watch } from "@/types/watch";

export default function WatchDetailsPage() {
    const params = useParams();
    const id = params.id as string;

    const [watch, setWatch] = useState<Watch | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        async function fetchData() {
            const data = await getWatchById(id);
            setWatch(data);
        }
        fetchData();
    }, [id]);

    if (!watch) return null;

    const images =
        watch.images && watch.images.length > 0
            ? watch.images
            : ["https://via.placeholder.com/600x600.png?text=No+Image"];

    const nextImage = () => setActiveIndex((prev) => (prev + 1) % images.length);
    const prevImage = () =>
        setActiveIndex((prev) => (prev - 1 + images.length) % images.length);

    return (
        <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Media Slider */}
                <div>
                    <div className="relative w-full h-[450px] bg-slate rounded-t-2xl overflow-hidden border border-gold/20">
                        <Image
                            src={images[activeIndex]}
                            alt={watch.title}
                            fill
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            className="object-cover transition-opacity duration-500"
                        />

                        {images.length > 1 && (
                            <>
                                <button
                                    onClick={prevImage}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-charcoal/70 border border-gold/40 text-gold hover:bg-gold hover:text-charcoal transition-all"
                                    aria-label="Previous image"
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={nextImage}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-charcoal/70 border border-gold/40 text-gold hover:bg-gold hover:text-charcoal transition-all"
                                    aria-label="Next image"
                                >
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </>
                        )}
                    </div>

                    {/* Thumbnail Row */}
                    {images.length > 1 && (
                        <div className="flex gap-3 mt-4">
                            {images.map((img, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveIndex(index)}
                                    className={`relative w-20 h-20 rounded-sm overflow-hidden border transition-all ${activeIndex === index
                                        ? "border-gold"
                                        : "border-gold/20 opacity-60 hover:opacity-100"
                                        }`}
                                >
                                    <Image src={img} alt={`${watch.title} ${index + 1}`} fill
                                        sizes="80px"
                                        className="object-cover" />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Overview */}
                <div>
                    <p className="font-body text-sm text-gold uppercase tracking-widest mb-2">
                        {watch.brand}
                    </p>
                    <h1 className="font-display text-4xl text-ivory mb-4">
                        {watch.title}
                    </h1>
                    <p className="font-body text-ivory/60 mb-6">{watch.tagline}</p>

                    <div className="h-px bg-gold/20 mb-6" />

                    <div className="flex items-center justify-between mb-8">
                        <span className="font-display text-3xl text-gold">
                            ${watch.price?.toLocaleString()}
                        </span>
                        <span className="font-body text-sm px-3 py-1 rounded-sm border border-gold/40 text-ivory/80">
                            {watch.condition}
                        </span>
                    </div>

                    <button className="w-full py-3 rounded-sm border border-gold text-gold font-body text-sm hover:bg-gold hover:text-charcoal transition-all duration-300 mb-10">
                        Contact Seller
                    </button>

                    {/* Specifications Grid */}
                    <h2 className="font-display text-xl text-ivory mb-4">
                        Specifications
                    </h2>
                    <div className="grid grid-cols-2 gap-4">
                        <SpecItem label="Model Year" value={String(watch.modelYear)} />
                        <SpecItem label="Movement" value={watch.movement} />
                        <SpecItem label="Caliber" value={watch.caliber} />
                        <SpecItem label="Case Size" value={watch.caseSize} />
                        <SpecItem label="Dial Color" value={watch.dialColor} />
                        <SpecItem label="Water Resistance" value={watch.waterResistance} />
                    </div>
                </div>
            </div>
        </div>
    );
}

function SpecItem({ label, value }: { label: string; value: string }) {
    return (
        <div className="bg-slate/50 border border-gold/10 rounded-sm p-4">
            <p className="font-body text-xs text-ivory/40 uppercase tracking-wide mb-1">
                {label}
            </p>
            <p className="font-body text-sm text-ivory">{value}</p>
        </div>
    );
}