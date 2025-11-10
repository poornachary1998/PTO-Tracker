import express from "express";
import {
  createOrUpdateMonthlyUpdate,
  getAllMonthlyUpdates,
  getMonthlyUpdateByEmployee,
  updateMonthlyUpdate,
  deleteMonthlyUpdate,
} from "../controllers/monthlyUpdateController.js";

const router = express.Router();

/* =============================
   👤 EMPLOYEE ROUTES
============================= */

// CREATE or UPDATE (Upsert)
router.post("/", createOrUpdateMonthlyUpdate);

// GET one employee’s monthly update
router.get("/employee/:empId/:month", getMonthlyUpdateByEmployee);

// UPDATE specific month
router.put("/employee/:empId/:month", updateMonthlyUpdate);

// DELETE specific month
router.delete("/employee/:empId/:month", deleteMonthlyUpdate);


/* =============================
   🧑‍💼 ADMIN ROUTES
============================= */

// GET all monthly updates (optional ?month=&empId=)
router.get("/", getAllMonthlyUpdates);

export default router;
