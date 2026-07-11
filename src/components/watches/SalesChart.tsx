// "use client";

// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
// import { Watch } from "@/types/watch";

// interface SalesChartProps {
//     watches: Watch[];
// }

// export default function SalesChart({ watches }: SalesChartProps) {
//     const soldWatches = watches.filter((w) => w.status === "sold");

//     const brandSales: Record<string, number> = {};
//     soldWatches.forEach((w) => {
//         brandSales[w.brand] = (brandSales[w.brand] || 0) + 1;
//     });

//     const chartData = Object.entries(brandSales).map(([brand, count]) => ({
//         brand,
//         sold: count,
//     }));

//     return (
//         <div className="bg-slate border border-gold/20 rounded-t-2xl p-6">
//             <h2 className="font-display text-xl text-ivory mb-6">Sales by Brand</h2>

//             {chartData.length === 0 ? (
//                 <p className="font-body text-sm text-ivory/40 py-10 text-center">
//                     No sales data yet. Charts will appear once watches are sold.
//                 </p>
//             ) : (
//                 <ResponsiveContainer width="100%" height={300}>
//                     <BarChart data={chartData}>
//                         <CartesianGrid strokeDasharray="3 3" stroke="#C5A88020" />
//                         <XAxis dataKey="brand" stroke="#E8E6E1" fontSize={12} />
//                         <YAxis stroke="#E8E6E1" fontSize={12} allowDecimals={false} />
//                         <Tooltip
//                             contentStyle={{
//                                 backgroundColor: "#1F2833",
//                                 border: "1px solid #C5A88040",
//                                 borderRadius: "4px",
//                             }}
//                             labelStyle={{ color: "#E8E6E1" }}
//                             itemStyle={{ color: "#C5A880" }}
//                         />
//                         <Bar dataKey="sold" fill="#C5A880" radius={[4, 4, 0, 0]} />
//                     </BarChart>
//                 </ResponsiveContainer>
//             )}
//         </div>
//     );
// }

//2

// "use client";

// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// // আপনার প্রজেক্টের Order টাইপ ফাইল থেকে ইমপোর্ট করুন (যদি আলাদা ফাইলে থাকে)
// // যদি টাইপ ফাইল না থাকে, তবে এই ইন্টারফেসটি এভাবেই রাখুন
// export interface Order {
//     _id?: string;
//     watchTitle: string;
//     brand?: string; // যদি অর্ডারে সরাসরি brand থাকে
//     watchBrand?: string; // ব্যাকএন্ড যদি watchBrand নামে পাঠায়
//     price: number | string;
//     quantity: number | string;
//     buyerName?: string;
//     buyerEmail?: string;
// }

// interface SalesChartProps {
//     orders: Order[]; // 👈 এখানে সঠিকভাবে প্রপস ডিফাইন করা হলো
// }

// export default function SalesChart({ orders }: SalesChartProps) {
//     const brandSales: Record<string, number> = {};

//     // প্রতিটা সফল অর্ডার থেকে ব্র্যান্ডের নাম নিয়ে কাউন্ট করা
//     orders.forEach((order) => {
//         // আপনার এপিআই রেসপন্স অনুযায়ী brand বা watchBrand যেটা থাকবে সেটা নিবে
//         const brandName = order.brand || order.watchBrand || "Unknown";
//         brandSales[brandName] = (brandSales[brandName] || 0) + (Number(order.quantity) || 1);
//     });

//     const chartData = Object.entries(brandSales).map(([brand, count]) => ({
//         brand,
//         sold: count,
//     }));

//     return (
//         <div className="bg-slate border border-gold/20 rounded-t-2xl p-6">
//             <h2 className="font-display text-xl text-ivory mb-6">Sales by Brand</h2>

//             {chartData.length === 0 ? (
//                 <p className="font-body text-sm text-ivory/40 py-10 text-center">
//                     No sales data yet. Charts will appear once watches are sold.
//                 </p>
//             ) : (
//                 <ResponsiveContainer width="100%" height={300}>
//                     <BarChart data={chartData}>
//                         <CartesianGrid strokeDasharray="3 3" stroke="#C5A88020" />
//                         <XAxis dataKey="brand" stroke="#E8E6E1" fontSize={12} />
//                         <YAxis stroke="#E8E6E1" fontSize={12} allowDecimals={false} />
//                         <Tooltip
//                             contentStyle={{
//                                 backgroundColor: "#1F2833",
//                                 border: "1px solid #C5A88040",
//                                 borderRadius: "4px",
//                             }}
//                             labelStyle={{ color: "#E8E6E1" }}
//                             itemStyle={{ color: "#C5A880" }}
//                         />
//                         <Bar dataKey="sold" fill="#C5A880" radius={[4, 4, 0, 0]} />
//                     </BarChart>
//                 </ResponsiveContainer>
//             )}
//         </div>
//     );
// }

//3
//3

"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export interface Order {
    _id?: string;
    watchTitle: string; // 👈 আপনার টেবিলে এই নামটাই দেখাচ্ছে
    price: number | string;
    quantity: number | string;
    buyerName?: string;
    buyerEmail?: string;
}

interface SalesChartProps {
    orders: Order[];
}

export default function SalesChart({ orders }: SalesChartProps) {
    const watchSales: Record<string, number> = {};

    // প্রতিটা সফল অর্ডার থেকে সরাসরি ঘড়ির টাইটেল (নাম) নিয়ে কাউন্ট করা
    orders.forEach((order) => {
        const title = order.watchTitle || "Unknown Watch";
        watchSales[title] = (watchSales[title] || 0) + (Number(order.quantity) || 1);
    });

    // ম্যাপ করার সময় brand-এর বদলে আমরা এখন নাম (watchName) ব্যবহার করছি
    const chartData = Object.entries(watchSales).map(([watchName, count]) => ({
        watchName,
        sold: count,
    }));

    return (
        <div className="bg-slate border border-gold/20 rounded-t-2xl p-6">
            <h2 className="font-display text-xl text-ivory mb-6">Sales by Watch Title</h2>

            {chartData.length === 0 ? (
                <p className="font-body text-sm text-ivory/40 py-10 text-center">
                    No sales data yet. Charts will appear once watches are sold.
                </p>
            ) : (
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#C5A88020" />
                        {/* 👈 এখানে dataKey পরিবর্তন করে watchName দেওয়া হলো */}
                        <XAxis dataKey="watchName" stroke="#E8E6E1" fontSize={11} tickFormatter={(value) => value.length > 15 ? `${value.slice(0, 15)}...` : value} />
                        <YAxis stroke="#E8E6E1" fontSize={12} allowDecimals={false} />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "#1F2833",
                                border: "1px solid #C5A88040",
                                borderRadius: "4px",
                            }}
                            labelStyle={{ color: "#E8E6E1" }}
                            itemStyle={{ color: "#C5A880" }}
                        />
                        <Bar dataKey="sold" fill="#C5A880" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            )}
        </div>
    );
}