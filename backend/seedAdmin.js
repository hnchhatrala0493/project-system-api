const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const connectDB = require("./config/db");
const User = require("./models/User");

dotenv.config();

const admin = {
  name: "ProjectFlow Admin",
  email: "admin@projectflow.com",
  password: "Admin@123",
  role: "Super Admin",
  department: "Administration",
  designation: "System Owner",
  status: "Active",
};

const seedAdmin = async () => {
  await connectDB();

  const password = await bcrypt.hash(admin.password, 12);
  const user = await User.findOneAndUpdate(
    { email: admin.email },
    { ...admin, password },
    { returnDocument: "after", upsert: true, runValidators: true }
  ).select("-password");

  console.log("Super Admin ready:");
  console.log(`Email: ${user.email}`);
  console.log(`Password: ${admin.password}`);

  process.exit(0);
};

seedAdmin().catch((error) => {
  console.error("Seed failed:", error.message);
  process.exit(1);
});
