"use client"
import NoDataFound from "@/components/global/NoDataFound"
import HomeHeader from "@/module/home/components/HomeHeader"
import { useGetResturantList } from "@/api/hook/dashboard/resturant/hook"
import RestaurantCard from "@/components/global/resturant/RestaurantCard"
import ResturantCardListingSkeleton from "@/components/global/skeletons/ResturantCardListingSkeleton"

const HomePage = () => {

  const { data: resturantList, isLoading } = useGetResturantList({})

  return (
    <div>
      <HomeHeader />

      {/* Loading State */}
      {isLoading && <ResturantCardListingSkeleton />}

      {/* Data State */}
      {!isLoading && Number(resturantList?.data?.length) > 0 && (
        <div className="custom-container grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 py-6">
          {resturantList?.data?.map((item) => (
            <RestaurantCard key={item.id} item={item} />
          ))}
        </div>
      )}

      {!isLoading && resturantList?.data?.length === 0 && <NoDataFound />}
    </div>
  )
}

export default HomePage
