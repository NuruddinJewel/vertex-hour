// "use client";

// import { useSession } from "@/lib/auth-client";
// import { User, Mail, Shield } from "lucide-react";

// export default function ProfilePage() {
//     const { data: session, isPending } = useSession();

//     if (isPending) return null;

//     if (!session) {
//         return (
//             <div className="min-h-[60vh] flex items-center justify-center px-6">
//                 <p className="font-body text-ivory/60">Please sign in to view your profile.</p>
//             </div>
//         );
//     }

//     return (
//         <div className="max-w-2xl mx-auto px-6 py-16">
//             <div className="flex flex-col items-center mb-10">
//                 <div className="w-20 h-20 rounded-full bg-slate border border-gold/40 flex items-center justify-center text-gold font-display text-3xl mb-4">
//                     {session.user.name?.charAt(0).toUpperCase() || "U"}
//                 </div>
//                 <h1 className="font-display text-2xl text-ivory">{session.user.name}</h1>
//                 <p className="font-body text-sm text-ivory/40">{session.user.email}</p>
//             </div>

//             <div className="bg-slate border border-gold/20 rounded-t-2xl p-8 space-y-6">
//                 <ProfileRow icon={User} label="Full Name" value={session.user.name || "—"} />
//                 <ProfileRow icon={Mail} label="Email" value={session.user.email || "—"} />
//                 <ProfileRow icon={Shield} label="Role" value={session.user.role || "user"} />
//             </div>
//         </div>
//     );
// }

// function ProfileRow({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
//     return (
//         <div className="flex items-center gap-4">
//             <Icon className="w-5 h-5 text-gold" strokeWidth={1.5} />
//             <div>
//                 <p className="font-body text-xs text-ivory/40 uppercase tracking-wide">{label}</p>
//                 <p className="font-body text-sm text-ivory">{value}</p>
//             </div>
//         </div>
//     );
// }

"use client";

import { useSession } from "@/lib/auth-client";
import { User, Mail, Shield, LucideIcon } from "lucide-react";

export default function ProfilePage() {
    const { data: session, isPending } = useSession();

    if (isPending) return null;

    if (!session) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center px-6">
                <p className="font-body text-ivory/60">Please sign in to view your profile.</p>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto px-6 py-16">
            <div className="flex flex-col items-center mb-10">
                <div className="w-20 h-20 rounded-full bg-slate border border-gold/40 flex items-center justify-center text-gold font-display text-3xl mb-4">
                    {session.user.name?.charAt(0).toUpperCase() || "U"}
                </div>
                <h1 className="font-display text-2xl text-ivory">{session.user.name}</h1>
                <p className="font-body text-sm text-ivory/40">{session.user.email}</p>
            </div>

            <div className="bg-slate border border-gold/20 rounded-t-2xl p-8 space-y-6">
                <ProfileRow icon={User} label="Full Name" value={session.user.name || "—"} />
                <ProfileRow icon={Mail} label="Email" value={session.user.email || "—"} />
                <ProfileRow icon={Shield} label="Role" value={session.user.role || "user"} />
            </div>
        </div>
    );
}

function ProfileRow({
    icon: Icon,
    label,
    value,
}: {
    icon: LucideIcon;
    label: string;
    value: string;
}) {
    return (
        <div className="flex items-center gap-4">
            <Icon className="w-5 h-5 text-gold" strokeWidth={1.5} />
            <div>
                <p className="font-body text-xs text-ivory/40 uppercase tracking-wide">{label}</p>
                <p className="font-body text-sm text-ivory">{value}</p>
            </div>
        </div>
    );
}