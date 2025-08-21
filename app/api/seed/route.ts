import { prisma } from "@/lib/db";

export const GET = async function handler() {
  try {
    /// Delete in proper order to avoid FK constraint issues
    await prisma.menuItem.deleteMany();
    await prisma.restaurant.deleteMany();
    await prisma.location.deleteMany();
    await prisma.region.deleteMany();

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

    const regionRecords = await prisma.region.findMany();
    const locationRecords = await prisma.location.findMany();

    /// Seed Restaurants (10 total)
    await prisma.restaurant.createMany({
      data: [
        {
          name: "Spice Garden",
          slug: "spice-garden",
          main_image: "/assets/resturants/image_01.png",
          description: "Authentic Indian cuisine with modern touch.",
          price: "REGULAR",
          open_time: "10:00",
          close_time: "22:00",
          location_id: locationRecords[0].id,
          region_id: regionRecords[0].id,
        },
        {
          name: "Dragon Palace",
          slug: "dragon-palace",
          main_image: "/assets/resturants/image_02.png",
          description: "Best Chinese dumplings and noodles in town.",
          price: "CHEAP",
          open_time: "11:00",
          close_time: "23:00",
          location_id: locationRecords[1].id,
          region_id: regionRecords[1].id,
        },
        {
          name: "Bella Italia",
          slug: "bella-italia",
          main_image: "/assets/resturants/image_03.png",
          description: "Authentic wood-fired Italian pizzas and pastas.",
          price: "EXPENSIVE",
          open_time: "12:00",
          close_time: "23:30",
          location_id: locationRecords[2].id,
          region_id: regionRecords[2].id,
        },
        {
          name: "Taco Fiesta",
          slug: "taco-fiesta",
          main_image: "/assets/resturants/image_04.png",
          description: "Mexican street food with spicy flavors.",
          price: "CHEAP",
          open_time: "09:00",
          close_time: "21:00",
          location_id: locationRecords[3].id,
          region_id: regionRecords[3].id,
        },
        {
          name: "Grill House",
          slug: "grill-house",
          main_image: "/assets/resturants/image_05.png",
          description: "Continental grills and steaks.",
          price: "EXPENSIVE",
          open_time: "13:00",
          close_time: "23:00",
          location_id: locationRecords[4].id,
          region_id: regionRecords[4].id,
        },
        {
          name: "Curry Junction",
          slug: "curry-junction",
          main_image: "/assets/resturants/image_06.png",
          description: "Home-style Indian curries with rich flavors.",
          price: "REGULAR",
          open_time: "10:30",
          close_time: "22:30",
          location_id: locationRecords[5].id,
          region_id: regionRecords[0].id,
        },
        {
          name: "Mandarin Delight",
          slug: "mandarin-delight",
          main_image: "/assets/resturants/image_07.png",
          description: "Classic Chinese stir-fries and soups.",
          price: "CHEAP",
          open_time: "11:00",
          close_time: "23:00",
          location_id: locationRecords[6].id,
          region_id: regionRecords[1].id,
        },
        {
          name: "Roma Pasta Bar",
          slug: "roma-pasta-bar",
          main_image: "/assets/resturants/image_08.png",
          description: "Fresh handmade pasta and Italian wines.",
          price: "EXPENSIVE",
          open_time: "12:30",
          close_time: "23:30",
          location_id: locationRecords[7].id,
          region_id: regionRecords[2].id,
        },
        {
          name: "Cantina Mexicana",
          slug: "cantina-mexicana",
          main_image: "/assets/resturants/image_09.png",
          description: "Tex-Mex fusion with tacos, burritos and tequila.",
          price: "REGULAR",
          open_time: "09:30",
          close_time: "22:00",
          location_id: locationRecords[8].id,
          region_id: regionRecords[3].id,
        },
        {
          name: "Steak & Barrel",
          slug: "steak-barrel",
          main_image: "/assets/resturants/image_10.png",
          description: "Premium continental steaks and wine pairings.",
          price: "EXPENSIVE",
          open_time: "14:00",
          close_time: "23:59",
          location_id: locationRecords[9].id,
          region_id: regionRecords[4].id,
        },
      ],
    });

    const restaurantRecords = await prisma.restaurant.findMany();

    /// Seed Menu Items (20 total, 2 per restaurant)
    await prisma.menuItem.createMany({
      data: [
        // Spice Garden
        {
          name: "Paneer Butter Masala",
          description: "Cottage cheese simmered in creamy tomato gravy.",
          price: "220",
          restaurant_id: restaurantRecords.find(r => r.slug === "spice-garden")!.id,
        },
        {
          name: "Chicken Biryani",
          description: "Fragrant rice with spiced chicken pieces.",
          price: "300",
          restaurant_id: restaurantRecords.find(r => r.slug === "spice-garden")!.id,
        },

        // Dragon Palace
        {
          name: "Chicken Dumplings",
          description: "Steamed dumplings filled with juicy chicken.",
          price: "150",
          restaurant_id: restaurantRecords.find(r => r.slug === "dragon-palace")!.id,
        },
        {
          name: "Schezwan Noodles",
          description: "Spicy noodles tossed with vegetables and sauce.",
          price: "180",
          restaurant_id: restaurantRecords.find(r => r.slug === "dragon-palace")!.id,
        },

        // Bella Italia
        {
          name: "Margherita Pizza",
          description: "Classic pizza with fresh mozzarella and basil.",
          price: "450",
          restaurant_id: restaurantRecords.find(r => r.slug === "bella-italia")!.id,
        },
        {
          name: "Pasta Alfredo",
          description: "Creamy white sauce pasta with parmesan cheese.",
          price: "400",
          restaurant_id: restaurantRecords.find(r => r.slug === "bella-italia")!.id,
        },

        // Taco Fiesta
        {
          name: "Beef Taco",
          description: "Crispy taco with seasoned beef filling.",
          price: "200",
          restaurant_id: restaurantRecords.find(r => r.slug === "taco-fiesta")!.id,
        },
        {
          name: "Nachos Supreme",
          description: "Tortilla chips loaded with cheese and salsa.",
          price: "250",
          restaurant_id: restaurantRecords.find(r => r.slug === "taco-fiesta")!.id,
        },

        // Grill House
        {
          name: "Grilled Chicken Steak",
          description: "Tender chicken breast grilled to perfection.",
          price: "500",
          restaurant_id: restaurantRecords.find(r => r.slug === "grill-house")!.id,
        },
        {
          name: "BBQ Ribs",
          description: "Slow-cooked ribs with smoky BBQ sauce.",
          price: "700",
          restaurant_id: restaurantRecords.find(r => r.slug === "grill-house")!.id,
        },

        // Curry Junction
        {
          name: "Dal Makhani",
          description: "Slow-cooked black lentils with butter and cream.",
          price: "180",
          restaurant_id: restaurantRecords.find(r => r.slug === "curry-junction")!.id,
        },
        {
          name: "Rogan Josh",
          description: "Kashmiri lamb curry in aromatic spices.",
          price: "350",
          restaurant_id: restaurantRecords.find(r => r.slug === "curry-junction")!.id,
        },

        // Mandarin Delight
        {
          name: "Hot & Sour Soup",
          description: "Spicy, tangy soup with vegetables and tofu.",
          price: "120",
          restaurant_id: restaurantRecords.find(r => r.slug === "mandarin-delight")!.id,
        },
        {
          name: "Kung Pao Chicken",
          description: "Stir-fried chicken with peanuts and chili peppers.",
          price: "260",
          restaurant_id: restaurantRecords.find(r => r.slug === "mandarin-delight")!.id,
        },

        // Roma Pasta Bar
        {
          name: "Spaghetti Carbonara",
          description: "Classic pasta with egg, cheese, pancetta, and pepper.",
          price: "420",
          restaurant_id: restaurantRecords.find(r => r.slug === "roma-pasta-bar")!.id,
        },
        {
          name: "Lasagna",
          description: "Layered pasta with beef, tomato, and béchamel sauce.",
          price: "480",
          restaurant_id: restaurantRecords.find(r => r.slug === "roma-pasta-bar")!.id,
        },

        // Cantina Mexicana
        {
          name: "Chicken Burrito",
          description: "Flour tortilla stuffed with chicken and rice.",
          price: "270",
          restaurant_id: restaurantRecords.find(r => r.slug === "cantina-mexicana")!.id,
        },
        {
          name: "Quesadilla",
          description: "Cheesy grilled tortilla filled with veggies.",
          price: "230",
          restaurant_id: restaurantRecords.find(r => r.slug === "cantina-mexicana")!.id,
        },

        // Steak & Barrel
        {
          name: "Filet Mignon",
          description: "Premium tenderloin steak with garlic butter.",
          price: "1200",
          restaurant_id: restaurantRecords.find(r => r.slug === "steak-barrel")!.id,
        },
        {
          name: "Lamb Chops",
          description: "Grilled lamb chops with rosemary sauce.",
          price: "950",
          restaurant_id: restaurantRecords.find(r => r.slug === "steak-barrel")!.id,
        },
      ],
    });

    return Response.json({ message: "Seeding complete ✅ with 10 restaurants & 20 menu items" });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Seeding failed ❌" }, { status: 500 });
  }
};