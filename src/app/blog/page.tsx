// import Image from "next/image";
// import Link from "next/link";
// import { notFound } from "next/navigation";
// import { ArrowLeft } from "lucide-react";
// import { blogPosts } from "@/lib/blogData";

// interface BlogDetailsPageProps {
//     params: { slug: string };
// }

// export default function BlogDetailsPage({ params }: BlogDetailsPageProps) {
//     const post = blogPosts.find((p) => p.slug === params.slug);

//     if (!post) {
//         notFound();
//     }

//     return (
//         <div className="max-w-3xl mx-auto px-6 py-16">
//             <Link
//                 href="/blog"
//                 className="inline-flex items-center gap-2 font-body text-sm text-gold hover:underline mb-8"
//             >
//                 <ArrowLeft className="w-4 h-4" />
//                 Back to Editorial
//             </Link>

//             <span className="font-body text-xs text-gold uppercase tracking-widest">
//                 {post.category}
//             </span>
//             <h1 className="font-display text-4xl text-ivory mt-3 mb-4">
//                 {post.title}
//             </h1>

//             <div className="flex items-center gap-3 text-xs text-ivory/40 font-body mb-8">
//                 <span>{post.author}</span>
//                 <span>•</span>
//                 <span>
//                     {new Date(post.date).toLocaleDateString("en-US", {
//                         year: "numeric",
//                         month: "long",
//                         day: "numeric",
//                     })}
//                 </span>
//             </div>

//             <div className="relative w-full h-80 rounded-t-2xl overflow-hidden border border-gold/20 mb-10">
//                 <Image
//                     src={post.image}
//                     alt={post.title}
//                     fill
//                     sizes="(max-width: 768px) 100vw, 768px"
//                     className="object-cover"
//                 />
//             </div>

//             <div className="h-px bg-gold/20 mb-8" />

//             <p className="font-body text-base text-ivory/70 leading-loose">
//                 {post.content}
//             </p>
//         </div>
//     );
// }

// export function generateStaticParams() {
//     return blogPosts.map((post) => ({ slug: post.slug }));
// }
//2
import Link from "next/link";
import { blogPosts } from "@/lib/blogData";

export default function BlogPage() {
    return (
        <div className="min-h-screen bg-charcoal text-ivory px-6 py-16 md:px-12 max-w-7xl mx-auto">
            <header className="mb-12 text-center md:text-left">
                <h1 className="font-display text-4xl md:text-5xl text-ivory tracking-wide">
                    Horology <span className="text-gold">Vault Journal</span>
                </h1>
                <p className="mt-3 font-body text-ivory/60 text-lg max-w-2xl">
                    Discover stories, expert guides, and technical insights from the world of luxury timepieces.
                </p>
            </header>

            {/* Blog Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogPosts.map((post) => (
                    <article
                        key={post.slug}
                        className="bg-slate/40 border border-gold/10 rounded-sm overflow-hidden flex flex-col hover:border-gold/30 transition-all duration-300 group"
                    >
                        {/*Image */}
                        <div className="relative h-48 w-full bg-slate-800 overflow-hidden">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={post.image}
                                alt={post.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <span className="absolute top-3 left-3 bg-charcoal/90 text-gold font-body text-xs px-2.5 py-1 border border-gold/20 rounded-sm">
                                {post.category}
                            </span>
                        </div>

                        {/* Content */}
                        <div className="p-6 flex flex-col flex-grow">
                            <span className="font-body text-xs text-ivory/40 mb-2">{post.date}</span>
                            <h2 className="font-display text-xl text-ivory group-hover:text-gold transition-colors duration-300 line-clamp-2 mb-3">
                                {post.title}
                            </h2>
                            <p className="font-body text-sm text-ivory/70 line-clamp-3 mb-6 flex-grow">
                                {post.excerpt}
                            </p>

                            <Link
                                href={`/blog/${post.slug}`}
                                className="font-body text-sm text-gold inline-flex items-center gap-1 hover:underline mt-auto"
                            >
                                Read Article →
                            </Link>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
}
