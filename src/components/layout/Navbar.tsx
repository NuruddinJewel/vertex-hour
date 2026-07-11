// "use client";

// import Link from "next/link";
// import { useState, useRef, useEffect } from "react";
// import { Menu, X, Watch, ChevronDown } from "lucide-react";
// import { useSession, signOut } from "@/lib/auth-client";

// export default function Navbar() {
//     const [isOpen, setIsOpen] = useState(false);
//     const [dropdownOpen, setDropdownOpen] = useState(false);
//     const dropdownRef = useRef<HTMLDivElement>(null);
//     const { data: session, isPending } = useSession();
//     const isLoggedIn = !!session;

//     useEffect(() => {
//         function handleClickOutside(e: MouseEvent) {
//             if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
//                 setDropdownOpen(false);
//             }
//         }
//         document.addEventListener("mousedown", handleClickOutside);
//         return () => document.removeEventListener("mousedown", handleClickOutside);
//     }, []);

//     const loggedOutLinks = [
//         { label: "Home", href: "/" },
//         { label: "Explore", href: "/explore" },
//         { label: "About", href: "/about" },
//     ];

//     const loggedInLinks = [
//         { label: "Home", href: "/" },
//         { label: "Explore", href: "/explore" },
//         { label: "Add Watch", href: "/items/add" },
//     ];

//     const links = isLoggedIn ? loggedInLinks : loggedOutLinks;
//     const dashboardHref =
//         session?.user?.role === "admin" ? "/dashboard/admin" : "/dashboard/user";

//     return (
//         <nav className="sticky top-0 z-50 bg-charcoal/95 backdrop-blur-sm border-b border-gold/20">
//             <div className="max-w-7xl mx-auto px-6 lg:px-10">
//                 <div className="flex items-center justify-between h-20">
//                     <Link href="/" className="flex items-center gap-2 group">
//                         <Watch
//                             className="w-6 h-6 text-gold transition-transform duration-500 group-hover:rotate-[360deg]"
//                             strokeWidth={1.5}
//                         />
//                         <span className="font-display text-2xl tracking-wide text-ivory">
//                             Horology<span className="text-gold"> Vault</span>
//                         </span>
//                     </Link>

//                     <div className="hidden md:flex items-center gap-10">
//                         {links.map((link) => (
//                             <Link
//                                 key={link.href}
//                                 href={link.href}
//                                 className="font-body text-sm tracking-wide text-ivory/80 hover:text-gold transition-colors duration-300"
//                             >
//                                 {link.label}
//                             </Link>
//                         ))}
//                     </div>

//                     <div className="hidden md:flex items-center gap-4">
//                         {isPending ? null : !isLoggedIn ? (
//                             <>
//                                 <Link href="/login" className="font-body text-sm text-ivory/80 hover:text-gold transition-colors">
//                                     Sign In
//                                 </Link>
//                                 <Link
//                                     href="/register"
//                                     className="font-body text-sm px-5 py-2 rounded-sm border border-gold text-gold hover:bg-gold hover:text-charcoal transition-all duration-300"
//                                 >
//                                     Join
//                                 </Link>
//                             </>
//                         ) : (
//                             <div className="relative" ref={dropdownRef}>
//                                 <button
//                                     onClick={() => setDropdownOpen(!dropdownOpen)}
//                                     className="flex items-center gap-2 px-3 py-2 rounded-sm hover:bg-gold/5 transition-colors"
//                                 >
//                                     <div className="w-9 h-9 rounded-full bg-slate border border-gold/40 flex items-center justify-center text-gold font-display text-sm">
//                                         {session.user.name?.charAt(0).toUpperCase() || "U"}
//                                     </div>
//                                     <ChevronDown className="w-4 h-4 text-ivory/50" />
//                                 </button>

