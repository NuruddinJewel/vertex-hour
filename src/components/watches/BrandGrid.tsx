import Link from "next/link";

const brands = [
    { name: "Rolex", count: "4 pieces" },
    { name: "Patek Philippe", count: "1 piece" },
    { name: "Omega", count: "1 piece" },
    { name: "Audemars Piguet", count: "1 piece" },
    { name: "Cartier", count: "1 piece" },
    { name: "IWC", count: "1 piece" },
];

export default function BrandGrid() {
    return (
        <section className="max-w-7xl mx-auto px-6 py-16">
            <h2 className="font-display text-3xl text-ivory mb-8">
                Shop by <span className="text-gold">Brand</span>
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {brands.map((brand) => (
                    <Link
                        key={brand.name}
                        href={`/explore?brand=${encodeURIComponent(brand.name)}`}
                        className="group bg-slate border border-gold/20 rounded-t-2xl p-6 flex flex-col items-center justify-center text-center hover:border-gold/50 transition-all duration-300"
                    >
                        <span className="font-display text-lg text-ivory group-hover:text-gold transition-colors">
                            {brand.name}
                        </span>
                        <span className="font-body text-xs text-ivory/40 mt-1">
                            {brand.count}
                        </span>
                    </Link>
                ))}
            </div>
        </section>
    );
}