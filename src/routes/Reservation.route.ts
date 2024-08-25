import { Router } from "express";
import {
  addEditReservation,
  deleteReservation,
} from "../controllers/Reservation.controller";

export const reservationRoutes = Router();

// Post
reservationRoutes.patch("/:restaurantId/addit", addEditReservation);
reservationRoutes.delete("/:restaurantId/:reservationId", deleteReservation);
