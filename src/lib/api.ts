// import { Watch } from "@/types/watch";

// const API_URL = process.env.NEXT_PUBLIC_API_URL;

// export async function getAllWatches(): Promise<Watch[]> {
//     const res = await fetch(`${API_URL}/api/watches`, {
//         cache: "no-store", // always fresh data (change to "force-cache" later for performance)
//     });

//     if (!res.ok) {
//         throw new Error("Failed to fetch watches");
//     }

//     return res.json();
// }

// export async function getWatchById(id: string): Promise<Watch> {
//     const res = await fetch(`${API_URL}/api/watches/${id}`, {
//         cache: "no-store",
//     });

//     if (!res.ok) {
//         throw new Error("Failed to fetch watch");
//     }

//     return res.json();
// }

// export async function addWatch(watchData: Omit<Watch, "_id">) {
//     const res = await fetch(`${API_URL}/api/watches`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(watchData),
//     });

//     if (!res.ok) {
//         throw new Error("Failed to add watch");
//     }

//     return res.json();
// }

// export async function deleteWatch(id: string) {
//     const res = await fetch(`${API_URL}/api/watches/${id}`, {
//         method: "DELETE",
//     });

//     if (!res.ok) {
//         throw new Error("Failed to delete watch");
//     }

//     return res.json();
// }

// export async function getWatchesByOwner(ownerId: string): Promise<Watch[]> {
//     const res = await fetch(`${API_URL}/api/watches?ownerId=${ownerId}`, {
//         cache: "no-store",
//     });
//     if (!res.ok) throw new Error("Failed to fetch owner watches");
//     return res.json();
// }
// //Buy (Initial)
// // export async function buyWatch(
// //     id: string,
// //     buyer: { buyerId: string; buyerName: string; buyerEmail: string }
// // ) {
// //     const res = await fetch(`${API_URL}/api/watches/${id}/buy`, {
// //         method: "PATCH",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify(buyer),
// //     });

// //     if (!res.ok) {
// //         throw new Error("Failed to purchase watch");
// //     }

// //     return res.json();
// // }
// //Buy (Second)
// export async function buyWatch(
//     id: string,
//     buyer: { buyerId: string; buyerName: string; buyerEmail: string; quantity: number }
// ) {
//     const res = await fetch(`${API_URL}/api/watches/${id}/buy`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(buyer),
//     });

//     if (!res.ok) {
//         const errorData = await res.json();
//         throw new Error(errorData.error || "Failed to purchase watch");
//     }

//     return res.json();
// }

// export async function getAllOrders(): Promise<Order[]> {
//     const res = await fetch(`${API_URL}/api/orders`, { cache: "no-store" });
//     if (!res.ok) throw new Error("Failed to fetch orders");
//     return res.json();
// }

// export async function getUserCount(): Promise<number> {
//     const res = await fetch("/api/users/count", { cache: "no-store" });
//     if (!res.ok) return 0;
//     const data = await res.json();
//     return data.count;
// }


import { Watch, Order } from "@/types/watch";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getAllWatches(): Promise<Watch[]> {
    const res = await fetch(`${API_URL}/api/watches`, {
        cache: "no-store",
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

export async function getWatchesByOwner(ownerId: string): Promise<Watch[]> {
    const res = await fetch(`${API_URL}/api/watches?ownerId=${ownerId}`, {
        cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch owner watches");
    return res.json();
}

export async function addWatch(watchData: Omit<Watch, "_id">) {
    const res = await fetch(`${API_URL}/api/watches`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(watchData),
    });

    if (!res.ok) {
        throw new Error("Failed to add watch");
    }

    return res.json();
}

export async function deleteWatch(id: string) {
    const res = await fetch(`${API_URL}/api/watches/${id}`, {
        method: "DELETE",
    });

    if (!res.ok) {
        throw new Error("Failed to delete watch");
    }

    return res.json();
}

export async function buyWatch(
    id: string,
    buyer: { buyerId: string; buyerName: string; buyerEmail: string; quantity: number }
) {
    const res = await fetch(`${API_URL}/api/watches/${id}/buy`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buyer),
    });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to purchase watch");
    }

    return res.json();
}

export async function getAllOrders(): Promise<Order[]> {
    const res = await fetch(`${API_URL}/api/orders`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch orders");
    return res.json();
}

// export async function getUserCount(): Promise<number> {
//     const res = await fetch("/api/users/count", { cache: "no-store" });
//     if (!res.ok) return 0;
//     const data = await res.json();
//     return data.count;
// }
export async function getUserCount(): Promise<number> {
    const res = await fetch(`${API_URL}/api/users/count`, { cache: "no-store" });
    if (!res.ok) return 0;
    const data = await res.json();
    return data.count;
}

// export async function getOrdersByBuyer(buyerId: string) {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/orders?buyerId=${buyerId}`, { cache: "no-store" });
//     if (!res.ok) return [];
//     return res.json();
// }

export async function getOrdersByBuyer(buyerId: string): Promise<Order[]> {
    const res = await fetch(`${API_URL}/api/orders?buyerId=${buyerId}`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch buyer orders");
    return res.json();
}