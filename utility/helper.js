const Users = require("../models/Users");
const bcrypt = require("bcrypt");

module.exports.GenerateEmployeeId = async (firstName, lastName) => {
  try {
    const prefix = "EMP";
    const paddingLength = 5;
    const count = await Users.countDocuments({});
    const fullName = firstName.charAt(0) + lastName.charAt(0);
    const nextIdNumber = count + 1;
    const paddedNumber = String(nextIdNumber).padStart(paddingLength, "0");
    const newEmployeeId = prefix + "0" + fullName + paddedNumber;
    return newEmployeeId;
  } catch (error) {
    console.error("Error generating employee ID:", error);
    return status(500).json({
      status: false,
      message: "Failed to generate employee ID",
      error: error.message,
    });
  }
};

module.exports.GeneratePassword = async (plainPassword) => {
  try {
    const hashPassword = await bcrypt.hash(plainPassword, 12);
    return hashPassword;
  } catch (error) {
    console.error("Error generating employee ID:", error);
    return status(500).json({
      status: false,
      message: "Failed to generate employee ID",
      error: error.message,
    });
  }
};
