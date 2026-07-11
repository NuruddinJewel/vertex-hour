// import { getAllWatches } from "@/lib/api";
// import { Users, Watch as WatchIcon, DollarSign, TrendingUp } from "lucide-react";
// import SalesChart from "@/components/watches/SalesChart";

// export default async function AdminDashboardPage() {
//     const watches = await getAllWatches();
//     const soldWatches = watches.filter((w) => w.status === "sold");
//     const totalValuation = watches.reduce((sum, w) => sum + (w.price || 0), 0);

//     const stats = [
//         {
//             label: "Total Watches Listed",
//             value: watches.length,
//             icon: WatchIcon,
//         },
//         {
//             label: "Watches Sold",
//             value: soldWatches.length,
//             icon: TrendingUp,
//         },
//         {
//             label: "Total Valuation",
//             value: `$${totalValuation.toLocaleString()}`,
//             icon: DollarSign,
//         },
//         {
//             label: "Registered Users",
//             value: "—",
//             icon: Users,
//         },
//     ];

//     return (
//         <div className="px-8 py-10">
//             <h1 className="font-display text-3xl text-ivory mb-2">
//                 Admin <span className="text-gold">Dashboard</span>
//             </h1>
//             <p className="font-body text-sm text-ivory/50 mb-10">
//                 Marketplace overview and management tools
//             </p>

//             {/* Stats Grid */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
//                 {stats.map((stat) => {
//                     const Icon = stat.icon;
//                     return (
//                         <div
//                             key={stat.label}
//                             className="bg-slate border border-gold/20 rounded-t-2xl p-6"
//                         >
//                             <Icon className="w-5 h-5 text-gold mb-3" strokeWidth={1.5} />
//                             <p className="font-display text-2xl text-ivory mb-1">
//                                 {stat.value}
//                             </p>
//                             <p className="font-body text-xs text-ivory/50 uppercase tracking-wide">
//                                 {stat.label}
//                             </p>
//                         </div>
//                     );
//                 })}
//             </div>

//             {/* Sales Chart */}
//             <SalesChart watches={watches} />

//             {/* Recent Listings */}
//             <div className="bg-slate border border-gold/20 rounded-t-2xl p-6 mt-8">
//                 <h2 className="font-display text-xl text-ivory mb-6">
//                     Recent Listings
//                 </h2>
//                 <div className="overflow-x-auto">
//                     <table className="w-full text-left">
//                         <thead>
//                             <tr className="border-b border-gold/20">
//                                 <th className="font-body text-xs text-ivory/50 uppercase tracking-wide pb-3">Title</th>
//                                 <th className="font-body text-xs text-ivory/50 uppercase tracking-wide pb-3">Brand</th>
//                                 <th className="font-body text-xs text-ivory/50 uppercase tracking-wide pb-3">Price</th>
//                                 <th className="font-body text-xs text-ivory/50 uppercase tracking-wide pb-3">Condition</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {watches.slice(0, 8).map((watch) => (
//                                 <tr key={watch._id} className="border-b border-gold/10 hover:bg-gold/5 transition-colors">
//                                     <td className="font-body text-sm text-ivory py-3">{watch.title}</td>
//                                     <td className="font-body text-sm text-ivory/60 py-3">{watch.brand}</td>
//                                     <td className="font-body text-sm text-gold py-3">${watch.price?.toLocaleString()}</td>
//                                     <td className="font-body text-sm text-ivory/60 py-3">{watch.condition}</td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>

//             {/* Recent Purchases */}
//             <div className="bg-slate border border-gold/20 rounded-t-2xl p-6 mt-8">
//                 <h2 className="font-display text-xl text-ivory mb-6">Recent Purchases</h2>
//                 <div className="overflow-x-auto">
//                     <table className="w-full text-left">
//                         <thead>
//                             <tr className="border-b border-gold/20">
//                                 <th className="font-body text-xs text-ivory/50 uppercase tracking-wide pb-3">Watch</th>
//                                 <th className="font-body text-xs text-ivory/50 uppercase tracking-wide pb-3">Buyer</th>
//                                 <th className="font-body text-xs text-ivory/50 uppercase tracking-wide pb-3">Price</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {soldWatches.length === 0 ? (
//                                 <tr>
//                                     <td colSpan={3} className="font-body text-sm text-ivory/40 py-6 text-center">
//                                         No purchases yet.
//                                     </td>
//                                 </tr>
//                             ) : (
//                                 soldWatches.map((watch) => (
//                                     <tr key={watch._id} className="border-b border-gold/10 hover:bg-gold/5 transition-colors">
//                                         <td className="font-body text-sm text-ivory py-3">{watch.title}</td>
//                                         <td className="font-body text-sm text-ivory/60 py-3">{watch.buyerName || watch.buyerEmail}</td>
//                                         <td className="font-body text-sm text-gold py-3">${watch.price?.toLocaleString()}</td>
//                                     </tr>
//                                 ))
//                             )}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </div>
//     );
// }

//2


import { getAllWatches, getAllOrders, getUserCount } from "@/lib/api";
import { Users, Watch as WatchIcon, DollarSign, TrendingUp } from "lucide-react";
import SalesChart from "@/components/watches/SalesChart";

