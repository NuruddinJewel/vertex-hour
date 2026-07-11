// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { useSession } from "@/lib/auth-client";
// import { getAllWatches, deleteWatch } from "@/lib/api";
// import { Watch } from "@/types/watch";
// import { toast } from "react-toastify";
// import { Eye, Trash2 } from "lucide-react";

// export default function ManageWatchesPage() {
//     const { data: session, isPending } = useSession();
//     const [watches, setWatches] = useState<Watch[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [deletingId, setDeletingId] = useState<string | null>(null);

//     useEffect(() => {
//         async function fetchWatches() {
//             try {
//                 const data = await getAllWatches();
//                 setWatches(data);
//             } catch (err) {
//                 toast.error("Failed to load watches.");
//             } finally {
//                 setLoading(false);
//             }
//         }
//         fetchWatches();
//     }, []);

//     async function handleDelete(id: string) {
//         const confirmed = window.confirm(
//             "Are you sure you want to delete this watch? This action cannot be undone."
//         );
//         if (!confirmed) return;

//         setDeletingId(id);
//         try {
//             await deleteWatch(id);
//             setWatches((prev) => prev.filter((w) => w._id !== id));
//             toast.success("Watch deleted successfully.");
//         } catch (err) {
//             toast.error("Failed to delete watch.");
//         } finally {
//             setDeletingId(null);
//         }
//     }

//     if (isPending) return null;

//     if (!session) {
//         return (
//             <div className="min-h-[60vh] flex items-center justify-center px-6">
//                 <p className="font-body text-ivory/60">
//                     Please sign in to manage watches.
//                 </p>
//             </div>
//         );
//     }

//     return (
//         <div className="max-w-6xl mx-auto px-6 py-16">
//             <div className="flex items-center justify-between mb-10">
//                 <div>
//                     <h1 className="font-display text-3xl text-ivory mb-2">
//                         Manage <span className="text-gold">Watches</span>
//                     </h1>
//                     <p className="font-body text-sm text-ivory/50">
//                         View, update, or remove your listed timepieces
//                     </p>
//                 </div>
//                 <Link
//                     href="/items/add"
//                     className="px-5 py-3 rounded-sm border border-gold text-gold font-body text-sm hover:bg-gold hover:text-charcoal transition-all duration-300"
//                 >
//                     + Add Watch
//                 </Link>
//             </div>

//             {loading ? (
//                 <ManageTableSkeleton />
//             ) : watches.length === 0 ? (
//                 <div className="bg-slate border border-gold/20 rounded-t-2xl p-12 text-center">
//                     <p className="font-body text-ivory/50 mb-4">
//                         No watches listed yet.
//                     </p>
//                     <Link href="/items/add" className="text-gold text-sm hover:underline">
//                         List your first timepiece
//                     </Link>
//                 </div>
//             ) : (
//                 <div className="bg-slate border border-gold/20 rounded-t-2xl overflow-hidden">
//                     <div className="overflow-x-auto">
//                         <table className="w-full text-left">
//                             <thead>
//                                 <tr className="border-b border-gold/20">
//                                     <th className="font-body text-xs text-ivory/50 uppercase tracking-wide px-6 py-4">
//                                         Image
//                                     </th>
//                                     <th className="font-body text-xs text-ivory/50 uppercase tracking-wide px-6 py-4">
//                                         Model Name
//                                     </th>
//                                     <th className="font-body text-xs text-ivory/50 uppercase tracking-wide px-6 py-4">
//                                         Brand
//                                     </th>
//                                     <th className="font-body text-xs text-ivory/50 uppercase tracking-wide px-6 py-4">
//                                         Price
//                                     </th>
//                                     <th className="font-body text-xs text-ivory/50 uppercase tracking-wide px-6 py-4">
//                                         Condition
//                                     </th>
//                                     <th className="font-body text-xs text-ivory/50 uppercase tracking-wide px-6 py-4 text-right">
//                                         Actions
//                                     </th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {watches.map((watch) => (
//                                     <tr
//                                         key={watch._id}
//                                         className="border-b border-gold/10 hover:bg-gold/5 transition-colors"
//                                     >
//                                         <td className="px-6 py-4">
//                                             <div className="relative w-14 h-14 rounded-sm overflow-hidden border border-gold/20">
//                                                 <Image
//                                                     src={
//                                                         watch.images?.[0] ||
//                                                         "https://via.placeholder.com/100x100.png?text=No+Image"
//                                                     }
//                                                     alt={watch.title}
//                                                     fill
//                                                     sizes="56px"
//                                                     className="object-cover"
//                                                 />
//                                             </div>
//                                         </td>
//                                         <td className="font-body text-sm text-ivory px-6 py-4">
//                                             {watch.title}
//                                         </td>
//                                         <td className="font-body text-sm text-ivory/60 px-6 py-4">
//                                             {watch.brand}
//                                         </td>
//                                         <td className="font-body text-sm text-gold px-6 py-4">
//                                             ${watch.price?.toLocaleString()}
//                                         </td>
//                                         <td className="font-body text-sm text-ivory/60 px-6 py-4">
//                                             {watch.condition}
//                                         </td>
//                                         <td className="px-6 py-4">
//                                             <div className="flex items-center justify-end gap-3">
//                                                 <Link
//                                                     href={`/watch/${watch._id}`}
//                                                     className="p-2 rounded-sm border border-gold/30 text-gold hover:bg-gold hover:text-charcoal transition-all"
//                                                     title="View details"
//                                                 >
//                                                     <Eye className="w-4 h-4" />
//                                                 </Link>
//                                                 <button
//                                                     onClick={() => handleDelete(watch._id)}
//                                                     disabled={deletingId === watch._id}
//                                                     className="p-2 rounded-sm border border-red-400/30 text-red-400 hover:bg-red-400 hover:text-charcoal transition-all disabled:opacity-50"
//                                                     title="Delete watch"
//                                                 >
//                                                     <Trash2 className="w-4 h-4" />
//                                                 </button>
//                                             </div>
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }

