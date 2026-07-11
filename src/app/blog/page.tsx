import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { blogPosts } from "@/lib/blogData";

interface BlogDetailsPageProps {
    params: { slug: string };
}

export default function BlogDetailsPage({ params }: BlogDetailsPageProps) {
    const post = blogPosts.find((p) => p.slug === params.slug);

    if (!post) {
        notFound();
    }

    return (
        <div className="max-w-3xl mx-auto px-6 py-16">
            <Link
                href="/blog"
                className="inline-flex items-center gap-2 font-body text-sm text-gold hover:underline mb-8"
            >
                <ArrowLeft className="w-4 h-4" />
                Back to Editorial
            </Link>

            <span className="font-body text-xs text-gold uppercase tracking-widest">
                {post.category}
            </span>
            <h1 className="font-display text-4xl text-ivory mt-3 mb-4">
                {post.title}
            </h1>

            <div className="flex items-center gap-3 text-xs text-ivory/40 font-body mb-8">
                <span>{post.author}</span>
                <span>•</span>
                <span>
                    {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    })}
                </span>
            </div>

            <div className="relative w-full h-80 rounded-t-2xl overflow-hidden border border-gold/20 mb-10">
                <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 768px"
                    className="object-cover"
                />
            </div>

            <div className="h-px bg-gold/20 mb-8" />

            <p className="font-body text-base text-ivory/70 leading-loose">
                {post.content}
            </p>
        </div>
    );
}

export function generateStaticParams() {
    return blogPosts.map((post) => ({ slug: post.slug }));
}