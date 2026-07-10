import { getAllWatches } from "@/lib/api";
import WatchCard from "@/components/watches/WatchCard";

export default async function ExplorePage() {
    const watches = await getAllWatches();

    return (
        <div className="max-w-7xl mx-auto px-6 py-12">
            <h1 className="font-display text-4xl text-ivory mb-8">
                Explore <span className="text-gold">Timepieces</span>
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {watches.map((watch) => (
                    <WatchCard key={watch._id} watch={watch} />
                ))}
            </div>
        </div>
    );
}