import { resturantKeys } from "./key";
import { endpoints } from "@/api/endpoints";
import axiosInstance from "@/api/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { FilterMenuApiResponse, RestaurantApiResponse } from "./schema";


export const useGetResturantList = ({
  searchQuery,
  regionIds,
  locationIds,
  priceTag,
}: {
  searchQuery?: string;
  regionIds?: string[];
  locationIds?: string[];
  priceTag?: string[];
}) => {
  return useQuery({
    queryKey: [resturantKeys.get_all_resturants, searchQuery, regionIds, locationIds, priceTag],
    queryFn: async () => {
      const params = new URLSearchParams();

      if (searchQuery) params.append("searchQuery", searchQuery);
      if (regionIds?.length) params.append("regionIds", regionIds.join(","));
      if (locationIds?.length) params.append("locationIds", locationIds.join(","));
      if (priceTag?.length) params.append("priceTag", priceTag.join(",")); // 👈 pass enum values

      const url = `${endpoints.dashboard.get_all_resturants}?${params.toString()}`;
      const res = await axiosInstance.get<RestaurantApiResponse>(url);
      return res.data;
    },
  });
};


export const useGetFilterMenuList = () => {
  return useQuery({
    queryKey: [resturantKeys.get_all_filter_menus],
    queryFn: async () => {

      const res = await axiosInstance.get<FilterMenuApiResponse>(endpoints.dashboard.get_all_filter_menus);
      return res.data;
    },
  });
};
