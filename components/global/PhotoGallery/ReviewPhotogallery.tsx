"use client";

import { useState } from "react";
import Image from "next/image";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { X } from "lucide-react";

const photos = [
    "/assets/resturants/image_01.png",
    "/assets/resturants/image_02.png",
    "/assets/resturants/image_03.png",
    "/assets/resturants/image_04.png",
    "/assets/resturants/image_05.png",
    "/assets/resturants/image_06.png",
    "/assets/resturants/image_07.png",
    "/assets/resturants/image_08.png",
    "/assets/resturants/image_09.png",
    "/assets/resturants/image_10.png",
    "/assets/resturants/image_01.png",
    "/assets/resturants/image_02.png",
    "/assets/resturants/image_03.png",
    "/assets/resturants/image_04.png",
    "/assets/resturants/image_05.png",
    "/assets/resturants/image_06.png",
    "/assets/resturants/image_07.png",
    "/assets/resturants/image_08.png",
    "/assets/resturants/image_09.png",
    "/assets/resturants/image_10.png",
];

const ReviewPhotogallery = () => {
    const [open, setOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);

    return (
        <div>
            {/* Small photo preview row */}
            <div className="flex items-center gap-2">
                {photos.slice(0, 5).map((photo, index) => {
                    if (index === 4 && photos.length > 5) {
                        return (
                            <div
                                key={index}
                                className="relative size-20 rounded-md overflow-hidden cursor-pointer"
                                onClick={() => {
                                    setSelectedIndex(index);
                                    setOpen(true);
                                }}
                            >
                                <Image
                                    src={photo}
                                    alt={`photo-${index}`}
                                    width={1500}
                                    height={1500}
                                    className="w-full h-full object-cover opacity-50"
                                />
                                <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-md">
                                    <span className="text-white font-semibold text-sm">
                                        +{photos.length - 4}
                                    </span>
                                </div>
                            </div>
                        );
                    }

                    return (
                        <div
                            key={index}
                            className="size-20 rounded-md overflow-hidden cursor-pointer"
                            onClick={() => {
                                setSelectedIndex(index);
                                setOpen(true);
                            }}
                        >
                            <Image
                                src={photo}
                                alt={`photo-${index}`}
                                width={80}
                                height={80}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    );
                })}
            </div>

            {/* Shadcn Modal */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="w-[95vw] max-w-[95vw] lg:max-w-[1400px] h-[70vh] p-0 flex overflow-hidden">
                    <DialogHeader className="absolute top-3 right-3">
                        <DialogTitle className="sr-only">Photo Preview</DialogTitle>
                        <button
                            className="p-2 rounded-full bg-black/60 text-white hover:bg-black"
                            onClick={() => setOpen(false)}
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </DialogHeader>

                    {/* Left Thumbnails */}
                    <div className="w-1/4 border-r overflow-y-auto p-2 bg-gray-50">
                        <div className="columns-2 gap-2">
                            {photos.map((photo, index) => (
                                <div
                                    key={index}
                                    onClick={() => setSelectedIndex(index)}
                                    className={`mb-2 cursor-pointer rounded-md overflow-hidden break-inside-avoid 
                                    ${index === selectedIndex ? "ring-2 ring-yellow-500" : "hover:opacity-70"}`}
                                >
                                    <Image
                                        src={photo}
                                        alt={`thumb-${index}`}
                                        width={1500}
                                        height={1500}
                                        className="w-full h-auto object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>


                    {/* Right Preview */}
                    <div className="flex-1 flex items-center justify-center bg-black">
                        <Image
                            src={photos[selectedIndex]}
                            alt={`preview-${selectedIndex}`}
                            width={900}
                            height={700}
                            className="max-h-full max-w-full object-contain rounded-md"
                        />
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ReviewPhotogallery;
