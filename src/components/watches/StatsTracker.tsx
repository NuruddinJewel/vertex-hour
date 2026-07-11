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


import { getAllWatches } from "@/lib/api";
import { Users, Watch as WatchIcon, DollarSign } from "lucide-react";

export default async function StatsTracker() {
    const watches = await getAllWatches();
    const soldWatches = watches.filter((w) => w.status === "sold");
    const totalValuation = watches.reduce((sum, w) => sum + (w.price || 0), 0);

    const stats = [
        { label: "Registered Collectors", value: "500+", icon: Users },
        { label: "Watches Traded", value: soldWatches.length.toString(), icon: WatchIcon },
        { label: "Total Valuation", value: `$${totalValuation.toLocaleString()}`, icon: DollarSign },
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