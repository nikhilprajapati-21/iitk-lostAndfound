const db = require("../config/firebase");

// ======================
// Get User Profile
// ======================
const getProfile = async (req, res) => {
    try {

        const email = req.user.email;

        const docRef = db.collection("users").doc(email);

        const doc = await docRef.get();

        if (!doc.exists) {
            return res.json({
                success: true,
                profile: null,
            });
        }

        return res.json({
            success: true,
            profile: doc.data(),
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });

    }
};

// ======================
// Update Profile
// ======================
const updateProfile = async (req, res) => {
    try {

        const email = req.user.email;

        const {
            name,
            rollNo,
            hostel,
            phone,
        } = req.body;

        await db.collection("users").doc(email).set(
            {
                email,
                name,
                rollNo,
                hostel,
                phone,
            },
            { merge: true }
        );

        return res.json({
            success: true,
            message: "Profile updated successfully",
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
    getProfile,
    updateProfile,
};