import { Router } from "express";
import {
  addReservation,
  deleteReservation,
} from "../controllers/Reservation.controller";

export const reservationRoutes = Router();

// Post
reservationRoutes.patch("/add/:restaurantId", addReservation);
reservationRoutes.delete("/:restaurantId/:reservationId", deleteReservation);
