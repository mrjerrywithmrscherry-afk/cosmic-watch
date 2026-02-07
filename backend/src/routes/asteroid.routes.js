const express = require("express");
const router = express.Router();
const asteroidController = require("../controllers/asteroid.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.get("/feed", authMiddleware, asteroidController.getAsteroidFeed);
router.get("/:id", authMiddleware, asteroidController.getAsteroidById);

module.exports = router;
