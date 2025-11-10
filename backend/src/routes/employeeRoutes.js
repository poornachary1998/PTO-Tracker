import express from "express";
import {
  createEmployee,
  getEmployees,
  getEmployeeById
} from "../controllers/employeeController.js";

const router = express.Router();

// Routes
router.post("/", createEmployee); // Add employee
router.get("/", getEmployees);    // Get all employees

router.get("/:empId", getEmployeeById);


export default router;
