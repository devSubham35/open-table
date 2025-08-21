import React from "react";
import { ChevronDown } from "lucide-react";

function Pill({ children }: { children: React.ReactNode }) {
    return (
        <span className="inline-flex items-center rounded-full border border-neutral-200 
        px-3 py-1 text-sm text-neutral-700 bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.02)]">
            {children}
        </span>
    );
}


export type ResturantOverviewProps = {
    title?: string;
    tags?: string[];
    className?: string;
    description: string;
    defaultExpanded?: boolean;
};


export default function ResturantOverview({
    title,
    tags,
    description,
    defaultExpanded = false,
    className,
}: ResturantOverviewProps) {

    const [expanded, setExpanded] = React.useState(defaultExpanded);


    return (
        <section className={"w-full max-w-3xl " + (className ?? "")}
            aria-label={title}
        >
            <h3 className="text-base font-semibold text-neutral-900 mb-3">{title}</h3>


            {/* Tag pills */}
            <div className="flex flex-wrap gap-2 mb-3">
                {tags?.map((t, i) => (
                    <Pill key={i}>{t}</Pill>
                ))}
            </div>


            {/* Description with clamp */}
            <div>
                <p
                    className={
                        "text-[15px] leading-6 text-neutral-800 transition-all " +
                        (expanded ? "line-clamp-none" : "line-clamp-3")
                    }
                >
                    {description}
                </p>


                {/* Read more / Read less */}
                <button
                    type="button"
                    onClick={() => setExpanded((v) => !v)}
                    className="cursor-pointer mt-1 inline-flex items-center gap-1 text-sm font-medium text-red-600 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 rounded"
                    aria-expanded={expanded}
                >
                    {expanded ? "Read less" : "Read more"}
                    <ChevronDown
                        className={
                            "h-4 w-4 transition-transform" + (expanded ? "rotate-180" : "rotate-0")
                        }
                        aria-hidden
                    />
                </button>
            </div>
        </section>
    );
}