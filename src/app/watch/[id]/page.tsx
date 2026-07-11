// "use client";

// import { useEffect, useState } from "react";
// import { useParams, useRouter } from "next/navigation";
// import Image from "next/image";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import { getWatchById, buyWatch } from "@/lib/api";
// import { useSession } from "@/lib/auth-client";
// import { Watch } from "@/types/watch";
// import { toast } from "react-toastify";

// export default function WatchDetailsPage() {
//     const params = useParams();
//     const router = useRouter();
//     const id = params.id as string;
//     const { data: session } = useSession();

//     const [watch, setWatch] = useState<Watch | null>(null);
//     const [activeIndex, setActiveIndex] = useState(0);
//     const [buying, setBuying] = useState(false);
//     const [buyQuantity, setBuyQuantity] = useState(1);

//     useEffect(() => {
//         async function fetchData() {
//             const data = await getWatchById(id);
//             if (data) {
//                 const rawQuantity: unknown = data.quantity;
//                 let parsedQuantity = 0;

//                 if (typeof rawQuantity === "number") {
//                     parsedQuantity = rawQuantity;
//                 } else if (typeof rawQuantity === "string") {
//                     parsedQuantity = parseInt(rawQuantity, 10);
//                 } else if (rawQuantity && typeof rawQuantity === "object") {
//                     const qObj = rawQuantity as Record<string, unknown>;
//                     const val = qObj.$numberInt ?? qObj.Value ?? qObj.value ?? 0;
//                     parsedQuantity = Number(val);
//                 }

//                 if (isNaN(parsedQuantity)) parsedQuantity = 0;

//                 setWatch({
//                     ...data,
//                     quantity: parsedQuantity,
//                     price: Number(data.price) || 0,
//                 });
//             }
//         }
//         fetchData();
//     }, [id]);

//     if (!watch) return null;

//     const images =
//         watch.images && watch.images.length > 0
//             ? watch.images
//             : ["https://via.placeholder.com/600x600.png?text=No+Image"];

//     const nextImage = () => setActiveIndex((prev) => (prev + 1) % images.length);
//     const prevImage = () => setActiveIndex((prev) => (prev - 1 + images.length) % images.length);

//     const currentQuantity = Number(watch.quantity) || 0;
//     const currentPrice = Number(watch.price) || 0;

//     const isOwnListing = !!session && !!watch.ownerId && session.user.id === watch.ownerId;
//     const isSoldOut = currentQuantity <= 0;

//     async function handleBuy() {
//         if (!session) {
//             toast.error("Please sign in to purchase.");
//             router.push("/login");
//             return;
//         }

//         const confirmed = window.confirm(
//             `Confirm purchase of ${buyQuantity} x ${watch!.title} for $${(currentPrice * buyQuantity).toLocaleString()}?`
//         );
//         if (!confirmed) return;

//         setBuying(true);
//         try {
//             await buyWatch(watch!._id, {
//                 buyerId: session.user.id,
//                 buyerName: session.user.name || "",
//                 buyerEmail: session.user.email || "",
//                 quantity: buyQuantity,
//             });
//             toast.success("Purchase successful!");
//             setWatch({ ...watch!, quantity: currentQuantity - buyQuantity });
//             setBuyQuantity(1);
//         } catch (err) {
//             const message = err instanceof Error ? err.message : "Purchase failed. Try again.";
//             toast.error(message);
//         } finally {
//             setBuying(false);
//         }
//     }

//     return (
//         <div className="max-w-7xl mx-auto px-6 py-12">
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
//                 {/* Media Slider */}
//                 <div>
//                     <div className="relative w-full h-[450px] bg-slate rounded-t-2xl overflow-hidden border border-gold/20">
//                         <Image
//                             src={images[activeIndex]}
//                             alt={watch.title}
//                             fill
//                             sizes="(max-width: 1024px) 100vw, 50vw"
//                             className="object-cover transition-opacity duration-500"
//                         />

//                         {images.length > 1 && (
//                             <>
//                                 <button
//                                     onClick={prevImage}
//                                     className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-charcoal/70 border border-gold/40 text-gold hover:bg-gold hover:text-charcoal transition-all"
//                                     aria-label="Previous image"
//                                 >
//                                     <ChevronLeft className="w-5 h-5" />
//                                 </button>
//                                 <button
//                                     onClick={nextImage}
//                                     className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-charcoal/70 border border-gold/40 text-gold hover:bg-gold hover:text-charcoal transition-all"
//                                     aria-label="Next image"
//                                 >
//                                     <ChevronRight className="w-5 h-5" />
//                                 </button>
//                             </>
//                         )}
//                     </div>

