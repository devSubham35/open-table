import { prisma } from "@/lib/db";
import { asyncHandler } from "@/lib/handler/asyncHandler";
import { successResponse } from "@/lib/handler/ApiResponse";

export const GET = asyncHandler(async () => {

  const locations = await prisma.location.findMany();
  const regions = await prisma.region.findMany();

  const data = {
    locations,
    regions
  }

  return successResponse(200, "Restaurant fetched successfully", data);
});