// function ManageTableSkeleton() {
//     return (
//         <div className="bg-slate border border-gold/20 rounded-t-2xl p-6 animate-pulse space-y-4">
//             {[1, 2, 3, 4].map((i) => (
//                 <div key={i} className="flex items-center gap-4">
//                     <div className="w-14 h-14 rounded-sm bg-charcoal border border-gold/10" />
//                     <div className="flex-1 h-4 bg-charcoal rounded-sm" />
//                     <div className="w-20 h-4 bg-charcoal rounded-sm" />
//                     <div className="w-16 h-4 bg-charcoal rounded-sm" />
//                 </div>
//             ))}
//         </div>
//     );
// }

//2

// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import { useSession } from "@/lib/auth-client";
// import { getWatchesByOwner, getOrdersByBuyer } from "@/lib/api";
// import WatchCard from "@/components/watches/WatchCard";
// import { Watch } from "@/types/watch";
// import { PlusCircle, ShoppingBag, FolderHeart } from "lucide-react";

// // Order Interface 
// interface Order {
//     _id: string;
//     watchId: string;
//     watchTitle: string;
//     price: number;
//     quantity: number;
//     purchasedAt: string;
// }

// export default function UserDashboardPage() {
//     const { data: session, isPending } = useSession();
//     const [myWatches, setMyWatches] = useState<Watch[]>([]);
//     const [myPurchases, setMyPurchases] = useState<Order[]>([]);
//     const [activeTab, setActiveTab] = useState<"listings" | "purchases">("listings");
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         async function fetchDashboardData() {
//             if (!session?.user?.id) return;
//             try {
//                 // লিস্টিং এবং পারচেজ হিস্ট্রি একসাথে প্যারালালি কল করা হলো
//                 const [watchesData, purchasesData] = await Promise.all([
//                     getWatchesByOwner(session.user.id),
//                     getOrdersByBuyer(session.user.id)
//                 ]);
//                 setMyWatches(watchesData);
//                 setMyPurchases(purchasesData);
//             } catch (error) {
//                 console.error("Dashboard loading error:", error);
//             } finally {
//                 setLoading(false);
//             }
//         }
//         if (!isPending) fetchDashboardData();
//     }, [session, isPending]);

//     if (isPending || loading) return null;

//     if (!session) {
//         return (
//             <div className="min-h-[60vh] flex items-center justify-center px-6">
//                 <p className="font-body text-ivory/60">Please sign in to view your dashboard.</p>
//             </div>
//         );
//     }

//     return (
//         <div className="px-8 py-10">
//             {/* Top Header */}
//             <div className="flex items-center justify-between mb-10">
//                 <div>
//                     <h1 className="font-display text-3xl text-ivory mb-2">
//                         User <span className="text-gold">Dashboard</span>
//                     </h1>
//                     <p className="font-body text-sm text-ivory/50">
//                         Welcome back, {session.user.name || "Collector"}
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

//             {/* Tab Navigation Switches */}
//             <div className="flex gap-4 border-b border-gold/10 mb-8">
//                 <button
//                     onClick={() => setActiveTab("listings")}
//                     className={`flex items-center gap-2 pb-3 font-display text-sm uppercase tracking-wider transition-all ${activeTab === "listings" ? "text-gold border-b-2 border-gold" : "text-ivory/40 hover:text-ivory"
//                         }`}
//                 >
//                     <FolderHeart className="w-4 h-4" /> My Collection ({myWatches.length})
//                 </button>
//                 <button
//                     onClick={() => setActiveTab("purchases")}
//                     className={`flex items-center gap-2 pb-3 font-display text-sm uppercase tracking-wider transition-all ${activeTab === "purchases" ? "text-gold border-b-2 border-gold" : "text-ivory/40 hover:text-ivory"
//                         }`}
//                 >
//                     <ShoppingBag className="w-4 h-4" /> Purchase History ({myPurchases.length})
//                 </button>
//             </div>

//             {/* TAB CONTENT SHOWCASE */}
//             {activeTab === "listings" ? (
//                 // --- Tab 1: User Listings ---
//                 myWatches.length === 0 ? (
//                     <div className="bg-slate border border-gold/20 rounded-t-2xl p-12 text-center">
//                         <p className="font-body text-ivory/50 mb-4">You haven&apos;t listed any watches yet.</p>
//                         <Link href="/items/add" className="text-gold text-sm hover:underline">
//                             List your first timepiece
//                         </Link>
//                     </div>
//                 ) : (
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//                         {myWatches.map((watch) => (
//                             <WatchCard key={watch._id} watch={watch} />
//                         ))}
//                     </div>
//                 )
//             ) : (
//                 // --- Tab 2: User Purchases ---
//                 myPurchases.length === 0 ? (
//                     <div className="bg-slate border border-gold/20 rounded-t-2xl p-12 text-center">
//                         <p className="font-body text-ivory/50 mb-4">You haven&apos;t purchased any watches yet.</p>
//                         <Link href="/" className="text-gold text-sm hover:underline">
//                             Explore Marketplace
//                         </Link>
//                     </div>
//                 ) : (
//                     <div className="bg-slate border border-gold/20 rounded-t-2xl p-6">
//                         <div className="overflow-x-auto">
//                             <table className="w-full text-left">
//                                 <thead>
//                                     <tr className="border-b border-gold/20">
//                                         <th className="font-body text-xs text-ivory/50 uppercase tracking-wide pb-3">Watch Title</th>
//                                         <th className="font-body text-xs text-ivory/50 uppercase tracking-wide pb-3">Qty</th>
//                                         <th className="font-body text-xs text-ivory/50 uppercase tracking-wide pb-3">Total Paid</th>
//                                         <th className="font-body text-xs text-ivory/50 uppercase tracking-wide pb-3">Date</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {myPurchases.map((order, idx) => (
//                                         <tr key={order._id || idx} className="border-b border-gold/10 hover:bg-gold/5 transition-colors">
//                                             <td className="font-body text-sm text-ivory py-3">{order.watchTitle}</td>
//                                             <td className="font-body text-sm text-ivory/60 py-3">{order.quantity}</td>
//                                             <td className="font-body text-sm text-gold py-3">${(order.price * order.quantity).toLocaleString()}</td>
//                                             <td className="font-body text-sm text-ivory/40 py-3">{new Date(order.purchasedAt).toLocaleDateString()}</td>
//                                         </tr>
//                                     ))}
//                                 </tbody>
//                             </table>
//                         </div>
//                     </div>
//                 )
//             )}
//         </div>
//     );
// }

//3

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import { getWatchesByOwner, getOrdersByBuyer } from "@/lib/api";
import WatchCard from "@/components/watches/WatchCard";
import { Watch } from "@/types/watch";
import { PlusCircle, ShoppingBag, FolderHeart } from "lucide-react";


interface Order {
    _id: string;
    watchId: string;
    watchTitle: string;
    price: number;
    quantity: number;
    purchasedAt: string;
}

export default function UserDashboardPage() {
    const { data: session, isPending } = useSession();
    const [myWatches, setMyWatches] = useState<Watch[]>([]);
    const [myPurchases, setMyPurchases] = useState<Order[]>([]);
    const [activeTab, setActiveTab] = useState<"listings" | "purchases">("listings");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchDashboardData() {
            if (!session?.user?.id) return;
            try {

                const [watchesData, purchasesData] = await Promise.all([
                    getWatchesByOwner(session.user.id),
                    getOrdersByBuyer(session.user.id)
                ]);
                console.log("Bought Watches:", purchasesData);
                setMyWatches(watchesData);
                setMyPurchases(purchasesData);
            } catch (error) {
                console.error("Dashboard loading error:", error);
            } finally {
                setLoading(false);
            }
        }
        if (!isPending) fetchDashboardData();
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
            {/* Header Section */}
            <div className="flex items-center justify-between mb-10">
                <div>
                    <h1 className="font-display text-3xl text-ivory mb-2">
                        User <span className="text-gold">Dashboard</span>
                    </h1>
                    <p className="font-body text-sm text-ivory/50">
                        Welcome back, {session.user.name || "Collector"}
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

            {/* Tab Buttons  */}
            <div className="flex gap-4 border-b border-gold/10 mb-8">
                <button
                    onClick={() => setActiveTab("listings")}
                    className={`flex items-center gap-2 pb-3 font-display text-sm uppercase tracking-wider transition-all ${activeTab === "listings" ? "text-gold border-b-2 border-gold" : "text-ivory/40 hover:text-ivory"
                        }`}
                >
                    <FolderHeart className="w-4 h-4" /> My Collection ({myWatches.length})
                </button>
                <button
                    onClick={() => setActiveTab("purchases")}
                    className={`flex items-center gap-2 pb-3 font-display text-sm uppercase tracking-wider transition-all ${activeTab === "purchases" ? "text-gold border-b-2 border-gold" : "text-ivory/40 hover:text-ivory"
                        }`}
                >
                    <ShoppingBag className="w-4 h-4" /> Purchase History ({myPurchases.length})
                </button>
            </div>

            {/* Tab Contents */}
            {activeTab === "listings" ? (

                myWatches.length === 0 ? (
                    <div className="bg-slate border border-gold/20 rounded-t-2xl p-12 text-center">
                        <p className="font-body text-ivory/50 mb-4">You haven&apos;t listed any watches yet.</p>
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
                )
            ) : (

                myPurchases.length === 0 ? (
                    <div className="bg-slate border border-gold/20 rounded-t-2xl p-12 text-center">
                        <p className="font-body text-ivory/50 mb-4">You haven&apos;t purchased any watches yet.</p>
                        <Link href="/" className="text-gold text-sm hover:underline">
                            Explore Marketplace
                        </Link>
                    </div>
                ) : (
                    <div className="bg-slate border border-gold/20 rounded-t-2xl p-6">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b border-gold/20">
                                        <th className="font-body text-xs text-ivory/50 uppercase tracking-wide pb-3">Watch Title</th>
                                        <th className="font-body text-xs text-ivory/50 uppercase tracking-wide pb-3">Qty</th>
                                        <th className="font-body text-xs text-ivory/50 uppercase tracking-wide pb-3">Total Paid</th>
                                        <th className="font-body text-xs text-ivory/50 uppercase tracking-wide pb-3">Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {myPurchases.map((order, idx) => (
                                        <tr key={order._id || idx} className="border-b border-gold/10 hover:bg-gold/5 transition-colors">
                                            <td className="font-body text-sm text-ivory py-3">{order.watchTitle}</td>
                                            <td className="font-body text-sm text-ivory/60 py-3">{order.quantity}</td>
                                            <td className="font-body text-sm text-gold py-3">${(order.price * order.quantity).toLocaleString()}</td>
                                            <td className="font-body text-sm text-ivory/40 py-3">{new Date(order.purchasedAt).toLocaleDateString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )
            )}
        </div>
    );
}