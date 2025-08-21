import { prisma } from "@/lib/db";
import { PRICE } from "prisma/client";
import { asyncHandler } from "@/lib/handler/asyncHandler";
import { successResponse } from "@/lib/handler/ApiResponse";

export const GET = asyncHandler(async (req: Request) => {
  const { searchQuery, regionIds, locationIds, priceTag } = Object.fromEntries(
    new URL(req.url).searchParams
  );

  /// Convert comma-separated query params into arrays
  const regionIdArray = regionIds ? regionIds.split(",") : [];
  const locationIdArray = locationIds ? locationIds.split(",") : [];
  const priceTagArray = priceTag
    ? (priceTag.split(",").filter((p) => p in PRICE) as PRICE[])
    : [];

  const restaurant = await prisma.restaurant.findMany({
    where: {
      AND: [
        searchQuery
          ? {
              OR: [
                {
                  name: {
                    contains: searchQuery,
                    mode: "insensitive",
                  },
                },
                {
                  location: {
                    name: {
                      contains: searchQuery,
                      mode: "insensitive",
                    },
                  },
                },
                {
                  region: {
                    name: {
                      contains: searchQuery,
                      mode: "insensitive",
                    },
                  },
                },
              ],
            }
          : {},
        regionIdArray.length > 0
          ? { region_id: { in: regionIdArray } }
          : {},
        locationIdArray.length > 0
          ? { location_id: { in: locationIdArray } }
          : {},
        priceTagArray.length > 0
          ? { price: { in: priceTagArray } }
          : {},
      ],
    },
    include: {
      region: true,
      location: true,
    },
  });

  return successResponse(200, "Restaurant fetched successfully", restaurant);
});