//                     {images.length > 1 && (
//                         <div className="flex gap-3 mt-4">
//                             {images.map((img, index) => (
//                                 <button
//                                     key={index}
//                                     onClick={() => setActiveIndex(index)}
//                                     className={`relative w-20 h-20 rounded-sm overflow-hidden border transition-all ${activeIndex === index
//                                         ? "border-gold"
//                                         : "border-gold/20 opacity-60 hover:opacity-100"
//                                         }`}
//                                 >
//                                     <Image src={img} alt={`${watch.title} ${index + 1}`} fill sizes="80px" className="object-cover" />
//                                 </button>
//                             ))}
//                         </div>
//                     )}
//                 </div>

//                 {/* Overview */}
//                 <div>
//                     <p className="font-body text-sm text-gold uppercase tracking-widest mb-2">
//                         {watch.brand}
//                     </p>
//                     <h1 className="font-display text-4xl text-ivory mb-4">
//                         {watch.title}
//                     </h1>
//                     <p className="font-body text-ivory/60 mb-6">{watch.tagline}</p>

//                     <div className="h-px bg-gold/20 mb-6" />

//                     <div className="flex items-center justify-between mb-8">
//                         <span className="font-display text-3xl text-gold">
//                             ${currentPrice.toLocaleString()}
//                         </span>
//                         <span className="font-body text-sm px-3 py-1 rounded-sm border border-gold/40 text-ivory/80">
//                             {watch.condition}
//                         </span>
//                     </div>

//                     {isOwnListing ? (
//                         <button
//                             disabled
//                             className="w-full py-3 rounded-sm bg-slate border border-gold/20 text-ivory/40 font-body text-sm mb-10 cursor-not-allowed"
//                         >
//                             This is your listing
//                         </button>
//                     ) : isSoldOut ? (
//                         <button
//                             disabled
//                             className="w-full py-3 rounded-sm bg-slate border border-gold/20 text-ivory/40 font-body text-sm mb-10 cursor-not-allowed"
//                         >
//                             Sold Out
//                         </button>
//                     ) : (
//                         <>
//                             <div className="flex items-center gap-4 mb-4">
//                                 <span className="font-body text-sm text-ivory/60">Quantity:</span>
//                                 <div className="flex items-center gap-3">
//                                     <button
//                                         onClick={() => setBuyQuantity((q) => Math.max(1, q - 1))}
//                                         className="w-8 h-8 border border-gold/30 rounded-sm text-gold hover:bg-gold/10 transition-colors"
//                                     >
//                                         −
//                                     </button>
//                                     <span className="font-body text-ivory w-6 text-center">{buyQuantity.toString()}</span>
//                                     <button
//                                         onClick={() => setBuyQuantity((q) => Math.min(currentQuantity, q + 1))}
//                                         className="w-8 h-8 border border-gold/30 rounded-sm text-gold hover:bg-gold/10 transition-colors"
//                                     >
//                                         +
//                                     </button>
//                                 </div>
//                                 <span className="font-body text-xs text-ivory/40">
//                                     ({currentQuantity} available)
//                                 </span>
//                             </div>

//                             <button
//                                 onClick={handleBuy}
//                                 disabled={buying}
//                                 className="w-full py-3 rounded-sm bg-gold text-charcoal font-body text-sm font-medium hover:bg-gold-dark transition-all duration-300 mb-10 disabled:opacity-50"
//                             >
//                                 {buying ? "Processing..." : `Buy Now — $${(currentPrice * buyQuantity).toLocaleString()}`}
//                             </button>
//                         </>
//                     )}

//                     {/* Specifications Grid */}
//                     <h2 className="font-display text-xl text-ivory mb-4">
//                         Specifications
//                     </h2>
//                     <div className="grid grid-cols-2 gap-4">
//                         <SpecItem label="Model Year" value={String(watch.modelYear)} />
//                         <SpecItem label="Movement" value={watch.movement} />
//                         <SpecItem label="Caliber" value={watch.caliber} />
//                         <SpecItem label="Case Size" value={watch.caseSize} />
//                         <SpecItem label="Dial Color" value={watch.dialColor} />
//                         <SpecItem label="Water Resistance" value={watch.waterResistance} />
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// function SpecItem({ label, value }: { label: string; value: string }) {
//     return (
//         <div className="bg-slate/50 border border-gold/10 rounded-sm p-4">
//             <p className="font-body text-xs text-ivory/40 uppercase tracking-wide mb-1">
//                 {label}
//             </p>
//             <p className="font-body text-sm text-ivory">{value}</p>
//         </div>
//     );
// }

