import Employee from "../models/Employee.js";

// ✅ Create new Employee
export const createEmployee = async (req, res) => {
  try {
    const newEmployee = await Employee.create(req.body);
    res.status(201).json(newEmployee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ✅ Get all Employees
export const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findOne({ empId: req.params.empId });
    if (!employee) return res.status(404).json({ message: "Employee not found" });
    res.json(employee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Update Employee
export const updateEmployee = async (req, res) => {
  try {
    const { empId } = req.params;
    const { empId: _, ...updateData } = req.body;

    const updatedEmployee = await Employee.findOneAndUpdate(
      { empId },
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedEmployee) return res.status(404).json({ message: "Employee not found" });

    res.status(200).json(updatedEmployee);
  } catch (error) {
    console.error("Error updating employee:", error);
    res.status(500).json({ message: error.message });
  }
};


// ✅ Delete Employee
export const deleteEmployee = async (req, res) => {
  try {
    const { empId } = req.params;
    const deletedEmployee = await Employee.findOneAndDelete({ empId: empId });

    if (!deletedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