//                                 {dropdownOpen && (
//                                     <div className="absolute right-0 mt-2 w-48 bg-slate border border-gold/20 rounded-sm shadow-lg py-2">
//                                         <Link
//                                             href="/profile"
//                                             onClick={() => setDropdownOpen(false)}
//                                             className="block px-4 py-2 font-body text-sm text-ivory/80 hover:bg-gold/10 hover:text-gold transition-colors"
//                                         >
//                                             Profile
//                                         </Link>
//                                         <Link
//                                             href={dashboardHref}
//                                             onClick={() => setDropdownOpen(false)}
//                                             className="block px-4 py-2 font-body text-sm text-ivory/80 hover:bg-gold/10 hover:text-gold transition-colors"
//                                         >
//                                             Dashboard
//                                         </Link>
//                                         <div className="h-px bg-gold/10 my-2" />
//                                         <button
//                                             onClick={() => signOut()}
//                                             className="w-full text-left px-4 py-2 font-body text-sm text-red-400 hover:bg-red-400/10 transition-colors"
//                                         >
//                                             Sign Out
//                                         </button>
//                                     </div>
//                                 )}
//                             </div>
//                         )}
//                     </div>

//                     <button className="md:hidden text-ivory" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
//                         {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//                     </button>
//                 </div>
//             </div>

//             {isOpen && (
//                 <div className="md:hidden bg-slate border-t border-gold/20 px-6 py-6 flex flex-col gap-5">
//                     {links.map((link) => (
//                         <Link key={link.href} href={link.href} className="font-body text-ivory/90 hover:text-gold transition-colors" onClick={() => setIsOpen(false)}>
//                             {link.label}
//                         </Link>
//                     ))}
//                     <div className="h-px bg-gold/20 my-2" />
//                     {!isLoggedIn ? (
//                         <>
//                             <Link href="/login" className="text-ivory/80 hover:text-gold">Sign In</Link>
//                             <Link href="/register" className="text-center px-5 py-2 rounded-sm border border-gold text-gold">Join</Link>
//                         </>
//                     ) : (
//                         <>
//                             <Link href="/profile" className="text-ivory/80 hover:text-gold">Profile</Link>
//                             <Link href={dashboardHref} className="text-ivory/80 hover:text-gold">Dashboard</Link>
//                             <button onClick={() => signOut()} className="text-left text-red-400">Sign Out</button>
//                         </>
//                     )}
//                 </div>
//             )}
//         </nav>
//     );
// }

//2
// "use client";

// import Link from "next/link";
// import { useState, useRef, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { Menu, X, Watch, ChevronDown } from "lucide-react";
// import { useSession, signOut } from "@/lib/auth-client";
// import { toast } from "react-toastify";

// export default function Navbar() {
//     const router = useRouter();
//     const [isOpen, setIsOpen] = useState(false);
//     const [dropdownOpen, setDropdownOpen] = useState(false);
//     const dropdownRef = useRef<HTMLDivElement>(null);
//     const { data: session, isPending } = useSession();
//     const isLoggedIn = !!session;

//     useEffect(() => {
//         function handleClickOutside(e: MouseEvent) {
//             if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
//                 setDropdownOpen(false);
//             }
//         }
//         document.addEventListener("mousedown", handleClickOutside);
//         return () => document.removeEventListener("mousedown", handleClickOutside);
//     }, []);

//     async function handleSignOut() {
//         await signOut();
//         toast.success("Signed out successfully!");
//         setDropdownOpen(false);
//         setIsOpen(false);
//         router.push("/");
//     }

//     const loggedOutLinks = [
//         { label: "Home", href: "/" },
//         { label: "Explore", href: "/explore" },
//         { label: "About", href: "/about" },
//     ];

//     const loggedInLinks = [
//         { label: "Home", href: "/" },
//         { label: "Explore", href: "/explore" },
//         { label: "Add Watch", href: "/items/add" },
//     ];

//     const links = isLoggedIn ? loggedInLinks : loggedOutLinks;
//     const dashboardHref =
//         session?.user?.role === "admin" ? "/dashboard/admin" : "/dashboard/user";

//     return (
//         <nav className="sticky top-0 z-50 bg-charcoal/95 backdrop-blur-sm border-b border-gold/20">
//             <div className="max-w-7xl mx-auto px-6 lg:px-10">
//                 <div className="flex items-center justify-between h-20">
//                     <Link href="/" className="flex items-center gap-2 group">
//                         <Watch
//                             className="w-6 h-6 text-gold transition-transform duration-500 group-hover:rotate-[360deg]"
//                             strokeWidth={1.5}
//                         />
//                         <span className="font-display text-2xl tracking-wide text-ivory">
//                             Horology<span className="text-gold"> Vault</span>
//                         </span>
//                     </Link>

