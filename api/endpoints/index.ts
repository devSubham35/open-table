import { constant } from "@/lib/constant";

export const baseUrlApi = `${constant.BASE_API_URL}/api`;

export const endpoints = {
  auth: {
    signup: "/signup",
    signin: "/signin",
  },
  dashboard: {
    get_all_resturants: "/resturant",
    get_all_filter_menus: "/filter-menus",
  }
};

export const sucessNotificationEndPoints = [
  endpoints.auth.signup,
  endpoints.auth.signin,
];
