export interface BlogPost {
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    author: string;
    date: string;
    image: string;
    category: string;
}

export const blogPosts: BlogPost[] = [
    {
        slug: "art-of-collecting-vintage-watches",
        title: "The Art of Collecting Vintage Timepieces",
        excerpt:
            "A guide to building a meaningful vintage watch collection, from provenance research to condition grading.",
        content:
            "Collecting vintage watches is as much about storytelling as it is about mechanics. Every scratch, patina, and worn crown tells a story of the decades it has survived. Before acquiring a vintage piece, collectors should research the reference number, verify original parts, and understand the difference between a honest patina and later refinishing. Provenance, when available, adds both narrative and value. Start with well-documented references from established houses before venturing into rarer, harder-to-authenticate pieces.",
        author: "Horology Vault Editorial",
        date: "2026-05-12",
        image: "https://via.placeholder.com/800x500.png?text=Vintage+Watches",
        category: "Collecting Guide",
    },
    {
        slug: "understanding-watch-movements",
        title: "Automatic vs Manual: Understanding Watch Movements",
        excerpt:
            "Breaking down the mechanical differences between automatic and manual-winding movements, and what it means for daily wear.",
        content:
            "The heart of any mechanical watch lies in its movement. Automatic movements harness the natural motion of the wrist to wind the mainspring via a rotor, offering convenience for daily wear. Manual movements, by contrast, require regular winding through the crown, a ritual many purists prefer for the tactile connection it offers. Neither is objectively superior; the choice often comes down to lifestyle and personal philosophy toward mechanical craftsmanship.",
        author: "Horology Vault Editorial",
        date: "2026-04-28",
        image: "https://via.placeholder.com/800x500.png?text=Watch+Movements",
        category: "Education",
    },
    {
        slug: "authenticity-verification-guide",
        title: "How We Verify Authenticity: Behind the Process",
        excerpt:
            "An inside look at the multi-point inspection every timepiece undergoes before being listed on Horology Vault.",
        content:
            "Authenticity verification begins with a detailed movement inspection, cross-referencing serial numbers against manufacturer records, and examining case, dial, and bracelet for consistency with the reference period. Certified horologists photograph and document each stage, ensuring buyers receive complete transparency. This process protects both the integrity of the marketplace and the confidence of every collector who transacts here.",
        author: "Horology Vault Editorial",
        date: "2026-03-15",
        image: "https://via.placeholder.com/800x500.png?text=Authenticity+Check",
        category: "Trust & Safety",
    },
];