
// import Link from "next/link";
// import { getAllWatches } from "@/lib/api";
// import WatchCard from "@/components/watches/WatchCard";
// import Testimonials from "@/components/home/Testimonials";
// import FAQSection from "@/components/home/FAQSection";
// import HeroSlider from "@/components/watches/HeroSlider";
// import BrandGrid from "@/components/watches/BrandGrid";
// import AuctionGrid from "@/components/watches/AuctionGrid";
// import StatsTracker from "@/components/watches/StatsTracker";
// import FeaturedWatches from "@/components/watches/FeaturedWatches";

// export default async function Home() {
//   const watches = await getAllWatches();
//   const featuredWatches = watches.slice(0, 4);

//   return (
//     <div>
//       {/* Hero Section */}
//       <section className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6 bg-charcoal">
//         <h1 className="font-display text-5xl md:text-6xl text-ivory mb-4">
//           Welcome to <span className="text-gold">Horology Vault</span>
//         </h1>
//         <p className="font-body text-ivory/60 max-w-xl mb-8">
//           A curated marketplace for collectors of fine, authenticated timepieces.
//         </p>
//         <Link
//           href="/explore"
//           className="px-8 py-3 rounded-sm border border-gold text-gold font-body text-sm hover:bg-gold hover:text-charcoal transition-all duration-300"
//         >
//           Explore Horology Vault
//         </Link>
//       </section>

//       {/* Featured Watches */}
//       <section className="max-w-7xl mx-auto px-6 py-16">
//         <h2 className="font-display text-3xl text-ivory mb-8">
//           Featured <span className="text-gold">Timepieces</span>
//         </h2>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           {featuredWatches.map((watch) => (
//             <WatchCard key={watch._id} watch={watch} />
//           ))}
//         </div>
//       </section>
//       <HeroSlider />
//       <BrandGrid />
//       <AuctionGrid />
//       <StatsTracker />
//       <FeaturedWatches />
//       <Testimonials />
//       <FAQSection />
//     </div>
//   );
// }


import HeroSlider from "@/components/watches/HeroSlider";
import BrandGrid from "@/components/watches/BrandGrid";
import AuctionGrid from "@/components/watches/AuctionGrid";
import StatsTracker from "@/components/watches/StatsTracker";
import FeaturedWatches from "@/components/watches/FeaturedWatches";
import Testimonials from "@/components/home/Testimonials";
import FAQSection from "@/components/home/FAQSection";

export default function Home() {
  return (
    <div>
      <HeroSlider />
      <BrandGrid />
      <FeaturedWatches />
      <AuctionGrid />
      <StatsTracker />
      <Testimonials />
      <FAQSection />
    </div>
  );
}