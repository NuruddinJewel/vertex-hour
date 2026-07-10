"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Watch } from "lucide-react";

interface NavbarProps {
    isLoggedIn?: boolean;
}

export default function Navbar({ isLoggedIn = false }: NavbarProps) {
    const [isOpen, setIsOpen] = useState(false);

    const loggedOutLinks = [
        { label: "Home", href: "/" },
        { label: "Explore", href: "/explore" },
        { label: "About", href: "/about" },
    ];

    const loggedInLinks = [
        { label: "Home", href: "/" },
        { label: "Explore", href: "/explore" },
        { label: "Add Watch", href: "/items/add" },
        { label: "Dashboard", href: "/dashboard" },
        { label: "Profile", href: "/profile" },
    ];

    const links = isLoggedIn ? loggedInLinks : loggedOutLinks;

    return (
        <nav className="sticky top-0 z-50 bg-charcoal/95 backdrop-blur-sm border-b border-gold/20">
            <div className="max-w-7xl mx-auto px-6 lg:px-10">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <Watch
                            className="w-6 h-6 text-gold transition-transform duration-500 group-hover:rotate-360"
                            strokeWidth={1.5}
                        />
                        <span className="font-display text-2xl tracking-wide text-ivory">
                            Horology<span className="text-gold"> Vault</span>
                        </span>
                    </Link>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center gap-10">
                        {links.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="font-body text-sm tracking-wide text-ivory/80 hover:text-gold transition-colors duration-300"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* CTA / Auth */}
                    <div className="hidden md:flex items-center gap-4">
                        {!isLoggedIn ? (
                            <>
                                <Link
                                    href="/login"
                                    className="font-body text-sm text-ivory/80 hover:text-gold transition-colors"
                                >
                                    Sign In
                                </Link>
                                <Link
                                    href="/register"
                                    className="font-body text-sm px-5 py-2 rounded-sm border border-gold text-gold hover:bg-gold hover:text-charcoal transition-all duration-300"
                                >
                                    Join
                                </Link>
                            </>
                        ) : (
                            <div className="w-9 h-9 rounded-full bg-slate border border-gold/40 flex items-center justify-center text-gold font-display text-sm">
                                U
                            </div>
                        )}
                    </div>

                    {/* Mobile Hamburger */}
                    <button
                        className="md:hidden text-ivory"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-slate border-t border-gold/20 px-6 py-6 flex flex-col gap-5">
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="font-body text-ivory/90 hover:text-gold transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <div className="h-px bg-gold/20 my-2" />
                    {!isLoggedIn ? (
                        <>
                            <Link href="/login" className="text-ivory/80 hover:text-gold">
                                Sign In
                            </Link>
                            <Link
                                href="/register"
                                className="text-center px-5 py-2 rounded-sm border border-gold text-gold"
                            >
                                Join
                            </Link>
                        </>
                    ) : (
                        <Link href="/profile" className="text-ivory/80 hover:text-gold">
                            Profile
                        </Link>
                    )}
                </div>
            )}
        </nav>
    );
}