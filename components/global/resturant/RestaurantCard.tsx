"use client"
import Image from "next/image"
import { redirect } from "next/navigation"
import { PAGE_PATHS } from "@/lib/pagePath"
import { MapPin, Tag, Globe, CookingPot } from "lucide-react"
import { FaStar } from "react-icons/fa"
import { Review } from "@/api/hook/dashboard/resturant/schema"
import { calculateAverageRating } from "@/lib/functions/_helper.lib"

interface RestaurantCardProps {
  item: {
    id: string
    name: string
    description: string
    slug: string
    price: string
    main_image?: string
    region?: { name: string }
    location?: { name: string }
    reviews?: Review[]
  }
}

const RestaurantCard = ({ item }: RestaurantCardProps) => {

  const averageRating = calculateAverageRating(item?.reviews as Review[])

  return (
    <div
      key={item?.id}
      className="group flex flex-col w-full rounded-2xl border bg-card shadow-sm 
      hover:shadow-md transition-all duration-200 overflow-hidden cursor-pointer"
      onClick={() => redirect(`${PAGE_PATHS.resturant}/${item?.slug}`)}
    >
      {/* Image */}
      <div className="w-full h-[140px] bg-muted rounded-t-2xl overflow-hidden">
        <Image
          width={500}
          height={500}
          src={item?.main_image as string}
          alt={`restutant_image_${item?.id}`}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-3 flex flex-col justify-between flex-1">
        <div>
          <h2 className="font-semibold text-lg line-clamp-1 text-primary">{item?.name}</h2>
          <p className="text-sm text-muted-foreground line-clamp-2 min-h-[40px]">
            {item?.description}
          </p>
        </div>

        <div className="space-y-2 mt-3">
          <div className="flex items-center text-sm text-emerald-600">
            <MapPin size={16} className="mr-1" />
            <span>{item?.location?.name}</span>
            <span className="flex items-center ml-4">
              <CookingPot size={16} className="mr-1" />
              {item?.region?.name}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm font-medium">
              <Tag size={16} className="mr-2 text-muted-foreground" />
              {item?.price}
            </div>

            {averageRating > 0 &&  <h1 className="flex items-center gap-1">
              {averageRating} <FaStar className="text-yellow-500 " />
            </h1>
            }
          </div>

        </div>
      </div>
    </div>
  )
}

export default RestaurantCard