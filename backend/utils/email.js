import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({

  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

export async function sendApplicationEmail(to) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: "linkup.startups@gmail.com",
    subject: "New LinkUp Application Received",
    text: `A new application has been received from ${to}. Please review it in the admin panel.`,
  }

  try {
    await transporter.sendMail(mailOptions)
    console.log("Application email sent successfully")
  } catch (error) {
    console.error("Error sending application email:", error)
  }
}

