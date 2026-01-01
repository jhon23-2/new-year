const express = require("express");
const app = express();
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();

app.use(express.json());
app.use(cors());

const PORT = process.env.SERVER_PORT || 3000;


// transporter nodemailer configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.USER || "random@gmail.com",
    pass: process.env.KEY_USER_GMAIL || ";("
  }
});

// endpoint send email 
app.post("/send-email", (req, res) => {

  if (req.body === null) {
    res.status(400).json({ message: "You Must send a Body! Try again " })
    return
  }

  try {
    const { email, message, subject } = req.body

    transporter.sendMail({
      from: process.env.USER || "random@gmail.com",
      to: email || "random@gmail.com",
      subject: subject || "Jhonattan Message",
      text: message || "Hello Ramdon Message :)"
    })

    res.status(200).json({ message: `Mail sent succesfully to ${email}` })

  } catch (error) {
    res.status(500).json({ message: "Ufs! Somrthing was wrong " })
  }

})

setTimeout(async () => {

  try {
    console.log("Sending information...")
    const response = await fetch("http://localhost:3000/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: "Hello my love this message is for you im sending this message from myself",
        subject: "Message",
        email: "sandyberben15@gmail.com"
      }
      )
    })

    const { message } = await response.json()
    console.log(message)

  } catch (error) {
    console.log("Error setTimeOut " + error)
  }

}, 5000)


app.get("/", (req, res) => {
  res.send("Server Application running succesfully !!!")
})

app.listen(PORT, () => {
  console.log("Server running on port:", PORT);
});
