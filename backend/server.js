const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

// preventing nosql injections safetrrryyyyy
//if somone sent an injection instead of email, mongoose treats it like plain text
mongoose.set("sanitizeFilter", true);

const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');
const userRoutes = require('./routes/userRoutes');


const app = express();

//i saw articles of the node vulnerabilites
//i got dscared
//i google "how fix"
//this reasd json bodies. inflate rejects false compressed bodies
app.use(express.json({ inflate: false }));
//read cookie
app.use(cookieParser());

//max limit of logins per 15 mins
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  //looks at the attempts via email
  keyGenerator: (req) => String(req.body?.email || "").trim().toLowerCase() || "no-email",
  validate: { xForwardedForHeader: false },
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { message: "Too many login attempts. Please try again in 15 minutes." },
});
app.use("/api/auth/login", loginLimiter);



app.get("/", (req, res) => {
    res.send("API is running");
});

app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/users', userRoutes);


//mongo_uri comes from lovely secure env
mongoose.connect(process.env.MONGO_URI, { dbName: "doorwaytodignity" })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});