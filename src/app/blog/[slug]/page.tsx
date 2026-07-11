// import Link from "next/link";
// import Image from "next/image";
// import { blogPosts } from "@/lib/blogData";

// export default function BlogPage() {
//     return (
//         <div className="max-w-6xl mx-auto px-6 py-16">
//             <div className="text-center mb-14">
//                 <h1 className="font-display text-4xl text-ivory mb-3">
//                     The <span className="text-gold">Editorial</span>
//                 </h1>
//                 <p className="font-body text-sm text-ivory/50 max-w-lg mx-auto">
//                     Insights, guides, and stories from the world of fine horology
//                 </p>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//                 {blogPosts.map((post) => (
//                     <Link
//                         key={post.slug}
//                         href={`/blog/${post.slug}`}
//                         className="group bg-slate border border-gold/20 rounded-t-2xl overflow-hidden hover:border-gold/50 transition-all duration-300"
//                     >
//                         <div className="relative w-full h-48">
//                             <Image
//                                 src={post.image}
//                                 alt={post.title}
//                                 fill
//                                 sizes="(max-width: 768px) 100vw, 33vw"
//                                 className="object-cover"
//                             />
//                         </div>
//                         <div className="p-6">
//                             <span className="font-body text-xs text-gold uppercase tracking-widest">
//                                 {post.category}
//                             </span>
//                             <h2 className="font-display text-xl text-ivory mt-2 mb-3 group-hover:text-gold transition-colors">
//                                 {post.title}
//                             </h2>
//                             <p className="font-body text-sm text-ivory/50 leading-relaxed mb-4">
//                                 {post.excerpt}
//                             </p>
//                             <p className="font-body text-xs text-ivory/40">
//                                 {new Date(post.date).toLocaleDateString("en-US", {
//                                     year: "numeric",
//                                     month: "long",
//                                     day: "numeric",
//                                 })}
//                             </p>
//                         </div>
//                     </Link>
//                 ))}
//             </div>
//         </div>
//     );
// }

//2

import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts } from "@/lib/blogData";

interface BlogPostPageProps {
    params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { slug } = await params;

    const post = blogPosts.find((p) => p.slug === slug);

    if (!post) {
        notFound();
    }

    return (
        <article className="min-h-screen bg-charcoal text-ivory px-6 py-16 md:px-12 max-w-4xl mx-auto">
            <Link
                href="/blog"
                className="font-body text-sm text-gold hover:text-ivory transition-colors mb-8 inline-block"
            >
                ← Back to Journal
            </Link>

            <header className="mb-8">
                <span className="bg-gold/10 text-gold border border-gold/20 text-xs px-3 py-1 rounded-sm font-body uppercase tracking-wider">
                    {post.category}
                </span>
                <h1 className="font-display text-3xl md:text-5xl text-ivory mt-4 leading-tight">
                    {post.title}
                </h1>

                <div className="flex items-center gap-4 mt-6 text-xs font-body text-ivory/50 border-y border-gold/10 py-3">
                    <div>By <span className="text-ivory/80">{post.author}</span></div>
                    <div className="w-1 h-1 bg-gold/30 rounded-full" />
                    <div>Published on {post.date}</div>
                </div>
            </header>

            <div className="my-8 rounded-sm overflow-hidden border border-gold/10 h-[300px] md:h-[450px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="font-body text-base md:text-lg text-ivory/85 leading-relaxed space-y-6 max-w-none">
                <p>{post.content}</p>
            </div>
        </article>
    );
}