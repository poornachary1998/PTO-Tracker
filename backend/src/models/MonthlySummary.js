import mongoose from "mongoose";

const MonthlySummarySchema = new mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    month: { type: String, required: true },
    plannedLeaves: { type: Number, default: 0 },
    totalPTOs: { type: Number, default: 0 },
    totalHolidays: { type: Number, default: 0 },
    remarks: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("MonthlySummary", MonthlySummarySchema);
