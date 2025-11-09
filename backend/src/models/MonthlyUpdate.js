import mongoose from "mongoose";

// Sub-schema for each project entry inside a monthly report
const ProjectUpdateSchema = new mongoose.Schema(
  {
    projectName: { type: String, required: true }, // e.g., "KTEA"
    accomplishments: { type: String, default: "" },
    issuesFaced: { type: String, default: "" },
    nextSteps: { type: String, default: "" },
  },
  { _id: false }
);

// Main monthly update schema
const MonthlyUpdateSchema = new mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    month: { type: String, required: true }, // e.g., "February 2025"
    projects: [ProjectUpdateSchema],
    generalRemarks: { type: String, default: "" }, // Optional summary
    submittedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("MonthlyUpdate", MonthlyUpdateSchema);
