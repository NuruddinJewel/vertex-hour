import { getAllWatches } from "@/lib/api";
import WatchCard from "./WatchCard";

export default async function FeaturedWatches() {
    const watches = await getAllWatches();
    const featured = watches.slice(0, 4);

    return (
        <section className="max-w-7xl mx-auto px-6 py-16">
            <h2 className="font-display text-3xl text-ivory mb-8">
                Featured <span className="text-gold">Timepieces</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {featured.map((watch) => (
                    <WatchCard key={watch._id} watch={watch} />
                ))}
            </div>
        </section>
    );
}