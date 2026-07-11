// import Link from "next/link";
// import { getAllWatches } from "@/lib/api";
// import WatchCard from "@/components/watches/WatchCard";
// import { PlusCircle } from "lucide-react";

// export default async function UserDashboardPage() {
//     const watches = await getAllWatches();
//     // Dummy Data
//     const myWatches = watches.slice(0, 4);

//     return (
//         <div className="px-8 py-10">
//             <div className="flex items-center justify-between mb-10">
//                 <div>
//                     <h1 className="font-display text-3xl text-ivory mb-2">
//                         My <span className="text-gold">Collection</span>
//                     </h1>
//                     <p className="font-body text-sm text-ivory/50">
//                         Manage your listed timepieces
//                     </p>
//                 </div>
//                 <Link
//                     href="/items/add"
//                     className="flex items-center gap-2 px-5 py-3 rounded-sm border border-gold text-gold font-body text-sm hover:bg-gold hover:text-charcoal transition-all duration-300"
//                 >
//                     <PlusCircle className="w-4 h-4" />
//                     Add Watch
//                 </Link>
//             </div>

//             {myWatches.length === 0 ? (
//                 <div className="bg-slate border border-gold/20 rounded-t-2xl p-12 text-center">
//                     <p className="font-body text-ivory/50 mb-4">
//                         You haven&apos;t listed any watches yet.
//                     </p>
//                     <Link
//                         href="/items/add"
//                         className="text-gold text-sm hover:underline"
//                     >
//                         List your first timepiece
//                     </Link>
//                 </div>
//             ) : (
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//                     {myWatches.map((watch) => (
//                         <WatchCard key={watch._id} watch={watch} />
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// }


"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import { getWatchesByOwner } from "@/lib/api";
import WatchCard from "@/components/watches/WatchCard";
import { Watch } from "@/types/watch";
import { PlusCircle } from "lucide-react";

export default function UserDashboardPage() {
    const { data: session, isPending } = useSession();
    const [myWatches, setMyWatches] = useState<Watch[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchOwnerWatches() {
            if (!session?.user?.id) return;
            const data = await getWatchesByOwner(session.user.id);
            setMyWatches(data);
            setLoading(false);
        }
        if (!isPending) fetchOwnerWatches();
    }, [session, isPending]);

    if (isPending || loading) return null;

    if (!session) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center px-6">
                <p className="font-body text-ivory/60">Please sign in to view your dashboard.</p>
            </div>
        );
    }

    return (
        <div className="px-8 py-10">
            <div className="flex items-center justify-between mb-10">
                <div>
                    <h1 className="font-display text-3xl text-ivory mb-2">
                        My <span className="text-gold">Collection</span>
                    </h1>
                    <p className="font-body text-sm text-ivory/50">
                        Manage your listed timepieces
                    </p>
                </div>
                <Link
                    href="/items/add"
                    className="flex items-center gap-2 px-5 py-3 rounded-sm border border-gold text-gold font-body text-sm hover:bg-gold hover:text-charcoal transition-all duration-300"
                >
                    <PlusCircle className="w-4 h-4" />
                    Add Watch
                </Link>
            </div>

            {myWatches.length === 0 ? (
                <div className="bg-slate border border-gold/20 rounded-t-2xl p-12 text-center">
                    <p className="font-body text-ivory/50 mb-4">
                        You haven&apos;t listed any watches yet.
                    </p>
                    <Link href="/items/add" className="text-gold text-sm hover:underline">
                        List your first timepiece
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {myWatches.map((watch) => (
                        <WatchCard key={watch._id} watch={watch} />
                    ))}
                </div>
            )}
        </div>
    );
}