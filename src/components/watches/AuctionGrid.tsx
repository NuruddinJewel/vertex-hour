import { getAllWatches } from "@/lib/api";
import WatchCard from "./WatchCard";
import { Flame } from "lucide-react";

export default async function AuctionGrid() {
    const watches = await getAllWatches();
    const hotWatches = [...watches]
        .sort((a, b) => (b.price || 0) - (a.price || 0))
        .slice(0, 4);

    return (
        <section className="max-w-7xl mx-auto px-6 py-16">
            <div className="flex items-center gap-2 mb-8">
                <Flame className="w-5 h-5 text-gold" strokeWidth={1.5} />
                <h2 className="font-display text-3xl text-ivory">
                    Hot <span className="text-gold">Listings</span>
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {hotWatches.map((watch) => (
                    <div key={watch._id} className="relative">
                        <span className="absolute top-3 left-3 z-10 bg-gold text-charcoal font-body text-xs px-2 py-1 rounded-sm">
                            Hot
                        </span>
                        <WatchCard watch={watch} />
                    </div>
                ))}
            </div>
        </section>
    );
}