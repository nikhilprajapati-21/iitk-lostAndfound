const upload = require("../config/multer");

const express = require("express");

const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");

const {
    createItem,
    getAllItems,
    getLostItems,
    getFoundItems,
    getMyPosts,
    deleteItem,
    markReturned,
} = require("../controllers/itemController");

// Create Item
router.post(
    "/create",
    authMiddleware,
    upload.single("image"),
    createItem
);

// Get All Items
router.get(
    "/",
    getAllItems
);

// Get Lost Items
router.get(
    "/lost",
    getLostItems
);

// Get Found Items
router.get(
    "/found",
    getFoundItems
);

router.get(
"/myposts",
authMiddleware,
getMyPosts
);

router.delete(
    "/:id",
    authMiddleware,
    deleteItem
);
module.exports = router;
router.patch(
    "/:id/return",
    authMiddleware,
    markReturned
);
module.exports = router;