const express = require("express");
const app = express();
const cors = require("cors");
const nodemailer = require("nodemailer");
const CryptoJs = require("crypto-js")
require("dotenv").config();

app.use(express.json());
app.use(cors());

const PORT = process.env.SERVER_PORT || 3000;

const bytesEmail = CryptoJs.AES.decrypt(process.env.ENCRYPTED_USER, process.env.ENCRYPTION_PASSPHRASE);
const decryptedEmail = bytesEmail.toString(CryptoJs.enc.Utf8)

const bytesKey = CryptoJs.AES.decrypt(process.env.ENCRYPTED_KEY_USER_GMAIL, process.env.ENCRYPTION_KEY);
const decryptedKey = bytesKey.toString(CryptoJs.enc.Utf8)

// transporter nodemailer configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: decryptedEmail || "random@gmail.com",
    pass: decryptedKey || ";("
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
      from: decryptedEmail || "random@gmail.com",
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