//2

"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getWatchById, buyWatch } from "@/lib/api";
import { useSession } from "@/lib/auth-client";
import { Watch } from "@/types/watch";
import { toast } from "react-toastify";

export default function WatchDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;
    const { data: session } = useSession();

    const [watch, setWatch] = useState<Watch | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeIndex, setActiveIndex] = useState(0);
    const [buying, setBuying] = useState(false);
    const [buyQuantity, setBuyQuantity] = useState(1);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            const data = await getWatchById(id);
            if (data) {
                const rawQuantity: unknown = data.quantity;
                let parsedQuantity = 0;

                if (typeof rawQuantity === "number") {
                    parsedQuantity = rawQuantity;
                } else if (typeof rawQuantity === "string") {
                    parsedQuantity = parseInt(rawQuantity, 10);
                } else if (rawQuantity && typeof rawQuantity === "object") {
                    const qObj = rawQuantity as Record<string, unknown>;
                    const val = qObj.$numberInt ?? qObj.Value ?? qObj.value ?? 0;
                    parsedQuantity = Number(val);
                }

                if (isNaN(parsedQuantity)) parsedQuantity = 0;

                setWatch({
                    ...data,
                    quantity: parsedQuantity,
                    price: Number(data.price) || 0,
                });
            }
            setLoading(false);
        }
        fetchData();
    }, [id]);

    if (loading) {
        return <WatchDetailsLoader />;
    }

    if (!watch) return null;

    const images =
        watch.images && watch.images.length > 0
            ? watch.images
            : ["https://via.placeholder.com/600x600.png?text=No+Image"];

    const nextImage = () => setActiveIndex((prev) => (prev + 1) % images.length);
    const prevImage = () => setActiveIndex((prev) => (prev - 1 + images.length) % images.length);

    const currentQuantity = Number(watch.quantity) || 0;
    const currentPrice = Number(watch.price) || 0;

    const isOwnListing = !!session && !!watch.ownerId && session.user.id === watch.ownerId;
    const isSoldOut = currentQuantity <= 0;

    async function handleBuy() {
        if (!session) {
            toast.error("Please sign in to purchase.");
            router.push("/login");
            return;
        }

        const confirmed = window.confirm(
            `Confirm purchase of ${buyQuantity} x ${watch!.title} for $${(currentPrice * buyQuantity).toLocaleString()}?`
        );
        if (!confirmed) return;

        setBuying(true);
        try {
            await buyWatch(watch!._id, {
                buyerId: session.user.id,
                buyerName: session.user.name || "",
                buyerEmail: session.user.email || "",
                quantity: buyQuantity,
            });
            toast.success("Purchase successful!");
            setWatch({ ...watch!, quantity: currentQuantity - buyQuantity });
            setBuyQuantity(1);
        } catch (err) {
            const message = err instanceof Error ? err.message : "Purchase failed. Try again.";
            toast.error(message);
        } finally {
            setBuying(false);
        }
    }

    return (
        <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Media Slider */}
                <div>
                    <div className="relative w-full h-[450px] bg-slate rounded-t-2xl overflow-hidden border border-gold/20">
                        <Image
                            src={images[activeIndex]}
                            alt={watch.title}
                            fill
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            className="object-cover transition-opacity duration-500"
                        />

                        {images.length > 1 && (
                            <>
                                <button
                                    onClick={prevImage}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-charcoal/70 border border-gold/40 text-gold hover:bg-gold hover:text-charcoal transition-all"
                                    aria-label="Previous image"
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={nextImage}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-charcoal/70 border border-gold/40 text-gold hover:bg-gold hover:text-charcoal transition-all"
                                    aria-label="Next image"
                                >
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </>
                        )}
                    </div>

                    {images.length > 1 && (
                        <div className="flex gap-3 mt-4">
                            {images.map((img, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveIndex(index)}
                                    className={`relative w-20 h-20 rounded-sm overflow-hidden border transition-all ${activeIndex === index
                                            ? "border-gold"
                                            : "border-gold/20 opacity-60 hover:opacity-100"
                                        }`}
                                >
                                    <Image src={img} alt={`${watch.title} ${index + 1}`} fill sizes="80px" className="object-cover" />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Overview */}
                <div>
                    <p className="font-body text-sm text-gold uppercase tracking-widest mb-2">
                        {watch.brand}
                    </p>
                    <h1 className="font-display text-4xl text-ivory mb-4">
                        {watch.title}
                    </h1>
                    <p className="font-body text-ivory/60 mb-6">{watch.tagline}</p>

                    <div className="h-px bg-gold/20 mb-6" />

                    <div className="flex items-center justify-between mb-8">
                        <span className="font-display text-3xl text-gold">
                            ${currentPrice.toLocaleString()}
                        </span>
                        <span className="font-body text-sm px-3 py-1 rounded-sm border border-gold/40 text-ivory/80">
                            {watch.condition}
                        </span>
                    </div>

                    {isOwnListing ? (
                        <button
                            disabled
                            className="w-full py-3 rounded-sm bg-slate border border-gold/20 text-ivory/40 font-body text-sm mb-10 cursor-not-allowed"
                        >
                            This is your listing
                        </button>
                    ) : isSoldOut ? (
                        <button
                            disabled
                            className="w-full py-3 rounded-sm bg-slate border border-gold/20 text-ivory/40 font-body text-sm mb-10 cursor-not-allowed"
                        >
                            Sold Out
                        </button>
                    ) : (
                        <>
                            <div className="flex items-center gap-4 mb-4">
                                <span className="font-body text-sm text-ivory/60">Quantity:</span>
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => setBuyQuantity((q) => Math.max(1, q - 1))}
                                        className="w-8 h-8 border border-gold/30 rounded-sm text-gold hover:bg-gold/10 transition-colors"
                                    >
                                        −
                                    </button>
                                    <span className="font-body text-ivory w-6 text-center">{buyQuantity.toString()}</span>
                                    <button
                                        onClick={() => setBuyQuantity((q) => Math.min(currentQuantity, q + 1))}
                                        className="w-8 h-8 border border-gold/30 rounded-sm text-gold hover:bg-gold/10 transition-colors"
                                    >
                                        +
                                    </button>
                                </div>
                                <span className="font-body text-xs text-ivory/40">
                                    ({currentQuantity} available)
                                </span>
                            </div>

                            <button
                                onClick={handleBuy}
                                disabled={buying}
                                className="w-full py-3 rounded-sm bg-gold text-charcoal font-body text-sm font-medium hover:bg-gold-dark transition-all duration-300 mb-10 disabled:opacity-50"
                            >
                                {buying ? "Processing..." : `Buy Now — $${(currentPrice * buyQuantity).toLocaleString()}`}
                            </button>
                        </>
                    )}

                    {/* Specifications Grid */}
                    <h2 className="font-display text-xl text-ivory mb-4">
                        Specifications
                    </h2>
                    <div className="grid grid-cols-2 gap-4">
                        <SpecItem label="Model Year" value={String(watch.modelYear)} />
                        <SpecItem label="Movement" value={watch.movement} />
                        <SpecItem label="Caliber" value={watch.caliber} />
                        <SpecItem label="Case Size" value={watch.caseSize} />
                        <SpecItem label="Dial Color" value={watch.dialColor} />
                        <SpecItem label="Water Resistance" value={watch.waterResistance} />
                    </div>
                </div>
            </div>
        </div>
    );
}

function SpecItem({ label, value }: { label: string; value: string }) {
    return (
        <div className="bg-slate/50 border border-gold/10 rounded-sm p-4">
            <p className="font-body text-xs text-ivory/40 uppercase tracking-wide mb-1">
                {label}
            </p>
            <p className="font-body text-sm text-ivory">{value}</p>
        </div>
    );
}

function WatchDetailsLoader() {
    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center px-6">
            <div className="relative w-16 h-16 mb-6">
                <div className="absolute inset-0 rounded-full border-2 border-gold/20" />
                <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-gold animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <svg
                        className="w-6 h-6 text-gold"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                    >
                        <circle cx="12" cy="12" r="7" />
                        <path d="M12 9v3l2 1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M9 3h6M9 21h6" strokeLinecap="round" />
                    </svg>
                </div>
            </div>

            <p className="font-display text-lg text-ivory mb-1">
                Loading Timepiece
            </p>
            <p className="font-body text-xs text-ivory/40 tracking-widest uppercase">
                Please wait a moment
            </p>
        </div>
    );
}