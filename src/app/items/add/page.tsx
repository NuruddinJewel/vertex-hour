"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { addWatch } from "@/lib/api";
import { toast } from "react-toastify";
import { Watch as WatchIcon } from "lucide-react";

export default function AddWatchPage() {
    const router = useRouter();
    const { data: session, isPending } = useSession();

    const [formData, setFormData] = useState({
        title: "",
        brand: "",
        modelYear: "",
        price: "",
        quantity: "1",
        condition: "Mint",
        movement: "Automatic",
        caliber: "",
        caseSize: "",
        dialColor: "",
        waterResistance: "",
        tagline: "",
    });

    const [imageInputs, setImageInputs] = useState<string[]>([""]);
    const [loading, setLoading] = useState(false);

    function handleChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    function handleImageChange(index: number, value: string) {
        const updated = [...imageInputs];
        updated[index] = value;
        setImageInputs(updated);
    }

    function addImageField() {
        setImageInputs([...imageInputs, ""]);
    }

    function removeImageField(index: number) {
        setImageInputs(imageInputs.filter((_, i) => i !== index));
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!session) {
            toast.error("You must be signed in to add a watch.");
            return;
        }

        setLoading(true);

        try {
            const filteredImages = imageInputs.filter((url) => url.trim() !== "");

            await addWatch({
                title: formData.title,
                brand: formData.brand,
                modelYear: Number(formData.modelYear),
                price: Number(formData.price),
                quantity: Number(formData.quantity),
                condition: formData.condition,
                movement: formData.movement as "Automatic" | "Manual",
                caliber: formData.caliber,
                caseSize: formData.caseSize,
                dialColor: formData.dialColor,
                waterResistance: formData.waterResistance,
                tagline: formData.tagline,
                images: filteredImages,
                ownerId: session.user.id,
            });

            toast.success("Watch listed successfully!");
            router.push("/items/manage");
        } catch (err) {
            toast.error("Failed to add watch. Try again.");
        } finally {
            setLoading(false);
        }
    }

    if (isPending) return null;

    if (!session) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center px-6">
                <p className="font-body text-ivory/60">
                    Please sign in to list a watch.
                </p>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto px-6 py-16">
            <div className="flex flex-col items-center mb-10">
                <WatchIcon className="w-8 h-8 text-gold mb-3" strokeWidth={1.5} />
                <h1 className="font-display text-3xl text-ivory">
                    List a New <span className="text-gold">Timepiece</span>
                </h1>
                <p className="font-body text-sm text-ivory/40 mt-2">
                    Provide accurate details to attract serious collectors
                </p>
            </div>

            <form
                onSubmit={handleSubmit}
                className="bg-slate border border-gold/20 rounded-t-2xl p-8 shadow-md space-y-6"
            >
                {/* Title & Brand */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <FormField
                        label="Title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Rolex Submariner Date"
                        required
                    />
                    <FormField
                        label="Brand"
                        name="brand"
                        value={formData.brand}
                        onChange={handleChange}
                        placeholder="Rolex"
                        required
                    />
                </div>

                {/* Model Year & Price */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <FormField
                        label="Model Year"
                        name="modelYear"
                        type="number"
                        value={formData.modelYear}
                        onChange={handleChange}
                        placeholder="2023"
                        required
                    />
                    <FormField
                        label="Price (USD)"
                        name="price"
                        type="number"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="14500"
                        required
                    />
                </div>

                {/* Quantity & Condition */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <FormField
                        label="Quantity Available"
                        name="quantity"
                        type="number"
                        value={formData.quantity}
                        onChange={handleChange}
                        placeholder="1"
                        required
                    />
                    <div>
                        <label className="font-body text-xs text-ivory/50 uppercase tracking-wide mb-2 block">
                            Condition
                        </label>
                        <select
                            name="condition"
                            value={formData.condition}
                            onChange={handleChange}
                            className="w-full bg-charcoal border border-gold/20 rounded-sm px-4 py-3 text-ivory text-sm focus:outline-none focus:border-gold transition-colors"
                        >
                            <option value="Mint">Mint</option>
                            <option value="Excellent">Excellent</option>
                            <option value="Good">Good</option>
                        </select>
                    </div>
                </div>

                {/* Movement */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                        <label className="font-body text-xs text-ivory/50 uppercase tracking-wide mb-2 block">
                            Movement
                        </label>
                        <select
                            name="movement"
                            value={formData.movement}
                            onChange={handleChange}
                            className="w-full bg-charcoal border border-gold/20 rounded-sm px-4 py-3 text-ivory text-sm focus:outline-none focus:border-gold transition-colors"
                        >
                            <option value="Automatic">Automatic</option>
                            <option value="Manual">Manual</option>
                        </select>
                    </div>
                    <FormField
                        label="Caliber"
                        name="caliber"
                        value={formData.caliber}
                        onChange={handleChange}
                        placeholder="3235"
                    />
                </div>

                {/* Case Size & Dial Color */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <FormField
                        label="Case Size"
                        name="caseSize"
                        value={formData.caseSize}
                        onChange={handleChange}
                        placeholder="41mm"
                    />
                    <FormField
                        label="Dial Color"
                        name="dialColor"
                        value={formData.dialColor}
                        onChange={handleChange}
                        placeholder="Black"
                    />
                </div>

                {/* Water Resistance */}
                <FormField
                    label="Water Resistance"
                    name="waterResistance"
                    value={formData.waterResistance}
                    onChange={handleChange}
                    placeholder="300m"
                />

                {/* Tagline */}
                <div>
                    <label className="font-body text-xs text-ivory/50 uppercase tracking-wide mb-2 block">
                        Tagline
                    </label>
                    <textarea
                        name="tagline"
                        value={formData.tagline}
                        onChange={handleChange}
                        rows={2}
                        placeholder="A short, compelling description of the watch"
                        className="w-full bg-charcoal border border-gold/20 rounded-sm px-4 py-3 text-ivory text-sm placeholder:text-ivory/30 focus:outline-none focus:border-gold transition-colors resize-none"
                    />
                </div>

                {/* Image URLs */}
                <div>
                    <label className="font-body text-xs text-ivory/50 uppercase tracking-wide mb-2 block">
                        Image URLs (multiple angles)
                    </label>
                    <div className="space-y-3">
                        {imageInputs.map((url, index) => (
                            <div key={index} className="flex gap-3">
                                <input
                                    type="url"
                                    value={url}
                                    onChange={(e) => handleImageChange(index, e.target.value)}
                                    placeholder="https://example.com/watch-front.jpg"
                                    className="flex-1 bg-charcoal border border-gold/20 rounded-sm px-4 py-3 text-ivory text-sm placeholder:text-ivory/30 focus:outline-none focus:border-gold transition-colors"
                                />
                                {imageInputs.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeImageField(index)}
                                        className="px-4 rounded-sm border border-gold/20 text-ivory/50 hover:text-gold hover:border-gold transition-colors"
                                    >
                                        ✕
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                    <button
                        type="button"
                        onClick={addImageField}
                        className="mt-3 font-body text-xs text-gold hover:underline"
                    >
                        + Add another image
                    </button>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 rounded-sm bg-gold text-charcoal font-body text-sm font-medium hover:bg-gold-dark transition-all duration-300 disabled:opacity-50"
                >
                    {loading ? "Listing..." : "List This Watch"}
                </button>
            </form>
        </div>
    );
}

function FormField({
    label,
    name,
    value,
    onChange,
    placeholder,
    type = "text",
    required = false,
}: {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    type?: string;
    required?: boolean;
}) {
    return (
        <div>
            <label className="font-body text-xs text-ivory/50 uppercase tracking-wide mb-2 block">
                {label}
            </label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                className="w-full bg-charcoal border border-gold/20 rounded-sm px-4 py-3 text-ivory text-sm placeholder:text-ivory/30 focus:outline-none focus:border-gold transition-colors"
            />
        </div>
    );
}