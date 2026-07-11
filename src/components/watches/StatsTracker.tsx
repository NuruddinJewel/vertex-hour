// import { getAllWatches } from "@/lib/api";
// import { Users, Watch as WatchIcon, DollarSign } from "lucide-react";

// export default async function StatsTracker() {
//     const watches = await getAllWatches();
//     const totalValuation = watches.reduce((sum, w) => sum + (w.price || 0), 0);

//     const stats = [
//         {
//             label: "Registered Collectors",
//             value: "500+",
//             icon: Users,
//         },
//         {
//             label: "Watches Listed",
//             value: watches.length.toString(),
//             icon: WatchIcon,
//         },
//         {
//             label: "Total Valuation",
//             value: `$${totalValuation.toLocaleString()}`,
//             icon: DollarSign,
//         },
//     ];

//     return (
//         <section className="bg-slate/30 border-y border-gold/10 py-16">
//             <div className="max-w-7xl mx-auto px-6">
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//                     {stats.map((stat) => {
//                         const Icon = stat.icon;
//                         return (
//                             <div key={stat.label} className="text-center">
//                                 <Icon className="w-6 h-6 text-gold mx-auto mb-4" strokeWidth={1.5} />
//                                 <p className="font-display text-4xl text-ivory mb-2">
//                                     {stat.value}
//                                 </p>
//                                 <p className="font-body text-sm text-ivory/50 uppercase tracking-wide">
//                                     {stat.label}
//                                 </p>
//                             </div>
//                         );
//                     })}
//                 </div>
//             </div>
//         </section>
//     );
// }

//2
// import { getAllWatches } from "@/lib/api";
// import { Users, Watch as WatchIcon, DollarSign } from "lucide-react";

// export default async function StatsTracker() {
//     const watches = await getAllWatches();
//     const soldWatches = watches.filter((w) => w.status === "sold");
//     const totalValuation = watches.reduce((sum, w) => sum + (w.price || 0), 0);

//     const stats = [
//         { label: "Registered Collectors", value: "500+", icon: Users },
//         { label: "Watches Traded", value: soldWatches.length.toString(), icon: WatchIcon },
//         { label: "Total Valuation", value: `$${totalValuation.toLocaleString()}`, icon: DollarSign },
//     ];

//     return (
//         <section className="bg-slate/30 border-y border-gold/10 py-16">
//             <div className="max-w-7xl mx-auto px-6">
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//                     {stats.map((stat) => {
//                         const Icon = stat.icon;
//                         return (
//                             <div key={stat.label} className="text-center">
//                                 <Icon className="w-6 h-6 text-gold mx-auto mb-4" strokeWidth={1.5} />
//                                 <p className="font-display text-4xl text-ivory mb-2">{stat.value}</p>
//                                 <p className="font-body text-sm text-ivory/50 uppercase tracking-wide">{stat.label}</p>
//                             </div>
//                         );
//                     })}
//                 </div>
//             </div>
//         </section>
//     );
// }

//3

import { getAllWatches, getAllOrders, getUserCount } from "@/lib/api"; // 👈 প্রয়োজনীয় API গুলো ইম্পোর্ট করা হলো
import { Users, Watch as WatchIcon, DollarSign } from "lucide-react";

export default async function StatsTracker() {
    // সব ডেটা একসাথে ব্যাকএন্ড থেকে প্যারালালি ফেচ করা
    const [watches, orders, userCount] = await Promise.all([
        getAllWatches(),
        getAllOrders(),
        getUserCount(),
    ]);

    // ১. মোট কতগুলো ঘড়ি এ পর্যন্ত ট্রেড/বিক্রি হয়েছে (টোটাল অর্ডার সংখ্যা)
    const totalWatchesTraded = orders.reduce((sum, order) => sum + (Number(order.quantity) || 1), 0);

    // ২. ইনভেন্টরির মোট লাইভ ভ্যালুয়েশন (স্টকে থাকা সব ঘড়ির মোট মূল্য)
    const totalValuation = watches.reduce((sum, w) => {
        const qty = Number(w.quantity) || 0;
        const price = Number(w.price) || 0;
        return sum + (price * qty);
    }, 0);

    // ৩. রিয়েল রেজিস্টার্ড ইউজারের সংখ্যা (যদি ০ হয়, তবে ব্যাকআপ হিসেবে ৫০০+ দেখাবে)
    const displayUsers = userCount > 0 ? `${userCount}+` : "500+";

    const stats = [
        {
            label: "Registered Collectors",
            value: displayUsers, // 👈 ডাইনামিক ইউজার কাউন্ট
            icon: Users
        },
        {
            label: "Watches Traded",
            value: totalWatchesTraded.toString(), // 👈 ডাইনামিক রিয়েল সেলস কাউন্ট
            icon: WatchIcon
        },
        {
            label: "Total Valuation",
            value: `$${totalValuation.toLocaleString()}`, // 👈 সঠিক ক্যালকুলেশন ভ্যালু
            icon: DollarSign
        },
    ];

    return (
        <section className="bg-slate/30 border-y border-gold/10 py-16">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {stats.map((stat) => {
                        const Icon = stat.icon;
                        return (
                            <div key={stat.label} className="text-center">
                                <Icon className="w-6 h-6 text-gold mx-auto mb-4" strokeWidth={1.5} />
                                <p className="font-display text-4xl text-ivory mb-2">{stat.value}</p>
                                <p className="font-body text-sm text-ivory/50 uppercase tracking-wide">{stat.label}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}