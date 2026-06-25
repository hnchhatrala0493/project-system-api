const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    EMP_ID: {
      type: String,
      require: true,
    },
    parentId: {
      type: String,
      default: "null",
    },
    firstName: {
      type: String,
      require: true,
    },
    lastName: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    office_mail: {
      type: String,
      require: true,
    },
    mobileNo: {
      type: String,
      require: true,
    },
    gender: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    IsEmailVerify: {
      type: Boolean,
      default: false,
    },
    IsMobileNoVerify: {
      type: Boolean,
      default: false,
    },
    AlternateMobileNo: {
      type: String,
      require: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
    IsDeleted: {
      type: Boolean,
      default: false,
    },
    dob: {
      type: String,
      default: true,
    },
    Address: {
      type: String,
    },
    role: {
      type: String,
    },
  },
  {
    timestamp: true,
  }
);

module.exports = mongoose.model("User", UserSchema);
