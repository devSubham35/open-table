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
          overview_description: `Spice Garden is a vibrant destination where tradition meets innovation in Indian dining. Our chefs bring together recipes passed down through generations, using freshly ground spices, seasonal produce, and authentic cooking methods to create dishes that tell stories of India’s culinary heritage. From aromatic curries and slow-cooked biryanis to smoky tandoori kebabs and crisp street-food favorites, every plate is prepared with care and authenticity. Guests are welcomed into a warm atmosphere inspired by the colors and culture of India, with décor that blends modern elegance and traditional charm. Spice Garden is not only a restaurant, but also an experience where food becomes a journey—whether you’re enjoying a casual meal with friends, a festive family gathering, or a romantic evening. Vegetarian dishes are crafted with the same passion as our meat delicacies, ensuring everyone finds something delightful. Our team strives to create memorable moments for every guest, making Spice Garden a place where the love for food, culture, and hospitality comes together. Step into Spice Garden and allow us to take you on a flavorful voyage through India’s rich and diverse regions.`,
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
          overview_description: `Dragon Palace brings the timeless flavors of Chinese cuisine into a welcoming and lively atmosphere. Known for our handcrafted dumplings and freshly pulled noodles, we emphasize authenticity, quality, and taste in every dish. Our kitchen masters use traditional cooking techniques such as wok frying, steaming, and slow braising to ensure each meal is a true reflection of China’s diverse food culture. From flavorful dim sum and spicy Sichuan delights to Cantonese stir-fries and delicate soups, every plate at Dragon Palace offers comfort and satisfaction. The interiors combine classic Chinese design elements with modern touches, creating a space that feels both festive and relaxing. Whether you’re stopping by for a quick bowl of noodles, a family dinner, or a celebration, Dragon Palace offers dishes for every occasion. Our friendly staff ensures that service feels warm and genuine, reflecting the hospitality at the heart of Chinese culture. Beyond food, Dragon Palace is an experience of togetherness—sharing meals, stories, and moments around the table. With an extensive menu that caters to both adventurous diners and those who crave familiar classics, Dragon Palace has become a favorite spot for food lovers seeking authentic Chinese flavors.`,
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
          overview_description: `Bella Italia is a true celebration of Italy’s passion for food, wine, and hospitality. Our wood-fired pizzas are crafted using hand-stretched dough, fresh mozzarella, and San Marzano tomatoes for an authentic flavor straight from Naples. Handmade pastas, rich sauces, and premium olive oils bring to life recipes that have been perfected over centuries. Each dish is prepared with love and dedication to Italy’s culinary traditions, while our chefs also experiment with modern twists to keep the menu fresh and exciting. Bella Italia offers more than just food—it is an atmosphere of warmth and joy, reminiscent of family gatherings in Italy. Rustic décor, cozy seating, and carefully curated Italian wines set the perfect backdrop for an intimate dinner or lively celebration. From hearty lasagna and creamy risottos to indulgent tiramisu, our menu has something for every mood. Our goal is to transport guests straight to Italy, where every meal is an experience of togetherness and delight. Whether you are a lifelong lover of Italian cuisine or experiencing it for the first time, Bella Italia promises to deliver a memorable dining journey filled with authentic flavors and heartfelt hospitality.`,
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
          overview_description: `Taco Fiesta captures the lively spirit of Mexico through bold flavors, colorful dishes, and an atmosphere of celebration. Our tacos are filled with fresh ingredients, slow-cooked meats, zesty salsas, and handmade tortillas, delivering the true taste of Mexican street food. Beyond tacos, our menu features burritos, nachos, quesadillas, and refreshing aguas frescas, all designed to offer an authentic experience. At Taco Fiesta, we believe food is about joy and community, and we aim to make every visit feel like a fiesta. Vibrant décor inspired by Mexican culture, music that sets the mood, and friendly service make our restaurant a place where good times are shared. Each dish is carefully prepared using traditional recipes while embracing modern tastes, making it perfect for both adventurous eaters and those who love the classics. Whether you’re here for a quick lunch, a casual dinner, or a fun evening with friends, Taco Fiesta offers a flavorful escape into the heart of Mexico. We celebrate spice, variety, and togetherness, ensuring every guest leaves with both a satisfied appetite and a smile.`,
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
          overview_description: `Grill House is the destination for lovers of smoky flavors, juicy steaks, and perfectly charred grills. Our menu brings together the best of continental cuisine, featuring premium cuts of meat, seasoned to perfection and cooked over open flames for an irresistible taste. Beyond steaks, we offer a variety of grilled seafood, vegetarian specialties, and rich sides that complement every main dish. Our chefs take pride in sourcing the freshest ingredients and preparing them with care, ensuring that every plate is both hearty and satisfying. The restaurant’s atmosphere is designed to balance elegance with comfort—dark woods, warm lighting, and stylish seating create an inviting space ideal for both casual dining and special occasions. Grill House is more than a place to eat; it is an experience where flavors and hospitality come together. Whether you are indulging in a ribeye steak, savoring grilled salmon, or enjoying a glass of wine with friends, every visit is meant to be memorable. Grill House celebrates the timeless tradition of grilling, reimagined with a modern touch, making it the go-to place for anyone who appreciates bold flavors and quality dining.`,
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
          overview_description: `Curry Junction is a haven for those who love the comforting taste of traditional Indian curries. Our chefs specialize in creating dishes that reflect the warmth of home-cooked meals, using recipes inspired by different regions of India. From creamy butter chicken and spicy vindaloo to vegetarian favorites like paneer masala and dal tadka, every curry is prepared with fresh spices and authentic techniques. The aroma of slow-cooked gravies, fluffy basmati rice, and freshly baked naan fills the restaurant, creating an atmosphere that feels welcoming and familiar. Curry Junction is more than just a dining place—it is a space where families, friends, and food enthusiasts come together to enjoy the richness of Indian flavors. The décor is simple yet inviting, designed to highlight the cultural essence of India without overwhelming the senses. Our mission is to bring the joy of Indian cooking to every table, whether through classic recipes or innovative seasonal dishes. With an extensive menu that caters to vegetarians, meat lovers, and spice enthusiasts alike, Curry Junction ensures every guest finds their perfect flavor. It’s a destination for comfort, tradition, and unforgettable taste.`,
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
          overview_description: `Mandarin Delight is dedicated to serving authentic Chinese dishes that highlight the delicate balance of flavor and freshness. Our menu focuses on classic stir-fries, comforting soups, and aromatic rice and noodle dishes, all prepared with precision and care. Each plate showcases the harmony of sweet, sour, salty, and spicy flavors that define Chinese cooking. From hot and sour soup and kung pao chicken to vegetable stir-fry and fried rice, our offerings are designed to satisfy a variety of tastes. The restaurant’s interiors reflect simplicity and warmth, creating an environment that feels both cozy and refined. Mandarin Delight is a place for both quick weekday meals and long family gatherings, offering consistently flavorful food and friendly service. We pride ourselves on using high-quality ingredients and traditional cooking methods to preserve authenticity. Whether you are craving a light soup on a cool evening or a hearty noodle bowl after a long day, Mandarin Delight provides comfort through food. It is a restaurant that celebrates tradition while catering to the needs of modern diners, making it a reliable choice for lovers of Chinese cuisine.`,
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
          overview_description: `Roma Pasta Bar is where the art of handmade pasta takes center stage. Our chefs craft pasta daily, rolling and shaping it by hand to ensure freshness and authenticity. From silky tagliatelle and delicate ravioli to hearty penne and rigatoni, our menu celebrates the variety and richness of Italian pasta. Sauces are prepared using time-honored recipes, featuring fresh tomatoes, herbs, cheeses, and olive oil imported from Italy. To complement the food, we offer a curated selection of fine Italian wines, creating pairings that elevate every bite. The atmosphere at Roma Pasta Bar is casual yet elegant, designed to transport guests to the heart of Rome with its rustic charm and warm hospitality. Whether you are indulging in a creamy carbonara, a fragrant pesto pasta, or a glass of Chianti, Roma Pasta Bar ensures an authentic Italian experience. Our goal is to make each guest feel like they are part of an Italian family meal, filled with laughter, conversation, and comfort. Roma Pasta Bar is not just a place to eat—it is a space to celebrate food, friendship, and the simple joy of dining together.`,
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
          overview_description: `Cantina Mexicana offers a fun and flavorful twist on traditional Mexican cuisine by blending it with the bold spirit of Tex-Mex. Our menu is full of exciting combinations, from sizzling fajitas and cheesy quesadillas to loaded burritos and crispy tacos, each bursting with flavor. A lively drinks menu featuring tequilas, margaritas, and craft cocktails adds to the festive experience. The restaurant’s interiors are colorful and vibrant, reflecting the energy of Mexican culture and creating the perfect setting for celebrations. Cantina Mexicana is ideal for casual dining, group outings, or nights filled with music and laughter. Our chefs use high-quality ingredients and bold seasonings to create dishes that balance comfort with excitement. Guests are encouraged to share plates, explore new flavors, and enjoy the fun atmosphere that defines Cantina Mexicana. It is not only a place to eat but also a place to connect, celebrate, and create memories. Whether you’re craving comfort food or an adventurous new flavor, Cantina Mexicana guarantees a delicious and spirited dining experience.`,
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
          overview_description: `Steak & Barrel is a refined destination where premium steaks meet expertly curated wines. Our menu highlights the finest cuts of meat, sourced responsibly and cooked to perfection over open flames. Each steak is seasoned with care, grilled to order, and paired with sides that elevate the dining experience. Beyond steaks, we offer rich seafood options, seasonal salads, and indulgent desserts. To complement the food, our extensive wine list features both international and local selections, ensuring perfect pairings for every dish. The restaurant’s atmosphere combines sophistication and comfort, with stylish interiors, ambient lighting, and attentive service that makes every visit special. Steak & Barrel is designed for celebrations, business dinners, and memorable evenings where food and wine take center stage. We believe dining is an experience that engages all senses, and our goal is to create lasting impressions with every meal. For those who appreciate quality, flavor, and hospitality, Steak & Barrel offers a culinary journey that is both luxurious and welcoming.`,
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
        {
          full_name: "Jane Smith",
          description: "Loved the dumplings at Dragon Palace.",
          rating: 4.2,
          user_id: users[1].id,
          restaurant_id: restaurants[0].id,
        },
        {
          full_name: "Arjun Patel",
          description: "The pasta was rich and flavorful.",
          rating: 4.8,
          user_id: users[2].id,
          restaurant_id: restaurants[0].id,
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
