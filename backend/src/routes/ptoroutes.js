import express from "express";
import {
  createPTO,
  getAllPTOs,
  getPTOsByEmployee,
  updatePTO,
  deletePTO,
} from "../controllers/ptoController.js";

const router = express.Router();

// CREATE PTO
router.post("/", createPTO);

// GET all PTOs (Admin / filter by month or status)
router.get("/", getAllPTOs);

// GET PTOs by Employee
router.get("/employee/:empId", getPTOsByEmployee);

// UPDATE PTO (Approve / Reject / Edit)
router.put("/:empId", updatePTO);

// DELETE PTO (Withdraw)
router.delete("/:empId", deletePTO);

export default router;
