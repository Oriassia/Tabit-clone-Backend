import { Router } from "express";
import {
  getAllAvaliableTablesByRest,
  getAvailableTables,
  getTablePositionsForRest,
} from "../controllers/Tables.controller";

export const tablesRoute = Router();

tablesRoute.post("/", getAvailableTables);
tablesRoute.get("/:restId", getAllAvaliableTablesByRest);
tablesRoute.get("/position/:restId", getTablePositionsForRest);
