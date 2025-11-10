import MonthlyUpdate from "../models/MonthlyUpdate.js";
import Employee from "../models/Employee.js";

/**
 * ✅ Create or Update Monthly Update (Upsert)
 * Employees use this to submit or resubmit their report.
 */
export const createOrUpdateMonthlyUpdate = async (req, res) => {
  try {
    const { empId, month, projects, generalRemarks } = req.body;

    // 1️⃣ Find employee by empId
    const employee = await Employee.findOne({ empId });
    if (!employee) return res.status(404).json({ message: "Employee not found" });

    // 2️⃣ Check if update already exists
    const existingUpdate = await MonthlyUpdate.findOne({
      employeeId: employee._id,
      month,
    });

    // 3️⃣ Upsert logic (update if exists, else create)
    const update = await MonthlyUpdate.findOneAndUpdate(
      { employeeId: employee._id, month },
      {
        $set: {
          projects,
          generalRemarks,
          submittedAt: new Date(),
        },
      },
      { new: true, upsert: true }
    );

    res.status(existingUpdate ? 200 : 201).json({
      message: existingUpdate ? "Monthly update updated successfully" : "Monthly update created successfully",
      update,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * ✅ Get all Monthly Updates (Admin)
 * Optional filters: ?month=February 2025&empId=3029
 */
export const getAllMonthlyUpdates = async (req, res) => {
  try {
    const { month, empId } = req.query;
    const filter = {};

    if (month) filter.month = month;

    if (empId) {
      const employee = await Employee.findOne({ empId });
      if (!employee) return res.status(404).json({ message: "Employee not found" });
      filter.employeeId = employee._id;
    }

    const updates = await MonthlyUpdate.find(filter)
      .populate("employeeId", "empId fullName accountName projectName employmentType billing")
      .sort({ createdAt: -1 });

    res.status(200).json(updates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * ✅ Get single employee’s Monthly Update
 */
export const getMonthlyUpdateByEmployee = async (req, res) => {
  try {
    const { empId, month } = req.params;

    const employee = await Employee.findOne({ empId });
    if (!employee) return res.status(404).json({ message: "Employee not found" });

    const update = await MonthlyUpdate.findOne({
      employeeId: employee._id,
      month,
    }).populate("employeeId", "empId fullName");

    if (!update) return res.status(404).json({ message: "No monthly update found" });

    res.status(200).json(update);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * ✅ Update Monthly Update (Employee)
 * Employees can edit their report before admin review.
 */
export const updateMonthlyUpdate = async (req, res) => {
  try {
    const { empId, month } = req.params;
    const { projects, generalRemarks } = req.body;

    const employee = await Employee.findOne({ empId });
    if (!employee) return res.status(404).json({ message: "Employee not found" });

    const updated = await MonthlyUpdate.findOneAndUpdate(
      { employeeId: employee._id, month },
      { $set: { projects, generalRemarks } },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Monthly update not found" });

    res.status(200).json({
      message: "Monthly update updated successfully",
      update: updated,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * ✅ Delete Monthly Update (Admin or Employee)
 */
export const deleteMonthlyUpdate = async (req, res) => {
  try {
    const { empId, month } = req.params;

    const employee = await Employee.findOne({ empId });
    if (!employee) return res.status(404).json({ message: "Employee not found" });

    const deleted = await MonthlyUpdate.findOneAndDelete({
      employeeId: employee._id,
      month,
    });

    if (!deleted) return res.status(404).json({ message: "Monthly update not found" });

    res.status(200).json({ message: "Monthly update deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
