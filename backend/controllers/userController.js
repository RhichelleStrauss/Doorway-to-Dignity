const User = require("../models/User");
const bcrypt = require("bcryptjs");


exports.updateMe = async (req, res) => {
  try {
    const { fullName, email, phone, preferredRole } = req.body;

    if (!fullName?.trim() || !email?.trim() || !phone?.trim()) {
      return res.status(400).json({ message: "Name, email and phone can't be empty." });
    }

    const cleanEmail = email.trim().toLowerCase();
    if (cleanEmail !== req.user.email) {
      const taken = await User.findOne({ email: cleanEmail });
      if (taken) return res.status(400).json({ message: "That email is already in use." });
    }

    req.user.fullName = fullName.trim();
    req.user.email = cleanEmail;
    req.user.phone = phone.trim();
    req.user.preferredRole = preferredRole || "";
    await req.user.save();

    res.json({ message: "Profile saved." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong. Please try again." });
  }
};


exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: "Please fill in both passwords." });
    }
    if (newPassword.length < 8) {
      return res.status(400).json({ message: "Your new password needs at least 8 characters." });
    }

    const matches = await bcrypt.compare(currentPassword, req.user.password);
    if (!matches) return res.status(400).json({ message: "Your current password is incorrect." });

    req.user.password = await bcrypt.hash(newPassword, 12);
    await req.user.save();

    res.json({ message: "Password changed." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong. Please try again." });
  }
};