//                     <div className="hidden md:flex items-center gap-10">
//                         {links.map((link) => (
//                             <Link
//                                 key={link.href}
//                                 href={link.href}
//                                 className="font-body text-sm tracking-wide text-ivory/80 hover:text-gold transition-colors duration-300"
//                             >
//                                 {link.label}
//                             </Link>
//                         ))}
//                     </div>

//                     <div className="hidden md:flex items-center gap-4">
//                         {isPending ? null : !isLoggedIn ? (
//                             <>
//                                 <Link href="/login" className="font-body text-sm text-ivory/80 hover:text-gold transition-colors">
//                                     Sign In
//                                 </Link>
//                                 <Link
//                                     href="/register"
//                                     className="font-body text-sm px-5 py-2 rounded-sm border border-gold text-gold hover:bg-gold hover:text-charcoal transition-all duration-300"
//                                 >
//                                     Join
//                                 </Link>
//                             </>
//                         ) : (
//                             <div className="relative" ref={dropdownRef}>
//                                 <button
//                                     onClick={() => setDropdownOpen(!dropdownOpen)}
//                                     className="flex items-center gap-2 px-3 py-2 rounded-sm hover:bg-gold/5 transition-colors"
//                                 >
//                                     <div className="w-9 h-9 rounded-full bg-slate border border-gold/40 flex items-center justify-center text-gold font-display text-sm">
//                                         {session.user.name?.charAt(0).toUpperCase() || "U"}
//                                     </div>
//                                     <ChevronDown className="w-4 h-4 text-ivory/50" />
//                                 </button>

//                                 {dropdownOpen && (
//                                     <div className="absolute right-0 mt-2 w-48 bg-slate border border-gold/20 rounded-sm shadow-lg py-2">
//                                         <Link
//                                             href="/profile"
//                                             onClick={() => setDropdownOpen(false)}
//                                             className="block px-4 py-2 font-body text-sm text-ivory/80 hover:bg-gold/10 hover:text-gold transition-colors"
//                                         >
//                                             Profile
//                                         </Link>
//                                         <Link
//                                             href={dashboardHref}
//                                             onClick={() => setDropdownOpen(false)}
//                                             className="block px-4 py-2 font-body text-sm text-ivory/80 hover:bg-gold/10 hover:text-gold transition-colors"
//                                         >
//                                             Dashboard
//                                         </Link>
//                                         <div className="h-px bg-gold/10 my-2" />
//                                         <button
//                                             onClick={handleSignOut}
//                                             className="w-full text-left px-4 py-2 font-body text-sm text-red-400 hover:bg-red-400/10 transition-colors"
//                                         >
//                                             Sign Out
//                                         </button>
//                                     </div>
//                                 )}
//                             </div>
//                         )}
//                     </div>

//                     <button className="md:hidden text-ivory" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
//                         {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//                     </button>
//                 </div>
//             </div>

//             {isOpen && (
//                 <div className="md:hidden bg-slate border-t border-gold/20 px-6 py-6 flex flex-col gap-5">
//                     {links.map((link) => (
//                         <Link
//                             key={link.href}
//                             href={link.href}
//                             className="font-body text-ivory/90 hover:text-gold transition-colors"
//                             onClick={() => setIsOpen(false)}
//                         >
//                             {link.label}
//                         </Link>
//                     ))}
//                     <div className="h-px bg-gold/20 my-2" />
//                     {!isLoggedIn ? (
//                         <>
//                             <Link href="/login" className="text-ivory/80 hover:text-gold">Sign In</Link>
//                             <Link href="/register" className="text-center px-5 py-2 rounded-sm border border-gold text-gold">Join</Link>
//                         </>
//                     ) : (
//                         <>
//                             <Link href="/profile" className="text-ivory/80 hover:text-gold">Profile</Link>
//                             <Link href={dashboardHref} className="text-ivory/80 hover:text-gold">Dashboard</Link>
//                             <button onClick={handleSignOut} className="text-left text-red-400">Sign Out</button>
//                         </>
//                     )}
//                 </div>
//             )}
//         </nav>
//     );
// }

