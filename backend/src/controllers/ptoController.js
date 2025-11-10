import PTO from "../models/PTO.js";
import Employee from "../models/Employee.js";

/**
 * ✅ Create new PTO (Submit Request)
 * Uses empId only (no Mongo ObjectId required from frontend)
 */
export const createPTO = async (req, res) => {
  try {
    const { empId, month, ptoDates, holidayDates, reason, status } = req.body;

    // 1️⃣ Find employee using empId
    const employee = await Employee.findOne({ empId });
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // 2️⃣ Prevent duplicate entry for same month
    const existingPTO = await PTO.findOne({
      employeeId: employee._id,
      month,
    });

    if (existingPTO) {
      return res.status(400).json({
        message: `PTO record already exists for ${month}`,
      });
    }

    // 3️⃣ Create new PTO document
    const newPTO = await PTO.create({
      employeeId: employee._id,  // Use MongoDB ObjectId, not empId
      month,
      noOfPTOs: ptoDates?.length || 0,
      noOfHolidays: holidayDates?.length || 0,
      ptoDates,
      holidayDates,
      reason: reason || "",
      status: status || "pending",
    });

    res.status(201).json({
      message: "PTO created successfully",
      pto: newPTO,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * ✅ Get all PTOs (Admin / All users)
 * Filters: ?month=August 2025&status=Approved&empId=6261
 */
export const getAllPTOs = async (req, res) => {
  try {
    const { month, status, empId } = req.query;
    const filter = {};

    if (month) filter.month = month;
    if (status) filter.status = status;

    // If filtered by specific empId
    if (empId) {
      const employee = await Employee.findOne({ empId });
      if (employee) {
        filter.employeeId = employee._id;
      } else {
        return res.status(404).json({ message: "Employee not found" });
      }
    }

    const ptoRecords = await PTO.find(filter)
      .populate("employeeId", "empId fullName accountName projectName employmentType billing")
      .sort({ createdAt: -1 });

    res.status(200).json(ptoRecords);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * ✅ Get PTOs by empId
 */
export const getPTOsByEmployee = async (req, res) => {
  try {
    const { empId } = req.params;

    const employee = await Employee.findOne({ empId });
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    const ptoRecords = await PTO.find({ employeeId: employee._id })
      .sort({ createdAt: -1 });

    if (!ptoRecords.length) {
      return res.status(404).json({ message: "No PTO records found for this employee" });
    }

    res.status(200).json(ptoRecords);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * ✅ Update PTO (Approve / Reject / Edit)
 * Example: PUT /api/ptos/employee/6261
 */
export const updatePTO = async (req, res) => {
  try {
    const { empId } = req.params;
    const updateData = req.body;

    // 1️⃣ Find employee
    const employee = await Employee.findOne({ empId });
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // 2️⃣ Update the latest PTO entry for that employee
    const updatedPTO = await PTO.findOneAndUpdate(
      { employeeId: employee._id },
      { $set: updateData },
      { new: true, sort: { createdAt: -1 } }
    );

    if (!updatedPTO) {
      return res.status(404).json({ message: "No PTO found for this employee" });
    }

    res.status(200).json({
      message: "PTO updated successfully",
      pto: updatedPTO,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * ✅ Delete PTO (Withdraw)
 * Example: DELETE /api/ptos/employee/6261
 */
export const deletePTO = async (req, res) => {
  try {
    const { empId } = req.params;

    // 1️⃣ Find employee
    const employee = await Employee.findOne({ empId });
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // 2️⃣ Delete latest PTO
    const deletedPTO = await PTO.findOneAndDelete(
      { employeeId: employee._id },
      { sort: { createdAt: -1 } }
    );

    if (!deletedPTO) {
      return res.status(404).json({ message: "No PTO found for this employee" });
    }

    res.status(200).json({ message: "PTO deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
