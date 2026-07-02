const generateToken = require("../utils/generateToken");
const db = require("../config/firebase");
const NodeCache = require("node-cache");
const generateOTP = require("../utils/otpGenerator");
const sendOTPEmail = require("../services/emailService");

const otpCache = new NodeCache({
    stdTTL: 300,
});

const sendOTP = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email || !email.endsWith("@iitk.ac.in")) {
            return res.status(400).json({
                success: false,
                message: "Only IITK email is allowed",
            });
        }

        const otp = generateOTP();

        otpCache.set(email, otp);

        await sendOTPEmail(email, otp);

        return res.json({
            success: true,
            message: "OTP sent successfully",
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });

    }
};

const verifyOTP = async (req, res) => {

    try {

        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({
                success: false,
                message: "Email and OTP are required",
            });
        }

        const storedOTP = otpCache.get(email);

        if (!storedOTP) {
            return res.status(400).json({
                success: false,
                message: "OTP Expired",
            });
        }

        if (storedOTP !== otp) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP",
            });
        }

        otpCache.del(email);

        const userRef = db.collection("users").doc(email);

        const userDoc = await userRef.get();

        if (userDoc.exists) {

            await userRef.update({
                lastLogin: new Date(),
            });

            const token = generateToken(
                email,
                userDoc.data().rollNo
            );

            return res.json({
                success: true,
                needsProfile: false,
                token,
                user: userDoc.data(),
            });

        }

        return res.json({
            success: true,
            needsProfile: true,
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });

    }

};

const completeProfile = async (req, res) => {

    try {

        const {
            email,
            name,
            rollNo,
            hostel,
            phone,
        } = req.body;

        if (!email || !name || !rollNo || !hostel || !phone) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        if (!email.endsWith("@iitk.ac.in")) {
            return res.status(400).json({
                success: false,
                message: "Only IITK email is allowed",
            });
        }

        const isUG = /^\d{6}$/.test(rollNo);
        const isPG = /^\d{9}$/.test(rollNo);

        if (!isUG && !isPG) {
            return res.status(400).json({
                success: false,
                message: "Invalid IITK Roll Number",
            });
        }

        // Email already registered?
        const userRef = db.collection("users").doc(email);

        const existingEmail = await userRef.get();

        if (existingEmail.exists) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }

        // Roll number already registered?
        const existingRoll = await db
            .collection("users")
            .where("rollNo", "==", rollNo)
            .get();

        if (!existingRoll.empty) {
            return res.status(400).json({
                success: false,
                message: "Roll number already registered",
            });
        }

        await userRef.set({

            email,
            name,
            rollNo,
            hostel,
            phone,

            profileCompleted: true,

            createdAt: new Date(),
            lastLogin: new Date(),

        });

        const token = generateToken(email, rollNo);

        return res.json({

            success: true,
            message: "Profile completed successfully",

            token,

            user: {
                email,
                name,
                rollNo,
                hostel,
                phone,
            },

        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({

            success: false,
            message: "Internal Server Error",

        });

    }

};

module.exports = {
    sendOTP,
    verifyOTP,
    completeProfile,
};