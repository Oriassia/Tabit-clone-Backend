import { Router } from "express";
import { getAllRestaurants } from "../controllers/Resturant.controller";

export const restaurantsRoute = Router();

// Public routes
restaurantsRoute.get("/", getAllRestaurants);

