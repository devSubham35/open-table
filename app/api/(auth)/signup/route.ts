import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/db";
import { ApiError } from "@/lib/handler/ApiError";
import { asyncHandler } from "@/lib/handler/asyncHandler";
import { successResponse } from "@/lib/handler/ApiResponse";
import { constant } from "@/lib/constant";

export const POST = asyncHandler(async (req: Request) => {

  const { name, email, password } = await req.json();

  if (!name || !email || !password) {
    throw new ApiError(400, "All fields are required");
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser) {
    throw new ApiError(409, "Email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: { name, email, password: hashedPassword },
    select: { id: true, name: true, email: true },
  });

  const jwt_token = jwt.sign(
    { id: newUser?.id },
    constant.JWT_SECRET as string,
    { expiresIn: "1d" }
  );

  return successResponse(201, "Sign up successfully", { jwt_token });
});
