
require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User");


const ADMIN = {
  fullName: "Admin",
  email: "rhichelle.strauss@icloud.com",
  phone: "0000000000",
  password: "ChangeMe123!",
};


async function main() {
  await mongoose.connect(process.env.MONGO_URI, { dbName: "doorwaytodignity" });
  console.log("Connected to MongoDB");

  const existing = await User.findOne({ email: ADMIN.email });
  if (existing) {
    console.log(`A user with email ${ADMIN.email} already exists (id: ${existing._id}). Aborting.`);
    await mongoose.disconnect();
    return;
  }

  const hashedPassword = await bcrypt.hash(ADMIN.password, 12);
  
  const user = await User.create({
    fullName: ADMIN.fullName,
    email: ADMIN.email.trim().toLowerCase(),
    phone: ADMIN.phone,
    password: hashedPassword,
    role: "admin",
  });


  console.log("Admin account created:", user._id.toString());
  console.log("Log in with:");
  console.log("  email:      ", ADMIN.email);
  console.log("  password:   ", ADMIN.password);

  await mongoose.disconnect();
}

main().catch((err) => {
  console.error("Failed to seed admin:", err);
  process.exit(1);
});
