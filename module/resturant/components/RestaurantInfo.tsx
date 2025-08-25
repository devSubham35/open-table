"use client";

import React, { useEffect, useRef, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ResturantOverview from "./ResturantOverview";
import PhotoGallery from "./PhotoGallery";
import RestaurantReviews from "./RestaurantReviews";
import { RestaurantData, Review } from "@/api/hook/dashboard/resturant/schema";

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
];

interface RestaurantInforProps {
  data: RestaurantData | null;
}

const RestaurantInfo = ({ data }: RestaurantInforProps) => {
  const [activeSection, setActiveSection] = useState("overview");

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const sectionRefs: Record<string, React.RefObject<HTMLDivElement | null>> = {
    overview: useRef(null),
    photos: useRef(null),
    reviews: useRef(null),
    menu: useRef(null),
  };

  const sections = [
    { id: "overview", label: "Overview" },
    { id: "photos", label: "Photos" },
    { id: "reviews", label: "Reviews" },
    { id: "menu", label: "Menu" },
  ];

  /// Smooth scroll to section
  const scrollToSection = (id: string) => {
    const topOffset = 70; // account for sticky nav height
    const element = sectionRefs[id]?.current;
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - topOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  /// Track scroll position manually
  useEffect(() => {
    const handleScroll = () => {
      let current = "overview";
      const offset = 80; // adjust for sticky nav

      Object.entries(sectionRefs).forEach(([key, ref]) => {
        if (ref.current) {
          const rect = ref.current.getBoundingClientRect();
          if (rect.top - offset <= 0) {
            current = key; // section has reached top
          }
        }
      });

      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sectionRefs]);


  return (
    <div className="w-full">
      {/* Sticky Nav */}
      <div className="sticky top-0 z-50 bg-white">
        <Tabs value={activeSection} className="w-full bg-transparent h-[60px]">
          <TabsList className="flex justify-start bg-transparent h-full rounded-none py-0 my-0 shadow-none space-x-0">
            {sections.map((section) => (
              <TabsTrigger
                key={section.id}
                value={section.id}
                onClick={() => scrollToSection(section.id)}
                className="text-gray-600 text-[17px] hover:text-gray-900 
                data-[state=active]:text-red-500 data-[state=active]:border-red-500 
                rounded-none border-b-gray-200 bg-transparent shadow-none 
                h-full data-[state=active]:shadow-none border-0 border-b-[3px] w-[120px]"
              >
                {section.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      <div className="my-5 space-y-5">
        <div id="overview" ref={sectionRefs.overview}>
          <ResturantOverview
            title="About this restaurant"
            description={data?.overview_description as string}
            tags={[
              "Lively",
              "Great for creative cocktails",
              "Great for scenic views",
            ]}
          />
        </div>

        <div id="photos" ref={sectionRefs.photos}>
          <PhotoGallery totalPhotos={836} images={demoImages} />
        </div>

        <div id="reviews" ref={sectionRefs.reviews}>
          <RestaurantReviews data={data?.reviews as Review[]} />
        </div>
      </div>
    </div>
  );
};

export default RestaurantInfo;
