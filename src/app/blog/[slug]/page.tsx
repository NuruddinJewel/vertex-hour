import Link from "next/link";
import Image from "next/image";
import { blogPosts } from "@/lib/blogData";

export default function BlogPage() {
    return (
        <div className="max-w-6xl mx-auto px-6 py-16">
            <div className="text-center mb-14">
                <h1 className="font-display text-4xl text-ivory mb-3">
                    The <span className="text-gold">Editorial</span>
                </h1>
                <p className="font-body text-sm text-ivory/50 max-w-lg mx-auto">
                    Insights, guides, and stories from the world of fine horology
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {blogPosts.map((post) => (
                    <Link
                        key={post.slug}
                        href={`/blog/${post.slug}`}
                        className="group bg-slate border border-gold/20 rounded-t-2xl overflow-hidden hover:border-gold/50 transition-all duration-300"
                    >
                        <div className="relative w-full h-48">
                            <Image
                                src={post.image}
                                alt={post.title}
                                fill
                                sizes="(max-width: 768px) 100vw, 33vw"
                                className="object-cover"
                            />
                        </div>
                        <div className="p-6">
                            <span className="font-body text-xs text-gold uppercase tracking-widest">
                                {post.category}
                            </span>
                            <h2 className="font-display text-xl text-ivory mt-2 mb-3 group-hover:text-gold transition-colors">
                                {post.title}
                            </h2>
                            <p className="font-body text-sm text-ivory/50 leading-relaxed mb-4">
                                {post.excerpt}
                            </p>
                            <p className="font-body text-xs text-ivory/40">
                                {new Date(post.date).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}