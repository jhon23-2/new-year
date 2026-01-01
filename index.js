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
    user: "jhoalmanza52@gmail.com",
    pass: "hioq ygle yeeu kvja"
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
cron.schedule("59 3 * * *", async () => {
  console.log("🧪 TEST EMAIL SENT (10:59 PM COL)");
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
    from: `"You ❤️" <jhoalmanza52@gmail.com>`,
    to: "sandyberben15@gmail.com",
    subject,
    text: "Happy new year my love , te amo mi vida gracias por pasar un nuevo anio conmigo de nuevo no sabes lo feliz que me siento contigo espero seguir sumando anios hasta que llegue el anio de casarnos te amo mi reina sin duda alguna lo mejor que me pudo pasar fue conocerte mi reina te amo mi cielo lindo , te amo cielo por un 2026 lleno de bendiciones se que este anio todo saldra bien mi reina te amo mucho quedate conmigo y vivamos nuestra vida juntos para siempre mi reina aun no estamos en el altar pero hasta que la muerte nos separe te amo mi reina open: https://famous-blancmange-687b18.netlify.app/"
  });

  console.log("💌 Email delivered!");
}

/* =========================
   START SERVER
========================= */
app.listen(PORT, () => {
  console.log("Server running on port:", PORT);
});
