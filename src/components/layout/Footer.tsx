import Link from "next/link";
import { Watch, Mail } from "lucide-react";
import { FiInstagram, FiTwitter } from "react-icons/fi";

export default function Footer() {
    const columns = [
        {
            title: "Explore",
            links: [
                { label: "All Watches", href: "/explore" },
                { label: "Top Brands", href: "/explore?sort=brand" },
                { label: "Live Auctions", href: "/explore?filter=auction" },
            ],
        },
        {
            title: "Company",
            links: [
                { label: "About", href: "/about" },
                { label: "Blog", href: "/blog" },
                { label: "Contact", href: "/contact" },
            ],
        },
        {
            title: "Support",
            links: [
                { label: "Authenticity Guide", href: "/blog/authenticity-verification-guide" },
                { label: "Shipping", href: "/faq#shipping" },
                { label: "Warranty", href: "/faq#warranty" },
            ],
        },
    ];

    return (
        <footer className="bg-charcoal border-t border-gold/20 mt-24">
            <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
                    {/* Brand */}
                    <div className="md:col-span-1">
                        <div className="flex items-center gap-2 mb-4">
                            <Watch className="w-5 h-5 text-gold" strokeWidth={1.5} />
                            <span className="font-display text-xl text-ivory">
                                Horology<span className="text-gold"> Vault</span>
                            </span>
                        </div>
                        <p className="font-body text-sm text-ivory/50 leading-relaxed">
                            A curated marketplace for collectors of fine, authenticated timepieces.
                        </p>
                    </div>

                    {/* Link Columns */}
                    {columns.map((col) => (
                        <div key={col.title}>
                            <h4 className="font-display text-gold text-lg mb-4">{col.title}</h4>
                            <ul className="space-y-3">
                                {col.links.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="font-body text-sm text-ivory/60 hover:text-gold transition-colors"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Divider */}
                <div className="h-px bg-gold/20 my-10" />

                {/* Bottom Row */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="font-body text-xs text-ivory/40">
                        © {new Date().getFullYear()} Horology Vault. All rights reserved.
                    </p>
                    <div className="flex gap-5">
                        <FiInstagram className="w-4 h-4 text-ivory/50 hover:text-gold cursor-pointer transition-colors" />
                        <FiTwitter className="w-4 h-4 text-ivory/50 hover:text-gold cursor-pointer transition-colors" />
                        <Mail className="w-4 h-4 text-ivory/50 hover:text-gold cursor-pointer transition-colors" />
                    </div>
                </div>
            </div>
        </footer>
    );
}