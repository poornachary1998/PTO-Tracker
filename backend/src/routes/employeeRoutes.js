import express from "express";
import {
  createEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
} from "../controllers/employeeController.js";

const router = express.Router();

// CREATE
router.post("/", createEmployee);

// READ
router.get("/", getEmployees);
router.get("/:empId", getEmployeeById);

// UPDATE
router.put("/:empId", updateEmployee);

// DELETE
router.delete("/:empId", deleteEmployee);

export default router;
