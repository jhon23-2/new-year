const express = require("express")
const app = express()
const cors = require("cors")
require("dotenv").config()

const nodemailer = require("nodemailer"); // mail library 
const cron = require("node-cron");

app.use(express.json())
app.use(cors())
const PORT = process.env.SERVER_PORT || 5000


let scheduledData = null
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.KEY_GMAIL
  }
})


app.get("/", (req, res) => {
  res.send("Happy new year service !!!")
})


app.post("/scheduled-message", async (req, res) => {
  scheduledData = req.body;

  await sendScheduledEmail();

  res.status(200).json({
    message: "Message sent successfully!"
  });
});



cron.schedule("44 21 * * *", async () => {
  try {
    console.log("⏰ 9:41 reached!");
    await sendScheduledEmail();
  } catch (err) {
    console.error("❌ Cron failed:", err.message);
  }
});


async function sendScheduledEmail() {

  await transporter.sendMail({
    from: `"You ❤️" <${process.env.EMAIL}>`,
    to: "sandyberben15@gmail.com",
    subject: "Happy New Year My Love 🎆",
    text: process.env.MESSAGE || scheduledData.message
  });

  console.log("💌 Email sent!");
}


app.listen(PORT, () => {
  console.log("Sever running on: " + PORT)
})
