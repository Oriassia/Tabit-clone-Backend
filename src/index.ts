import express from "express";
import { restaurantsRoute } from "./routes/Restaurant.route";
import cors from "cors";
import { reservationRoutes } from "./routes/Reservation.route";
import { tablesRoute } from "./routes/Tables.route";
import { giftCardRouter } from "./routes/Giftcards.route";
import { connectDB } from "./config/db";

const PORT = process.env.PORT || 3000;
const app = express();

// Connect to the database
connectDB(); // Ensure the database connection is established

const corsOptions = {
  origin:
    process.env.NODE_ENV === "development"
      ? process.env.DEVELOPMENT_ORIGIN
      : process.env.CORS_ORIGIN,
  methods: ["POST", "GET", "PUT", "DELETE"],
  credentials: true,
};

// Middleware
app.use(express.json());
app.use(cors(corsOptions));

// Routes
app.use("/api/tables", tablesRoute);
app.use("/api/restaurants", restaurantsRoute);
app.use("/api/reservations", reservationRoutes);
app.use("/api/giftcard", giftCardRouter);

app.get("/", (req, res) => res.json("Express on Vercel"));

// Only listen on a port when running locally
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;
