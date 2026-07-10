import { Watch } from "@/types/watch";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getAllWatches(): Promise<Watch[]> {
    const res = await fetch(`${API_URL}/api/watches`, {
        cache: "no-store", // always fresh data (change to "force-cache" later for performance)
    });

    if (!res.ok) {
        throw new Error("Failed to fetch watches");
    }

    return res.json();
}

export async function getWatchById(id: string): Promise<Watch> {
    const res = await fetch(`${API_URL}/api/watches/${id}`, {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Failed to fetch watch");
    }

    return res.json();
}