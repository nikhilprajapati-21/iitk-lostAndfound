const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    connectionTimeout: 30000,
    greetingTimeout: 30000,
    socketTimeout: 30000,
    family: 4,
});

transporter.verify((err) => {
    if (err) {
        console.error("SMTP Verify Error:", err);
    } else {
        console.log("SMTP Ready");
    }
});

const sendOTPEmail = async (email, otp) => {
    const info = await transporter.sendMail({
        from: `"IITK Lost & Found" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "IITK Lost & Found - OTP Verification",
        html: `
            <h2>IITK Lost & Found</h2>
            <p>Your OTP is:</p>
            <h1>${otp}</h1>
            <p>This OTP is valid for 5 minutes.</p>
        `,
    });

    console.log(info.response);
};

module.exports = sendOTPEmail;