export default async function AdminDashboardPage() {
    // API থেকে সব প্রয়োজনীয় ডেটা প্যারালালি নিয়ে আসা হলো
    const [watches, orders, userCount] = await Promise.all([
        getAllWatches(),
        getAllOrders(),
        getUserCount(),
    ]);

    // Total Valuation হিসাব করা (সব ঘড়ির বর্তমান স্টক অনুযায়ী দাম)
    const totalValuation = watches.reduce((sum, w) => {
        const qty = Number(w.quantity) || 0;
        const price = Number(w.price) || 0;
        return sum + (price * qty);
    }, 0);

    // Total Revenue বা সর্বমোট বিক্রি হিসাব করা (orders থেকে)
    const totalRevenue = orders.reduce((sum, order) => {
        const qty = Number(order.quantity) || 1;
        const price = Number(order.price) || 0;
        return sum + (price * qty);
    }, 0);

    // মোট কতগুলো ঘড়ি বিক্রি হয়েছে তার সংখ্যা
    const totalWatchesSold = orders.reduce((sum, order) => sum + (Number(order.quantity) || 1), 0);

    const stats = [
        {
            label: "Total Watches Listed",
            value: watches.length,
            icon: WatchIcon,
        },
        {
            label: "Watches Sold",
            value: totalWatchesSold,
            icon: TrendingUp,
        },
        {
            label: "Total Revenue",
            value: `$${totalRevenue.toLocaleString()}`,
            icon: DollarSign,
        },
        {
            label: "Registered Users",
            // Better-Auth এর ইউজার কাউন্ট এখানে বসানো হলো
            value: userCount,
            icon: Users,
        },
    ];

    return (
        <div className="px-8 py-10">
            <h1 className="font-display text-3xl text-ivory mb-2">
                Admin <span className="text-gold">Dashboard</span>
            </h1>
            <p className="font-body text-sm text-ivory/50 mb-10">
                Marketplace overview and management tools
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {stats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <div
                            key={stat.label}
                            className="bg-slate border border-gold/20 rounded-t-2xl p-6"
                        >
                            <Icon className="w-5 h-5 text-gold mb-3" strokeWidth={1.5} />
                            <p className="font-display text-2xl text-ivory mb-1">
                                {stat.value}
                            </p>
                            <p className="font-body text-xs text-ivory/50 uppercase tracking-wide">
                                {stat.label}
                            </p>
                        </div>
                    );
                })}
            </div>

            {/* Sales Chart */}
            <SalesChart watches={watches} />

            {/* Recent Listings */}
            <div className="bg-slate border border-gold/20 rounded-t-2xl p-6 mt-8">
                <h2 className="font-display text-xl text-ivory mb-6">
                    Recent Listings
                </h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-gold/20">
                                <th className="font-body text-xs text-ivory/50 uppercase tracking-wide pb-3">Title</th>
                                <th className="font-body text-xs text-ivory/50 uppercase tracking-wide pb-3">Brand</th>
                                <th className="font-body text-xs text-ivory/50 uppercase tracking-wide pb-3">Price</th>
                                <th className="font-body text-xs text-ivory/50 uppercase tracking-wide pb-3">Stock</th>
                            </tr>
                        </thead>
                        <tbody>
                            {watches.slice(0, 8).map((watch) => (
                                <tr key={watch._id} className="border-b border-gold/10 hover:bg-gold/5 transition-colors">
                                    <td className="font-body text-sm text-ivory py-3">{watch.title}</td>
                                    <td className="font-body text-sm text-ivory/60 py-3">{watch.brand}</td>
                                    <td className="font-body text-sm text-gold py-3">${Number(watch.price).toLocaleString()}</td>
                                    <td className="font-body text-sm text-ivory/60 py-3">{watch.quantity} left</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Recent Purchases */}
            <div className="bg-slate border border-gold/20 rounded-t-2xl p-6 mt-8">
                <h2 className="font-display text-xl text-ivory mb-6">Recent Purchases</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-gold/20">
                                <th className="font-body text-xs text-ivory/50 uppercase tracking-wide pb-3">Watch</th>
                                <th className="font-body text-xs text-ivory/50 uppercase tracking-wide pb-3">Buyer</th>
                                <th className="font-body text-xs text-ivory/50 uppercase tracking-wide pb-3">Qty</th>
                                <th className="font-body text-xs text-ivory/50 uppercase tracking-wide pb-3">Total Paid</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="font-body text-sm text-ivory/40 py-6 text-center">
                                        No purchases yet.
                                    </td>
                                </tr>
                            ) : (
                                orders.slice(0, 8).map((order, index) => (
                                    <tr key={order._id || `order-${index}`} className="border-b border-gold/10 hover:bg-gold/5 transition-colors">
                                        <td className="font-body text-sm text-ivory py-3">{order.watchTitle}</td>
                                        <td className="font-body text-sm text-ivory/60 py-3">{order.buyerName || order.buyerEmail}</td>
                                        <td className="font-body text-sm text-ivory/60 py-3">{order.quantity || 1}</td>
                                        <td className="font-body text-sm text-gold py-3">
                                            ${((Number(order.price) || 0) * (Number(order.quantity) || 1)).toLocaleString()}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}