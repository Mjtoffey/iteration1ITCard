const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post("/sendemail", (req, res) => {
  const { recipient, subject, body } = req.body;

  const transporter = nodemailer.createTransport({
    service: "Gmail", // Use your email service
    auth: {
      user: "your-email@gmail.com", // Your email address
      pass: "your-email-password", // Your email password
    },
  });

  const mailOptions = {
    from: "your-email@gmail.com", // Your email address
    to: recipient,
    subject: subject,
    text: body,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.status(500).json({ message: "Email not sent. Error: " + error });
    } else {
      res.status(200).json({ message: "Email sent: " + info.response });
    }
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
