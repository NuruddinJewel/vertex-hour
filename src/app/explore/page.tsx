// import { getAllWatches } from "@/lib/api";
// import WatchCard from "@/components/watches/WatchCard";

// export default async function ExplorePage() {
//     const watches = await getAllWatches();

//     return (
//         <div className="max-w-7xl mx-auto px-6 py-12">
//             <h1 className="font-display text-4xl text-ivory mb-8">
//                 Explore <span className="text-gold">Timepieces</span>
//             </h1>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//                 {watches.map((watch) => (
//                     <WatchCard key={watch._id} watch={watch} />
//                 ))}
//             </div>
//         </div>
//     );
// }


//2

import { getAllWatches } from "@/lib/api";
import WatchCard from "@/components/watches/WatchCard";
import BrandGrid from "@/components/watches/BrandGrid";
import AuctionGrid from "@/components/watches/AuctionGrid";

interface ExplorePageProps {
    searchParams: Promise<{ sort?: string; filter?: string }>;
}

export default async function ExplorePage({ searchParams }: ExplorePageProps) {
    const watches = await getAllWatches();
    const params = await searchParams;

    // Query Parameter
    const isBrandClick = params.sort === "brand";
    const isAuctionClick = params.filter === "auction";

    return (
        <div className="max-w-7xl mx-auto px-6 py-12">
            {/* 'Top Brands' */}
            {isBrandClick && <BrandGrid />}

            {/* 'Live Auctions'  */}
            {isAuctionClick && <AuctionGrid />}

            {/*  'All Watches' */}
            {!isBrandClick && !isAuctionClick && (
                <>
                    <h1 className="font-display text-4xl text-ivory mb-8">
                        Explore <span className="text-gold">Timepieces</span>
                    </h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {watches.map((watch) => (
                            <WatchCard key={watch._id} watch={watch} />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}