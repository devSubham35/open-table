"use client";

import { useState } from 'react';
import NoDataFound from '@/components/global/NoDataFound';
import SearchHeader from '@/module/search/components/SearchHeader';
import RestaurantCard from '@/components/global/resturant/RestaurantCard';
import { FilterMenuResponse } from '@/api/hook/dashboard/resturant/schema';
import FilterSideBar, { FilterState } from '@/module/search/components/FilterSideBar';
import { useGetFilterMenuList, useGetResturantList } from '@/api/hook/dashboard/resturant/hook';
import ResturantCardListingSkeleton from '@/components/global/skeletons/ResturantCardListingSkeleton';

const SearchPage = ({ searchQuery }: { searchQuery: string }) => {

  const [filters, setFilters] = useState<FilterState>({
    priceTag: [],
    regionIds: [],
    locationIds: [],
  })


  const { data: resturantList, isLoading } = useGetResturantList({
    searchQuery,
    priceTag: filters.priceTag,
    regionIds: filters.regionIds,
    locationIds: filters.locationIds,
  });

  const { data: filterMenuList, isLoading: isFilterMenuFetching } = useGetFilterMenuList();

  return (
    <>
      <SearchHeader />
      <div className="px-10 pt-5 h-[calc(100vh-154px)] flex gap-4">

        <FilterSideBar
          filters={filters}
          setFilters={setFilters}
          loading={isFilterMenuFetching}
          data={filterMenuList?.data as FilterMenuResponse}
        />

        <div className="w-full overflow-y-auto flex flex-col gap-4 pb-48 pr-2">
          {isLoading && <ResturantCardListingSkeleton />}
          {!isLoading && Number(resturantList?.data?.length) > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {resturantList?.data?.map((item) => (
                <RestaurantCard key={item.id} item={item} />
              ))}
            </div>
          )}
          {!isLoading && resturantList?.data?.length === 0 && <NoDataFound />}
        </div>
      </div>
    </>
  );
};

export default SearchPage;