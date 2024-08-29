import { Router } from "express";
import { getAvailableTables } from "../controllers/Tables.controller";

export const tablesRoute = Router();

tablesRoute.post("/", getAvailableTables);
