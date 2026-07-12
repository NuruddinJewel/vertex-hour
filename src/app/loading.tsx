export default function RootLoading() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-charcoal">
            <div className="relative w-16 h-16 mb-6">
                <div className="absolute inset-0 rounded-full border-2 border-gold/20" />
                <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-gold animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <svg
                        className="w-6 h-6 text-gold"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                    >
                        <circle cx="12" cy="12" r="7" />
                        <path d="M12 9v3l2 1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M9 3h6M9 21h6" strokeLinecap="round" />
                    </svg>
                </div>
            </div>
            <p className="font-display text-xl text-ivory mb-1">
                Horology<span className="text-gold"> Vault</span>
            </p>
            <p className="font-body text-xs text-ivory/40 tracking-widest uppercase">
                Opening the Vault
            </p>
        </div>
    );
}