"use server";

import { prisma } from "@/lib/db";
import { PRICE } from "prisma/client";

export const GET = async function handler() {
  try {
    /// Delete in proper FK order
    await prisma.review.deleteMany();
    await prisma.menuItem.deleteMany();
    await prisma.restaurant.deleteMany();
    await prisma.location.deleteMany();
    await prisma.region.deleteMany();
    await prisma.user.deleteMany();

    /// Seed Users
    await prisma.user.createMany({
      data: [
        { name: "John Doe", city: "Kolkata", email: "john@example.com", password: "hashedpass1" },
        { name: "Jane Smith", city: "Howrah", email: "jane@example.com", password: "hashedpass2" },
        { name: "Arjun Patel", city: "Salt Lake", email: "arjun@example.com", password: "hashedpass3" },
        { name: "Maria Lopez", city: "Park Street", email: "maria@example.com", password: "hashedpass4" },
        { name: "David Kim", city: "Dum Dum", email: "david@example.com", password: "hashedpass5" },
      ],
    });

    const users = await prisma.user.findMany();

    /// Seed Locations
    await prisma.location.createMany({
      data: [
        { name: "Howrah" },
        { name: "Liluah" },
        { name: "Belur" },
        { name: "Bally" },
        { name: "Uttarpara" },
        { name: "Shibpur" },
        { name: "Salt Lake" },
        { name: "Park Street" },
        { name: "Kolkata Central" },
        { name: "Dum Dum" },
      ],
    });

    /// Seed Regions
    await prisma.region.createMany({
      data: [
        { name: "Indian" },
        { name: "Chinese" },
        { name: "Italian" },
        { name: "Mexican" },
        { name: "Continental" },
      ],
    });

    const regions = await prisma.region.findMany();
    const locations = await prisma.location.findMany();

    /// Seed Restaurants
    await prisma.restaurant.createMany({
      data: [
        {
          name: "Spice Garden",
          slug: "spice-garden",
          main_image: "/assets/resturants/image_01.png",
          description: "Authentic Indian cuisine with modern touch.",
          price: PRICE.REGULAR,
          open_time: "10:00",
          close_time: "22:00",
          location_id: locations[0].id,
          region_id: regions[0].id,
        },
        {
          name: "Dragon Palace",
          slug: "dragon-palace",
          main_image: "/assets/resturants/image_02.png",
          description: "Best Chinese dumplings and noodles in town.",
          price: PRICE.CHEAP,
          open_time: "11:00",
          close_time: "23:00",
          location_id: locations[1].id,
          region_id: regions[1].id,
        },
        {
          name: "Bella Italia",
          slug: "bella-italia",
          main_image: "/assets/resturants/image_03.png",
          description: "Authentic wood-fired Italian pizzas and pastas.",
          price: PRICE.EXPENSIVE,
          open_time: "12:00",
          close_time: "23:30",
          location_id: locations[2].id,
          region_id: regions[2].id,
        },
        {
          name: "Taco Fiesta",
          slug: "taco-fiesta",
          main_image: "/assets/resturants/image_04.png",
          description: "Mexican street food with spicy flavors.",
          price: PRICE.CHEAP,
          open_time: "09:00",
          close_time: "21:00",
          location_id: locations[3].id,
          region_id: regions[3].id,
        },
        {
          name: "Grill House",
          slug: "grill-house",
          main_image: "/assets/resturants/image_05.png",
          description: "Continental grills and steaks.",
          price: PRICE.EXPENSIVE,
          open_time: "13:00",
          close_time: "23:00",
          location_id: locations[4].id,
          region_id: regions[4].id,
        },
        {
          name: "Curry Junction",
          slug: "curry-junction",
          main_image: "/assets/resturants/image_06.png",
          description: "Home-style Indian curries with rich flavors.",
          price: PRICE.REGULAR,
          open_time: "10:30",
          close_time: "22:30",
          location_id: locations[5].id,
          region_id: regions[0].id,
        },
        {
          name: "Mandarin Delight",
          slug: "mandarin-delight",
          main_image: "/assets/resturants/image_07.png",
          description: "Classic Chinese stir-fries and soups.",
          price: PRICE.CHEAP,
          open_time: "11:00",
          close_time: "23:00",
          location_id: locations[6].id,
          region_id: regions[1].id,
        },
        {
          name: "Roma Pasta Bar",
          slug: "roma-pasta-bar",
          main_image: "/assets/resturants/image_08.png",
          description: "Fresh handmade pasta and Italian wines.",
          price: PRICE.EXPENSIVE,
          open_time: "12:30",
          close_time: "23:30",
          location_id: locations[7].id,
          region_id: regions[2].id,
        },
        {
          name: "Cantina Mexicana",
          slug: "cantina-mexicana",
          main_image: "/assets/resturants/image_09.png",
          description: "Tex-Mex fusion with tacos, burritos and tequila.",
          price: PRICE.REGULAR,
          open_time: "09:30",
          close_time: "22:00",
          location_id: locations[8].id,
          region_id: regions[3].id,
        },
        {
          name: "Steak & Barrel",
          slug: "steak-barrel",
          main_image: "/assets/resturants/image_10.png",
          description: "Premium continental steaks and wine pairings.",
          price: PRICE.EXPENSIVE,
          open_time: "14:00",
          close_time: "23:59",
          location_id: locations[9].id,
          region_id: regions[4].id,
        },
      ],
    });

    const restaurants = await prisma.restaurant.findMany();

    /// Seed Menu Items
    await prisma.menuItem.createMany({
      data: [
        {
          price: "220",
          name: "Paneer Butter Masala",
          restaurant_id: restaurants[0].id,
          description: "Cottage cheese in creamy tomato gravy.",
        },
        {
          price: "300", 
          name: "Chicken Biryani",
          restaurant_id: restaurants[0].id,
          description: "Fragrant rice with spiced chicken.", 
        },
        {
          price: "150", 
          name: "Chicken Dumplings",
          restaurant_id: restaurants[1].id,
          description: "Steamed dumplings with chicken filling.", 
        },
        {
          price: "180",
          name: "Schezwan Noodles",
          restaurant_id: restaurants[1].id,
          description: "Spicy noodles tossed with veggies.", 
        },
        {
          price: "450", 
          name: "Margherita Pizza",
          restaurant_id: restaurants[2].id,
          description: "Pizza with mozzarella and basil.", 
        },
        {
          price: "400", 
          name: "Pasta Alfredo",
          restaurant_id: restaurants[2].id,
          description: "Creamy white sauce pasta.", 
        },
        {
          price: "200", 
          name: "Beef Taco",
          restaurant_id: restaurants[3].id,
          description: "Crispy taco with beef filling.", 
        },
        {
          price: "250", 
          name: "Nachos Supreme",
          restaurant_id: restaurants[3].id,
          description: "Tortilla chips with cheese and salsa.", 
        },
        {
          price: "500", 
          name: "Grilled Chicken Steak",
          restaurant_id: restaurants[4].id,
          description: "Grilled chicken breast.", 
        },
        {
          price: "700", 
          name: "BBQ Ribs", 
          restaurant_id: restaurants[4].id,
          description: "Slow-cooked ribs with BBQ sauce.", 
        },
        {
          price: "180",
          name: "Dal Makhani", 
          restaurant_id: restaurants[5].id,
          description: "Slow-cooked black lentils.", 
        },
        {
          price: "350", 
          name: "Rogan Josh", 
          restaurant_id: restaurants[5].id,
          description: "Kashmiri lamb curry.", 
        },
        {
          price: "120", 
          name: "Hot & Sour Soup", 
          restaurant_id: restaurants[6].id,
          description: "Spicy, tangy soup with tofu.", 
        },
        {
          name: "Kung Pao Chicken", 
          price: "260", 
          restaurant_id: restaurants[6].id,
          description: "Stir-fried chicken with peanuts.", 
        },
        {
          name: "Spaghetti Carbonara", 
          price: "420", 
          restaurant_id: restaurants[7].id,
          description: "Pasta with pancetta and cheese.", 
        },
        {
          price: "480", 
          name: "Lasagna", 
          restaurant_id: restaurants[7].id,
          description: "Layered pasta with beef and béchamel.", 
        },
        {
          price: "270",
          name: "Chicken Burrito", 
          restaurant_id: restaurants[8].id,
          description: "Tortilla stuffed with chicken and rice.", 
        },
        {
          name: "Quesadilla", 
          description: "Cheesy grilled tortilla.", 
          price: "230", 
          restaurant_id: restaurants[8].id
        },
        {
          price: "1200", 
          name: "Filet Mignon", 
          restaurant_id: restaurants[9].id,
          description: "Tenderloin steak with garlic butter.", 
        },
        {
          price: "950",
          name: "Lamb Chops",
          restaurant_id: restaurants[9].id,
          description: "Grilled lamb chops with rosemary.",
        },
      ],
    });

    /// Seed Reviews (5)
    await prisma.review.createMany({
      data: [
        {
          full_name: "John Doe",
          description: "Amazing food and excellent service!",
          rating: 4.5,
          user_id: users[0].id,
          restaurant_id: restaurants[0].id,
        },
        {
          full_name: "Jane Smith",
          description: "Loved the dumplings at Dragon Palace.",
          rating: 4.2,
          user_id: users[1].id,
          restaurant_id: restaurants[1].id,
        },
        {
          full_name: "Arjun Patel",
          description: "The pasta was rich and flavorful.",
          rating: 4.8,
          user_id: users[2].id,
          restaurant_id: restaurants[2].id,
        },
        {
          full_name: "Maria Lopez",
          description: "Best tacos I've had in the city!",
          rating: 4.7,
          user_id: users[3].id,
          restaurant_id: restaurants[3].id,
        },
        {
          full_name: "David Kim",
          description: "Steaks cooked to perfection. Highly recommend.",
          rating: 4.9,
          user_id: users[4].id,
          restaurant_id: restaurants[9].id,
        },
      ],
    });

    return Response.json({
      message: "Seeding complete ✅ with 5 users, 10 restaurants, 20 menu items, and 5 reviews",
    });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Seeding failed ❌" }, { status: 500 });
  }
};
