import Link from "next/link";
import Image from "next/image";
import { Watch } from "@/types/watch";

interface WatchCardProps {
    watch: Watch;
}

export default function WatchCard({ watch }: WatchCardProps) {
    const imageSrc =
        watch.images && watch.images.length > 0
            ? watch.images[0]
            : "https://via.placeholder.com/600x600.png?text=No+Image";

    return (
        <div className="bg-slate rounded-t-2xl overflow-hidden border border-gold/20 hover:border-gold/50 shadow-md transition-all duration-300">
            <div className="relative w-full h-64 bg-charcoal">
                <Image
                    src={imageSrc}
                    alt={watch.title || "Watch"}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover"
                />
            </div>

            <div className="p-5">
                <h3 className="font-display text-xl text-ivory mb-1">
                    {watch.title}
                </h3>
                <p className="font-body text-sm text-ivory/50 mb-3">
                    {watch.tagline}
                </p>

                <div className="flex justify-between text-xs text-ivory/70 mb-4">
                    <span>${watch.price?.toLocaleString()}</span>
                    <span>{watch.condition}</span>
                    <span>{watch.movement}</span>
                </div>

                <Link
                    href={`/watch/${watch._id}`}
                    className="block text-center py-2 rounded-sm border border-gold text-gold text-sm hover:bg-gold hover:text-charcoal transition-all duration-300"
                >
                    View Details
                </Link>
            </div>
        </div>
    );
}