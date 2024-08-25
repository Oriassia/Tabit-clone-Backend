import express, { Express } from "express";
import { restaurantsRoute } from "./routes/Resturant.route";
import cors from "cors";
import connectDB from "./config/db";
import { reservationRoutes } from "./routes/Reservation.route";

const PORT = process.env.PORT || 3000;

const app: Express = express();

async function main() {
  // Connect to database
  await connectDB();

  // Middleware
  app.use(express.json());
  app.use(cors());

  // Routes
  app.use("/api/restaurants", restaurantsRoute);
  app.use("/api/reservations", reservationRoutes);

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

main();
