import mongoose from "mongoose";
import dotenv from "dotenv";
import Restaurant from "./src/models/Resturant.model";
import connectDB from "./src/config/db"; // Assuming this is the correct path
import {
  IGuestInfo,
  IReservation,
  IRestaurant,
  ITable,
} from "./src/types/types";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "";

const restaurantNames = [
  "Café Noir",
  "Port Said",
  "Taizu",
  "Santa Katarina",
  "Ouzeria",
  "The Norman",
  "Brasserie M&R",
  "Shila",
  "Hotel Montefiore",
  "Tzfon Abraxas",
  "HaBasta",
  "Popina",
  "Mashya",
  "Claro",
  "Hatraklin",
  "Yaffo Tel Aviv",
  "Kitchen Market",
  "Carmel Market Bar",
  "M25",
  "Aria",
  "Hahalutzim 3",
  "Cucina Hess 4",
  "Miznon",
  "Dok",
  "Sabich Tchernichovsky",
  "Golda",
  "Magazzino",
  "Onza",
  "Anastasia",
  "OCD TLV",
];

const categories = [
  "Mediterranean",
  "Israeli",
  "Seafood",
  "Steakhouse",
  "Fusion",
  "European",
  "Vegetarian",
];
const tablePositions = ["inside", "outside", "garden", "roof"];

async function seed() {
  try {
    await connectDB(); // Connect to MongoDB

    // Clear existing restaurant data
    await Restaurant.deleteMany({});
    console.log("Cleared existing restaurants");

    const restaurantsData: IRestaurant[] = [];

    // Helper to create random tables and reservations
    function createTablesAndReservations(): ITable[] {
      const tables: ITable[] = [];
      const numTables = Math.floor(Math.random() * 10) + 6; // 6-15 tables

      for (let i = 0; i < numTables; i++) {
        const tableSize = Math.floor(Math.random() * 6) + 2; // 2-7 seats per table
        const position =
          tablePositions[Math.floor(Math.random() * tablePositions.length)];
        const reservations: IReservation[] = [];

        // Create random future reservations for this table
        const numReservations = Math.floor(Math.random() * 3) + 1; // 1-3 reservations per table

        for (let j = 0; j < numReservations; j++) {
          const guestInfo: IGuestInfo = {
            guestFirstName: `Guest${i}${j}`,
            guestLastName: `Surname${i}${j}`,
            phoneNumber: `+972-52-${Math.floor(
              1000000 + Math.random() * 9000000
            )}`,
            email: `guest${i}${j}@example.com`,
          };

          // Generate a random future reservation time (1-30 days in the future)
          const now = new Date();
          const daysAhead = Math.floor(Math.random() * 30) + 1;
          const hoursAhead = Math.floor(Math.random() * 12); // Random hours
          const minutes = [0, 30][Math.floor(Math.random() * 2)]; // Round or half-hour

          const reservationTime = new Date(now);
          reservationTime.setDate(now.getDate() + daysAhead);
          reservationTime.setHours(now.getHours() + hoursAhead, minutes);

          // Add reservation respecting 1.5-hour rule
          const reservation: IReservation = {
            guestInfo,
            partySize: Math.min(
              tableSize,
              Math.floor(Math.random() * tableSize) + 1
            ),
            reservationTime,
            position: [position],
            notes: `Reservation for table ${i + 1}`,
          };

          // Ensure reservations are spaced out by at least 1.5 hours
          if (
            reservations.every(
              (r) =>
                Math.abs(
                  reservationTime.getTime() - r.reservationTime.getTime()
                ) >=
                1.5 * 60 * 60 * 1000
            )
          ) {
            reservations.push(reservation);
          }
        }

        tables.push({
          _id: new mongoose.Types.ObjectId().toString(),
          position,
          partySize: tableSize,
          reservations,
        });
      }

      return tables;
    }

    for (let i = 0; i < 50; i++) {
      const randomName =
        restaurantNames[Math.floor(Math.random() * restaurantNames.length)];
      const randomCategory =
        categories[Math.floor(Math.random() * categories.length)];
      const randomStreetNumber = Math.floor(Math.random() * 100) + 1;
      const tables = createTablesAndReservations();

      const restaurant: IRestaurant = {
        name: randomName,
        categories: [randomCategory],
        shortDescription: `${randomName} is one of the best restaurants in Tel Aviv, specializing in ${randomCategory} cuisine.`,
        mainPhoto: `path/to/photo_${i + 1}.jpg`,
        address: {
          country: "Israel",
          city: "Tel Aviv",
          street: "Random Street",
          number: randomStreetNumber,
        },
        contactInfo: {
          phoneNumber: `+972-3-${Math.floor(
            1000000 + Math.random() * 9000000
          )}`,
          websiteURL: `http://${randomName
            .toLowerCase()
            .replace(/ /g, "-")}.com`,
          instagram: `http://instagram.com/${randomName
            .toLowerCase()
            .replace(/ /g, "_")}`,
          facebook: `http://facebook.com/${randomName
            .toLowerCase()
            .replace(/ /g, "_")}`,
        },
        location: {
          lat: 32.0853 + Math.random() * 0.02 - 0.01, // Tel Aviv latitude
          lng: 34.7818 + Math.random() * 0.02 - 0.01, // Tel Aviv longitude
        },
        openingHours: [
          { day: "Monday", open: "09:00", close: "22:00" },
          { day: "Tuesday", open: "09:00", close: "22:00" },
          { day: "Wednesday", open: "09:00", close: "22:00" },
          { day: "Thursday", open: "09:00", close: "23:00" },
          { day: "Friday", open: "09:00", close: "00:00" },
          { day: "Saturday", open: "10:00", close: "00:00" },
          { day: "Sunday", open: "10:00", close: "22:00" },
        ],
        about: {
          longDescription: `${randomName} offers a unique dining experience in the heart of Tel Aviv.`,
          menus: [
            {
              title: "Main Menu",
              menuUrl: `http://${randomName
                .toLowerCase()
                .replace(/ /g, "-")}.com/menu`,
            },
          ],
          photos: [
            `path/to/photo_${i + 1}_1.jpg`,
            `path/to/photo_${i + 1}_2.jpg`,
          ],
          reservations: [], // Empty because reservations are directly tied to tables
        },
        tables,
      };

      restaurantsData.push(restaurant);
    }

    // Insert all restaurants into the database
    await Restaurant.insertMany(restaurantsData);
    console.log("Seeded 50 restaurants with tables and reservations.");

    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seed();
