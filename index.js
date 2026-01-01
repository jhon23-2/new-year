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
   MANUAL SEND (OPTIONAL)
========================= */
app.post("/scheduled-message", async (req, res) => {
  try {
    await sendScheduledEmail();
    res.status(200).json({ message: "Message sent successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to send email" });
  }
});

/* =========================
   🧪 TEST CRON (EVERY MINUTE)
   REMOVE AFTER CONFIRMATION
========================= */
cron.schedule("* * * * *", async () => {
  console.log("🧪 TEST CRON running...");
  await sendScheduledEmail();
});

/* =========================
   🎆 NEW YEAR CRON
   12:00 AM COLOMBIA = 05:00 UTC
========================= */
cron.schedule("0 5 1 1 *", async () => {
  console.log("🎆 HAPPY NEW YEAR!");
  await sendScheduledEmail();
});

/* =========================
   EMAIL FUNCTION
========================= */
async function sendScheduledEmail() {
  await transporter.sendMail({
    from: `"You ❤️" <${process.env.EMAIL}>`,
    to: "sandyberben15@gmail.com",
    subject: "Happy New Year My Love 🎆",
    text: process.env.MESSAGE
  });

  console.log("💌 Email sent successfully!");
}

/* =========================
   START SERVER
========================= */
app.listen(PORT, () => {
  console.log("Server running on port:", PORT);
});
