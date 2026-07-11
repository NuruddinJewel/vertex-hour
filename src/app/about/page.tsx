import Link from "next/link";
import { Watch, ShieldCheck, Gem, Users } from "lucide-react";

const values = [
    {
        icon: ShieldCheck,
        title: "Verified Authenticity",
        description:
            "Every timepiece undergoes a multi-point inspection by certified horologists before it ever reaches a listing.",
    },
    {
        icon: Gem,
        title: "Curated Excellence",
        description:
            "We accept only pieces that meet our standard for craftsmanship, condition, and provenance.",
    },
    {
        icon: Users,
        title: "Collector-First",
        description:
            "Built by collectors, for collectors — every feature exists to serve the people who wear these watches daily.",
    },
];

export default function AboutPage() {
    return (
        <div>
            {/* Hero */}
            <section className="min-h-[50vh] flex flex-col items-center justify-center text-center px-6 bg-charcoal">
                <Watch className="w-10 h-10 text-gold mb-6" strokeWidth={1.5} />
                <h1 className="font-display text-5xl text-ivory mb-4">
                    Our <span className="text-gold">Story</span>
                </h1>
                <p className="font-body text-ivory/60 max-w-xl">
                    A marketplace built on trust, precision, and a deep respect for horological craft.
                </p>
            </section>

            {/* Story Section */}
            <section className="max-w-4xl mx-auto px-6 py-20">
                <h2 className="font-display text-3xl text-ivory mb-6">
                    Why <span className="text-gold">Horology Vault</span>
                </h2>
                <div className="space-y-5 font-body text-ivory/60 leading-relaxed">
                    <p>
                        Horology Vault was founded on a simple belief: buying and selling
                        fine watches should feel as considered as the craftsmanship
                        inside them. Too often, collectors are left navigating
                        unverified listings, vague condition reports, and marketplaces
                        that treat a Patek Philippe the same as a fashion accessory.
                    </p>
                    <p>
                        We built a platform where every piece is inspected before
                        listing, every specification is documented in detail, and every
                        transaction is handled with the discretion the community
                        expects. Whether you are acquiring your first automatic or
                        adding to a decades-long collection, our goal is the same: give
                        you complete confidence in every detail.
                    </p>
                    <p>
                        Today, Horology Vault connects collectors with some of the most
                        respected names in watchmaking — Rolex, Patek Philippe,
                        Audemars Piguet, and beyond — through a marketplace designed
                        around trust, transparency, and an appreciation for mechanical
                        excellence.
                    </p>
                </div>
            </section>

            {/* Values Grid */}
            <section className="bg-slate/30 border-y border-gold/10 py-20">
                <div className="max-w-6xl mx-auto px-6">
                    <h2 className="font-display text-3xl text-ivory text-center mb-12">
                        What We <span className="text-gold">Stand For</span>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {values.map((value) => {
                            const Icon = value.icon;
                            return (
                                <div
                                    key={value.title}
                                    className="bg-slate border border-gold/20 rounded-t-2xl p-8 text-center hover:border-gold/40 transition-all duration-300"
                                >
                                    <Icon
                                        className="w-8 h-8 text-gold mx-auto mb-5"
                                        strokeWidth={1.5}
                                    />
                                    <h3 className="font-display text-xl text-ivory mb-3">
                                        {value.title}
                                    </h3>
                                    <p className="font-body text-sm text-ivory/50 leading-relaxed">
                                        {value.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="max-w-3xl mx-auto px-6 py-20 text-center">
                <h2 className="font-display text-3xl text-ivory mb-4">
                    Ready to Begin Your <span className="text-gold">Collection</span>?
                </h2>
                <p className="font-body text-ivory/50 mb-8">
                    Explore our curated selection of authenticated luxury timepieces.
                </p>

                <Link
                    href="/explore"
                    className="inline-block px-8 py-3 rounded-sm border border-gold text-gold font-body text-sm hover:bg-gold hover:text-charcoal transition-all duration-300"
                >
                    Explore Horology Vault
                </Link>
            </section>
        </div>
    );
}