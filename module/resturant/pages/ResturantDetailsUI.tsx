import Image from "next/image";
import { prisma } from "@/lib/db";
import RestaurantInfo from "../components/RestaurantInfo";
import ReservationBox from "@/module/resturant/components/ReservationBox";
import ResturantDetailsHeader from "@/module/resturant/components/ResturantDetailsHeader";
import { Review } from "@/api/hook/dashboard/resturant/schema";
import RestaurantReviews from "../components/RestaurantReviews";

const ResturantDetailsUI = async ({ slug }: { slug: string }) => {

    const resturantDetails = await prisma.restaurant.findUnique({
        where: {
            slug
        },
        include: {
            region: true,
            location: true,
            reviews: true,
        },
    })

    return (
        <div className="w-full relative">

            {/* Hero Image */}
            <div className="w-full h-[300px] relative">
                <Image
                    width={1500}
                    height={1500}
                    className="w-full h-full object-contain z-20"
                    src={resturantDetails?.main_image as string}
                    alt={`restutant_image_${resturantDetails?.id}`}
                />
                <div className="pattern-bg  w-full h-full absolute inset-0 z-0 pointer-events-none" />
            </div>

            {/* Content */}
            <div className="custom-container w-full h-[200vh] flex justify-between gap-8">

                <div className="w-full">
                    <ResturantDetailsHeader data={resturantDetails} />

                    {/* Sticky nav example */}
                    {/* <div className="w-full sticky top-0 left-0 shrink-0 border-b">
                        <div className="w-full h-[60px]">
                        </div>
                    </div> */}
                    <RestaurantInfo data={resturantDetails} />
                    
                </div>


                {/* Right side - Reservation Box (sticky) */}
                <div className="w-[400px] shrink-0 sticky top-8 h-fit mt-8">
                    <ReservationBox />
                </div>
            </div>
        </div>
    );
};

export default ResturantDetailsUI;