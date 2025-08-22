"use client";

import React from "react";
import Image from "next/image";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogOverlay,
    DialogTitle,
} from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface PhotoGalleryProps {
    title?: string;
    subtitle?: string;
    totalPhotos: number;
    images: string[];
}

const PhotoGallery = ({
    title = "836 Photos",
    subtitle = "Explore Magic Hour Rooftop Bar & Lounge’s photos.",
    totalPhotos,
    images,
}: PhotoGalleryProps) => {
    const [open, setOpen] = React.useState(false);
    const [viewerOpen, setViewerOpen] = React.useState(false);
    const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

    const handleOpenGallery = () => setOpen(true);

    const handleOpenViewer = (index: number) => {
        setActiveIndex(index);
        setViewerOpen(true);
    };

    const handleNext = () => {
        if (activeIndex === null) return;
        setActiveIndex((activeIndex + 1) % images.length);
    };

    const handlePrev = () => {
        if (activeIndex === null) return;
        setActiveIndex((activeIndex - 1 + images.length) % images.length);
    };

    return (
        <section className="w-full">
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-sm text-neutral-600 mb-3">{subtitle}</p>

            {/* Thumbnail Grid */}
            <div className="grid grid-cols-5 gap-2">
                {images.slice(0, 10).map((src, i) => (
                    <button
                        key={i}
                        onClick={handleOpenGallery}
                        className="relative w-full aspect-square overflow-hidden rounded-lg"
                    >
                        <Image
                            src={src}
                            alt="Photo"
                            fill
                            className="object-cover hover:scale-105 transition-transform"
                        />
                        {i === 9 && images.length > 5 && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white font-medium text-lg">
                                +{images.length - 9} More
                            </div>
                        )}
                    </button>
                ))}
            </div>

            {/* Gallery Modal */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="w-[95vw] max-w-[95vw] lg:max-w-[1400px] h-[90vh] p-0 flex flex-col">
                    <DialogHeader className="p-4 border-b shrink-0">
                        <DialogTitle>{title}</DialogTitle>
                        <p className="text-sm text-neutral-600">{subtitle}</p>
                    </DialogHeader>

                    {/* Masonry Grid with scrolling */}
                    <div className="p-4 flex-1 overflow-y-auto columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
                        {images.map((src, i) => (
                            <button
                                key={i}
                                onClick={() => handleOpenViewer(i)}
                                className="w-full break-inside-avoid overflow-hidden"
                            >
                                <Image
                                    src={src}
                                    alt={`Photo ${i + 1}`}
                                    width={600}
                                    height={400}
                                    className="w-full h-auto object-cover hover:scale-[1.02] transition-transform"
                                />
                            </button>
                        ))}
                    </div>
                </DialogContent>
            </Dialog>

            {/* Big Viewer Modal */}
            <Dialog open={viewerOpen} onOpenChange={setViewerOpen}>

                <DialogContent className="w-[70vw] max-w-[80vw] lg:max-w-[1000px] 
                h-[80vh] p-0 flex items-center justify-center bg-white overflow-hidden">
                    {activeIndex !== null && (
                        <div className="relative w-full h-full flex items-center justify-center">
                            <Image
                                src={images[activeIndex]}
                                alt={`Photo ${activeIndex + 1}`}
                                // fill
                                className="object-cover"
                                width={3000}
                                height={3000}
                            />

                            {/* Prev Button */}
                            <button
                                onClick={handlePrev}
                                className="cursor-pointer shadow-2xl absolute left-[-25px] top-1/2 -translate-y-1/2
                                    bg-white text-primary p-3 rounded-full"
                            >
                                <ChevronLeft size={28} />
                            </button>

                            {/* Next Button */}
                            <button
                                onClick={handleNext}
                                className="cursor-pointer shadow-2xl absolute right-[-25px] top-1/2 -translate-y-1/2
                                    bg-white text-primary p-3 rounded-full"
                            >
                                <ChevronRight size={28} />
                            </button>

                            {/* Close Button */}
                            <button
                                onClick={() => setViewerOpen(false)}
                                className="absolute top-5 right-5 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full"
                            >
                                <X size={24} />
                            </button>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </section>
    );
};

export default PhotoGallery;
