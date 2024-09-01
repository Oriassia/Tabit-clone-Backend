import { Router } from "express";
import {
  getAvailableTables,
  getTablePositionsForRest,
} from "../controllers/Tables.controller";

export const tablesRoute = Router();

tablesRoute.post("/", getAvailableTables);
tablesRoute.get("/position/:restId", getTablePositionsForRest);
