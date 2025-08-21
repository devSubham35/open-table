"use client";

import React, { useEffect, useRef, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ResturantOverview from "./ResturantOverview";
import PhotoGallery from "./PhotoGallery";

const demoImages = [
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
]

const RestaurantInfo: React.FC = () => {

  const sections = [
    { id: "overview", label: "Overview", },
    { id: "photos", label: "Photos" },
    { id: "menu", label: "Menu" },
  ];

  const [activeSection, setActiveSection] = useState(sections[0].id);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );

    Object.values(sectionRefs.current).forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="w-full">
      {/* Sticky Nav */}
      <div className="sticky top-0 z-50 bg-white">
        <Tabs value={activeSection} className="w-full bg-transparent h-[60px]">
          <TabsList className="flex justify-start bg-transparent h-full rounded-none 
          py-0 my-0 shadow-none space-x-0">
            {sections.map((section) => (
              <TabsTrigger
                key={section.id}
                value={section.id}
                onClick={() => scrollToSection(section.id)}
                className="text-gray-600 text-[17px] hover:text-gray-900 data-[state=active]:text-red-500 
                data-[state=active]:border-red-500 rounded-none border-b-gray-200
                bg-transparent shadow-none h-full data-[state=active]:shadow-none border-0 border-b-[3px] w-[120px]"
              >
                {section.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {/* {sections.map((section) => (
        <div
          key={section.id}
          id={section.id}
          ref={(el) => {
            sectionRefs.current[section.id] = el;
          }}
          className="h-[500px] flex items-center justify-center border rounded-md"
        >
          <h2 className="text-3xl font-bold">{section.label} Section</h2>
        </div>
      ))} */}

      <div className="my-5 space-y-5">
        <ResturantOverview
          title="About this restaurant"
          description="Experience New York City’s largest all-season indoor and outdoor rooftop bar featuring multiple bars, live DJs, bar bites, cocktails, rotating seasonal pop-ups, and epic views of the Empire State Building skyline. Located on the 18th floor, this venue blends vibrant energy with sweeping vistas, offering a memorable night out in the heart of the city. Reservations recommended on weekends."
          tags={[
            "Lively",
            "Great for creative cocktails",
            "Great for scenic views",
          ]}
        />

        <PhotoGallery totalPhotos={836} images={demoImages} />
      </div>

    </div>
  );
};

export default RestaurantInfo;
