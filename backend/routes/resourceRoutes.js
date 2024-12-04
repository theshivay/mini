const express = require("express");
const { authenticate } = require("../middlewares/authMiddleware");
const { authorizeRoles } = require("../middlewares/roleMiddleware");
const { createResource, getResources } = require("../controllers/resourceController");

const router = express.Router();

router.post("/", authenticate, authorizeRoles("Admin"), createResource);
router.get("/", authenticate, getResources);

module.exports = router;
