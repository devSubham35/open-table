import { BaseApiResponse } from './../../../../typescript/interface/common.types';

export interface RestaurantApiResponse extends BaseApiResponse {
  data: RestaurantData[];
}

export interface RestaurantData {
  id: string
  name: string
  slug: string
  main_image: string
  description: string
  price: string
  open_time: string
  close_time: string
  location_id: string
  region_id: string
  created_at: string | Date
  updated_at: string | Date
  region: Region
  location: Location
}

export interface Region {
  id: string
  name: string
  created_at: string | Date
  updated_at: string | Date
}

export interface Location {
  id: string
  name: string
  created_at: string | Date
  updated_at: string | Date
}

export interface FilterMenuApiResponse extends BaseApiResponse {
  data: FilterMenuResponse;
}

export interface FilterMenuResponse {
  locations: Location[]
  regions: Region[]
}