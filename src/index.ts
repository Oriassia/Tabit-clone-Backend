import express, { Express } from "express";
import { restaurantsRoute } from "./routes/Restaurant.route";
import cors from "cors";

import { reservationRoutes } from "./routes/Reservation.route";
import { tablesRoute } from "./routes/Tables.route";
import { giftCardRouter } from "./routes/Giftcards.route";

const PORT = process.env.PORT || 3000;

const app: Express = express();

async function main() {
  // Connect to database
  // await connectDB(); // Ensure the database connection is established
  // Middleware
  app.use(express.json());
  app.use(
    cors({
      origin: ["https://tabit-clone.vercel.app"], //Frontend link
      methods: ["POST", "GET", "UPDATE", "DELETE"],
      credentials: true,
    })
  );

  // Routes
  app.use("/api/tables", tablesRoute);
  app.use("/api/restaurants", restaurantsRoute);
  app.use("/api/reservations", reservationRoutes);
  app.use("/api/giftcard", giftCardRouter);

  app.get("/", (req, res) => res.json("Express on Vercel"));

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

main();
