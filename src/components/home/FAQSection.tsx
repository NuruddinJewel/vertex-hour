"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

interface FAQItem {
    question: string;
    answer: string;
}

const faqs: FAQItem[] = [
    {
        question: "How is the authenticity of each watch verified?",
        answer:
            "Every timepiece listed on Horology Vault undergoes a multi-point authentication process, including movement inspection, serial number cross-referencing, and documentation review by certified horologists before being approved for sale.",
    },
    {
        question: "What is the warranty on purchased watches?",
        answer:
            "All watches include a 12-month authenticity guarantee. Select pieces retain their original manufacturer warranty if the remaining coverage period allows, which will be clearly noted on the listing.",
    },
    {
        question: "How is shipping handled for high-value timepieces?",
        answer:
            "Every order ships fully insured with signature-required delivery. Watches are packaged in tamper-evident, discreet packaging with real-time tracking provided from dispatch to arrival.",
    },
    {
        question: "Can I return a watch after purchase?",
        answer:
            "Yes, a 7-day inspection period is provided from the date of delivery. If the item does not match its listing description, a full refund is issued once the watch is returned in its original condition.",
    },
];

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    function toggle(index: number) {
        setOpenIndex(openIndex === index ? null : index);
    }

    return (
        <section className="max-w-4xl mx-auto px-6 py-16">
            <div className="text-center mb-12">
                <h2 className="font-display text-3xl text-ivory mb-2">
                    Frequently Asked <span className="text-gold">Questions</span>
                </h2>
                <p className="font-body text-sm text-ivory/50">
                    Everything you need to know before acquiring your next piece
                </p>
            </div>

            <div className="space-y-3">
                {faqs.map((faq, index) => {
                    const isOpen = openIndex === index;
                    return (
                        <div
                            key={index}
                            className="bg-slate border border-gold/20 rounded-sm overflow-hidden"
                        >
                            <button
                                onClick={() => toggle(index)}
                                className="w-full flex items-center justify-between px-6 py-5 text-left"
                            >
                                <span className="font-body text-sm md:text-base text-ivory">
                                    {faq.question}
                                </span>
                                <span className="text-gold shrink-0 ml-4">
                                    {isOpen ? (
                                        <Minus className="w-4 h-4" />
                                    ) : (
                                        <Plus className="w-4 h-4" />
                                    )}
                                </span>
                            </button>

                            {isOpen && (
                                <div className="px-6 pb-5">
                                    <div className="h-px bg-gold/20 mb-4" />
                                    <p className="font-body text-sm text-ivory/60 leading-relaxed">
                                        {faq.answer}
                                    </p>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </section>
    );
}