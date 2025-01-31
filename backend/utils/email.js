import nodemailer from "nodemailer"

let transporter

// Verificar que las credenciales estén presentes
if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  console.warn("Email credentials are missing. Email functionality will be disabled.")
}

console.log("Email configuration:", {
  user: process.env.EMAIL_USER,
  pass: process.env.EMAIL_PASS ? "[REDACTED]" : "undefined",
})

try {
  transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, // Debe ser una contraseña de aplicación
    },
  })
  console.log("Nodemailer transporter created successfully")
} catch (error) {
  console.error("Error creating Nodemailer transporter:", error)
}

export async function sendApplicationEmail(to) {
  // Si no hay transporter, solo registra un mensaje y retorna
  if (!transporter) {
    console.log("Email functionality is disabled. Would have sent email to:", to)
    return
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: "linkup.startups@gmail.com",
    subject: "New LinkUp Application Received",
    text: `A new application has been received from ${to}. Please review it in the admin panel.`,
  }

  try {
    const info = await transporter.sendMail(mailOptions)
    console.log("Application email sent successfully:", info.response)
    return info
  } catch (error) {
    console.error("Error sending application email:", error)
    // No lanzamos el error para que no afecte el flujo principal
  }
}

