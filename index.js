const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

const nodemailer = require("nodemailer");
const cron = require("node-cron");

app.use(express.json());
app.use(cors());

const PORT = process.env.SERVER_PORT || 3000;

/* =========================
   EMAIL TRANSPORTER
========================= */
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.KEY_GMAIL
  }
});

/* =========================
   BASIC ROUTE
========================= */
app.get("/", (req, res) => {
  res.send("Happy New Year service is running 🎆");
});

/* =========================
   🧪 TEST EMAIL — 10:50 PM COLOMBIA
   10:50 PM COL = 03:50 UTC
========================= */
cron.schedule("47 3 * * *", async () => {
  console.log("🧪 TEST EMAIL SENT (10:50 PM COL)");
  await sendEmail("🧪 Test before New Year 💌");
});

/* =========================
   🎆 REAL NEW YEAR EMAIL
   12:00 AM COL = 05:00 UTC
========================= */
cron.schedule("0 5 1 1 *", async () => {
  console.log("🎆 HAPPY NEW YEAR EMAIL SENT!");
  await sendEmail("Happy New Year My Love 🎆");
});

/* =========================
   EMAIL FUNCTION
========================= */
async function sendEmail(subject) {
  await transporter.sendMail({
    from: `"You ❤️" <${process.env.EMAIL}>`,
    to: "sandyberben15@gmail.com",
    subject,
    text: process.env.MESSAGE
  });

  console.log("💌 Email delivered!");
}

/* =========================
   START SERVER
========================= */
app.listen(PORT, () => {
  console.log("Server running on port:", PORT);
});