// 3

"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Menu, X, Watch, ChevronDown } from "lucide-react";
import { useSession, signOut } from "@/lib/auth-client";
import { toast } from "react-toastify";

export default function Navbar() {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const { data: session, isPending } = useSession();
    const isLoggedIn = !!session;

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    async function handleSignOut() {
        await signOut();
        toast.success("Signed out successfully!");
        setDropdownOpen(false);
        setIsOpen(false);
        router.push("/");
    }

    const loggedOutLinks = [
        { label: "Home", href: "/" },
        { label: "Explore", href: "/explore" },
        { label: "About", href: "/about" },
    ];

    const loggedInLinks = [
        { label: "Home", href: "/" },
        { label: "Explore", href: "/explore" },
        { label: "Add Watch", href: "/items/add" },
    ];

    const links = isLoggedIn ? loggedInLinks : loggedOutLinks;

    const dashboardHref =
        session?.user?.role === "admin" ? "/dashboard/admin" : "/items/manage";
    const dashboardLabel =
        session?.user?.role === "admin" ? "Dashboard" : "Manage Watches";

    return (
        <nav className="sticky top-0 z-50 bg-charcoal/95 backdrop-blur-sm border-b border-gold/20">
            <div className="max-w-7xl mx-auto px-6 lg:px-10">
                <div className="flex items-center justify-between h-20">
                    <Link href="/" className="flex items-center gap-2 group">
                        <Watch
                            className="w-6 h-6 text-gold transition-transform duration-500 group-hover:rotate-[360deg]"
                            strokeWidth={1.5}
                        />
                        <span className="font-display text-2xl tracking-wide text-ivory">
                            Horology<span className="text-gold"> Vault</span>
                        </span>
                    </Link>

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

                    <div className="hidden md:flex items-center gap-4">
                        {isPending ? null : !isLoggedIn ? (
                            <>
                                <Link href="/login" className="font-body text-sm text-ivory/80 hover:text-gold transition-colors">
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
                            <div className="relative" ref={dropdownRef}>
                                <button
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                    className="flex items-center gap-2 px-3 py-2 rounded-sm hover:bg-gold/5 transition-colors"
                                >
                                    <div className="w-9 h-9 rounded-full bg-slate border border-gold/40 flex items-center justify-center text-gold font-display text-sm">
                                        {session.user.name?.charAt(0).toUpperCase() || "U"}
                                    </div>
                                    <ChevronDown className="w-4 h-4 text-ivory/50" />
                                </button>

                                {dropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-slate border border-gold/20 rounded-sm shadow-lg py-2">
                                        <Link
                                            href="/profile"
                                            onClick={() => setDropdownOpen(false)}
                                            className="block px-4 py-2 font-body text-sm text-ivory/80 hover:bg-gold/10 hover:text-gold transition-colors"
                                        >
                                            Profile
                                        </Link>
                                        <Link
                                            href={dashboardHref}
                                            onClick={() => setDropdownOpen(false)}
                                            className="block px-4 py-2 font-body text-sm text-ivory/80 hover:bg-gold/10 hover:text-gold transition-colors"
                                        >
                                            {dashboardLabel}
                                        </Link>
                                        <div className="h-px bg-gold/10 my-2" />
                                        <button
                                            onClick={handleSignOut}
                                            className="w-full text-left px-4 py-2 font-body text-sm text-red-400 hover:bg-red-400/10 transition-colors"
                                        >
                                            Sign Out
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    <button className="md:hidden text-ivory" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

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
                            <Link href="/login" className="text-ivory/80 hover:text-gold">Sign In</Link>
                            <Link href="/register" className="text-center px-5 py-2 rounded-sm border border-gold text-gold">Join</Link>
                        </>
                    ) : (
                        <>
                            <Link href="/profile" className="text-ivory/80 hover:text-gold">Profile</Link>
                            <Link href={dashboardHref} className="text-ivory/80 hover:text-gold">{dashboardLabel}</Link>
                            <button onClick={handleSignOut} className="text-left text-red-400">Sign Out</button>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
}