"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Watch, Mail, Lock } from "lucide-react";
import { signIn } from "@/lib/auth-client";
import { toast } from "react-toastify";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleLogin(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);

        const { error } = await signIn.email({
            email,
            password,
        });

        setLoading(false);

        if (error) {
            toast.error(error.message || "Login failed. Check your credentials.");
            return;
        }

        toast.success("Welcome back!");
        router.push("/dashboard");
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-charcoal px-6 py-16">
            <div className="w-full max-w-md">
                <div className="flex flex-col items-center mb-10">
                    <Watch className="w-8 h-8 text-gold mb-3" strokeWidth={1.5} />
                    <h1 className="font-display text-3xl text-ivory">
                        Horology<span className="text-gold"> Vault</span>
                    </h1>
                    <p className="font-body text-sm text-ivory/40 mt-2">
                        Sign in to your collection
                    </p>
                </div>

                <div className="bg-slate border border-gold/20 rounded-t-2xl p-8 shadow-md">
                    <form onSubmit={handleLogin} className="space-y-5">
                        <div>
                            <label className="font-body text-xs text-ivory/50 uppercase tracking-wide mb-2 block">
                                Email
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gold/60" />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@example.com"
                                    className="w-full bg-charcoal border border-gold/20 rounded-sm pl-10 pr-4 py-3 text-ivory text-sm placeholder:text-ivory/30 focus:outline-none focus:border-gold transition-colors"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="font-body text-xs text-ivory/50 uppercase tracking-wide mb-2 block">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gold/60" />
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full bg-charcoal border border-gold/20 rounded-sm pl-10 pr-4 py-3 text-ivory text-sm placeholder:text-ivory/30 focus:outline-none focus:border-gold transition-colors"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 rounded-sm bg-gold text-charcoal font-body text-sm font-medium hover:bg-gold-dark transition-all duration-300 disabled:opacity-50"
                        >
                            {loading ? "Signing In..." : "Sign In"}
                        </button>
                    </form>

                    <div className="flex items-center gap-3 my-6">
                        <div className="h-px bg-gold/20 flex-1" />
                        <span className="font-body text-xs text-ivory/30">OR</span>
                        <div className="h-px bg-gold/20 flex-1" />
                    </div>

                    <button
                        onClick={() => signIn.social({ provider: "google" })}
                        className="w-full py-3 rounded-sm border border-gold/30 text-ivory/80 font-body text-sm hover:border-gold hover:text-gold transition-all duration-300"
                    >
                        Continue with Google
                    </button>
                </div>

                <p className="text-center font-body text-sm text-ivory/50 mt-6">
                    Don&apos;t have an account?{" "}
                    <Link href="/register" className="text-gold hover:underline">
                        Create one
                    </Link>
                </p>
            </div>
        </div>
    );
}