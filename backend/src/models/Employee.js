import mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema(
  {
    empId: { type: Number, required: true, unique: true },
    fullName: { type: String, required: true },
    employmentType: {
      type: String,
      enum: ["Fulltime", "Contract", "Intern"],
      required: true,
    },
    billing: {
      type: String,
      enum: ["Billable", "Partial", "Non-Billable"],
      required: true,
    },
    accountName: { type: String, required: true }, // e.g., "APEI"
    projectName: { type: String, required: true }, // e.g., "Student Journey"
    projectType: { type: String, required: true }, // e.g., "T&M"
    role: { type: String, enum: ["employee", "manager", "admin"], default: "employee" },
    // References
    ptoRecords: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PTO",
      },
    ],
    monthlyUpdates: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "MonthlyUpdate",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Employee", EmployeeSchema);
