export default function Loading() {
    return (
        <div className="max-w-7xl mx-auto px-6 py-12 animate-pulse">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Media Slider Skeleton */}
                <div>
                    <div className="w-full h-[450px] bg-slate rounded-t-2xl border border-gold/10" />
                    <div className="flex gap-3 mt-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div
                                key={i}
                                className="w-20 h-20 rounded-sm bg-slate border border-gold/10"
                            />
                        ))}
                    </div>
                </div>

                {/* Overview Skeleton */}
                <div>
                    <div className="h-3 w-20 bg-gold/20 rounded-sm mb-3" />
                    <div className="h-9 w-3/4 bg-slate rounded-sm mb-4" />
                    <div className="h-4 w-full bg-slate rounded-sm mb-2" />
                    <div className="h-4 w-2/3 bg-slate rounded-sm mb-6" />

                    <div className="h-px bg-gold/10 mb-6" />

                    <div className="flex items-center justify-between mb-8">
                        <div className="h-8 w-32 bg-gold/20 rounded-sm" />
                        <div className="h-6 w-20 bg-slate rounded-sm border border-gold/10" />
                    </div>

                    <div className="h-12 w-full bg-slate rounded-sm border border-gold/10 mb-10" />

                    <div className="h-6 w-40 bg-slate rounded-sm mb-4" />
                    <div className="grid grid-cols-2 gap-4">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div
                                key={i}
                                className="h-16 bg-slate/50 border border-gold/10 rounded-sm"
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}