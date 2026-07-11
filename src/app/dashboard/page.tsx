"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";

export default function DashboardRedirectPage() {
    const router = useRouter();
    const { data: session, isPending } = useSession();

    useEffect(() => {
        if (isPending) return;
        if (!session) {
            router.push("/login");
            return;
        }
        if (session.user.role === "admin") {
            router.push("/dashboard/admin");
        } else {
            router.push("/dashboard/user");
        }
    }, [session, isPending, router]);

    return null;
}