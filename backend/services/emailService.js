const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    tls: {
        rejectUnauthorized: false,
    },
});

// Verify SMTP connection when server starts
transporter.verify((error, success) => {
    if (error) {
        console.error("SMTP Error:", error);
    } else {
        console.log("SMTP Server is ready to send emails");
    }
});

const sendOTPEmail = async (email, otp) => {
    try {
        const mailOptions = {
            from: `"IITK Lost & Found" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "IITK Lost & Found - OTP Verification",
            html: `
                <h2>IITK Lost & Found</h2>
                <p>Your OTP is:</p>
                <h1>${otp}</h1>
                <p>This OTP is valid for 5 minutes.</p>
            `,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent successfully:", info.response);

        return info;
    } catch (error) {
        console.error("Error sending email:", error);
        throw error;
    }
};

module.exports = sendOTPEmail;