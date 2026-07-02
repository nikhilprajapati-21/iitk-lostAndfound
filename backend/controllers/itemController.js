const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");

const db = require("../config/firebase");

const createItem = async (req, res) => {
    try {

        const {
            itemName,
            category,
            description,
            location,
            date,
            contact,
            type,
        } = req.body;

        if (
            !itemName ||
            !category ||
            !description ||
            !location ||
            !date ||
            !contact ||
            !type
        ) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        let imageUrl = "";

        // Upload image to Cloudinary if provided
        if (req.file) {

            imageUrl = await new Promise((resolve, reject) => {

                const stream = cloudinary.uploader.upload_stream(
                    {
                        folder: "iitk-lost-found",
                    },
                    (error, result) => {

                        if (error) {
                            reject(error);
                        } else {
                            resolve(result.secure_url);
                        }

                    }
                );

                streamifier
                    .createReadStream(req.file.buffer)
                    .pipe(stream);

            });

        }

        const itemData = {
            itemName,
            category,
            description,
            location,
            date,
            contact,
            type,
            imageUrl,
            userEmail: req.user.email,
            createdAt: new Date(),
            status: "open",
        };

        const docRef = await db
            .collection("items")
            .add(itemData);

        return res.status(201).json({
            success: true,
            message: "Item reported successfully",
            itemId: docRef.id,
        });

    } catch (error) {
    console.error("=== CREATE ITEM ERROR ===");
    console.error(error);
    console.error(error.message);
    console.error(error.stack);

    return res.status(500).json({
        success: false,
        message: error.message,
    });
}
};

// ========================
// Get All Items
// ========================
const getAllItems = async (req, res) => {
    try {

        const snapshot = await db
            .collection("items")
            .orderBy("createdAt", "desc")
            .get();

        const items = [];

        snapshot.forEach((doc) => {

            const data = doc.data();

            // Only show open items
            if (data.status === "open") {
                items.push({
                    id: doc.id,
                    ...data,
                });
            }

        });

        return res.json({
            success: true,
            items,
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

// ========================
// Get Lost Items
// ========================
const getLostItems = async (req, res) => {

    try {

        const snapshot = await db
            .collection("items")
            .where("type", "==", "lost")
            .orderBy("createdAt", "desc")
            .get();

        const items = [];

        snapshot.forEach((doc) => {
            items.push({
                id: doc.id,
                ...doc.data(),
            });
        });

        return res.json({
            success: true,
            items,
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};

// ========================
// Get Found Items
// ========================
const getFoundItems = async (req, res) => {

    try {

        const snapshot = await db
            .collection("items")
            .where("type", "==", "found")
            .get();

        const items = [];

        snapshot.forEach((doc) => {
            items.push({
                id: doc.id,
                ...doc.data(),
            });
        });

        return res.json({
            success: true,
            items,
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};

// ========================
// Get My Posts
// ========================
const getMyPosts = async (req, res) => {

    try {

        const snapshot = await db
            .collection("items")
            .where("userEmail", "==", req.user.email)
            .orderBy("createdAt", "desc")
            .get();

        const items = [];

        snapshot.forEach((doc) => {

            items.push({
                id: doc.id,
                ...doc.data(),
            });

        });

        return res.json({
            success: true,
            items,
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};

const deleteItem = async (req, res) => {
    try {

        const { id } = req.params;

        const docRef = db.collection("items").doc(id);

        const doc = await docRef.get();

        if (!doc.exists) {
            return res.status(404).json({
                success: false,
                message: "Item not found",
            });
        }

        const item = doc.data();

        if (item.userEmail !== req.user.email) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized",
            });
        }

        await docRef.delete();

        return res.json({
            success: true,
            message: "Item deleted successfully",
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });

    }
};



const markReturned = async (req, res) => {
    try {

        const { id } = req.params;

        const docRef = db.collection("items").doc(id);

        const doc = await docRef.get();

        if (!doc.exists) {
            return res.status(404).json({
                success: false,
                message: "Item not found",
            });
        }

        const item = doc.data();

        if (item.userEmail !== req.user.email) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized",
            });
        }

        await docRef.update({
            status: "returned",
        });

        return res.json({
            success: true,
            message: "Item marked as returned",
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
    createItem,
    getAllItems,
    getLostItems,
    getFoundItems,
    getMyPosts,
    deleteItem,
    markReturned,
};