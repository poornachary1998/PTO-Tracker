import mongoose from "mongoose";

const PTOSchema = new mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    month: { type: String, required: true }, // e.g., "August 2025"
    noOfPTOs: { type: Number, default: 0 },
    noOfHolidays: { type: Number, default: 0 },
    ptoDates: [{ type: Date }], // array of PTO dates
    holidayDates: [{ type: Date }], // array of holidays
    reason: { type: String, default: "" },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("PTO", PTOSchema);
