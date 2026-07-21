const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    family: 4,
});

transporter.verify((error, success) => {
    if (error) {
        console.error("SMTP Verify Error:", error);
    } else {
        console.log("SMTP Ready");
    }
});

const sendOTPEmail = async (email, otp) => {
    try {
        const info = await transporter.sendMail({
            from: `"IITK Lost & Found" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "IITK Lost & Found - OTP Verification",
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px;">
                    <h2>IITK Lost & Found</h2>
                    <p>Your OTP for login is:</p>
                    <h1 style="letter-spacing:4px;">${otp}</h1>
                    <p>This OTP is valid for <b>5 minutes</b>.</p>
                    <p>If you didn't request this OTP, you can safely ignore this email.</p>
                </div>
            `,
        });

        console.log("Email sent:", info.response);
        return true;
    } catch (error) {
        console.error("Email send error:", error);
        throw error;
    }
};

module.exports = sendOTPEmail;