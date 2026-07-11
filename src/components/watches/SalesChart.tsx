"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Watch } from "@/types/watch";

interface SalesChartProps {
    watches: Watch[];
}

export default function SalesChart({ watches }: SalesChartProps) {
    const soldWatches = watches.filter((w) => w.status === "sold");

    const brandSales: Record<string, number> = {};
    soldWatches.forEach((w) => {
        brandSales[w.brand] = (brandSales[w.brand] || 0) + 1;
    });

    const chartData = Object.entries(brandSales).map(([brand, count]) => ({
        brand,
        sold: count,
    }));

    return (
        <div className="bg-slate border border-gold/20 rounded-t-2xl p-6">
            <h2 className="font-display text-xl text-ivory mb-6">Sales by Brand</h2>

            {chartData.length === 0 ? (
                <p className="font-body text-sm text-ivory/40 py-10 text-center">
                    No sales data yet. Charts will appear once watches are sold.
                </p>
            ) : (
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#C5A88020" />
                        <XAxis dataKey="brand" stroke="#E8E6E1" fontSize={12} />
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