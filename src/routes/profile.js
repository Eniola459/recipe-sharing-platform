const express = require("express");
const multer = require("multer");
const {
  createProfile,
  getProfile,
  updateProfile,
  deleteProfile,
  searchProfile
} = require("../controllers/profile");
const authenticateUser = require("../middlewares/authenticateUser");

const router = express.Router();

// Multer setup for avatar upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'src/uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage });

// Swagger documentation for the routes

/**
 * @swagger
 * tags:
 *   name: Profiles
 *   description: API for managing user profiles
 */
/**
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
/**
 * @swagger
 * /api/profiles:
 *   post:
 *     summary: Create a new profile
 *     tags: [Profiles]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               bio:
 *                 type: string
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               twitterHandle:
 *                 type: string
 *               instagramHandle:
 *                 type: string
 *               avatar:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Profile created successfully
 *       400:
 *         description: Bad request, validation error
 *       500:
 *         description: Server error
 */
router.post("/", authenticateUser, upload.single('avatar'), createProfile);

/**
 * @swagger
 * /api/profiles/{userId}:
 *   get:
 *     summary: Get a profile by user ID
 *     tags: [Profiles]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       200:
 *         description: Profile retrieved successfully
 *       404:
 *         description: Profile not found
 *       500:
 *         description: Server error
 */
router.get("/:userId", authenticateUser, getProfile);

/**
 * @swagger
 * /api/profiles/{userId}:
 *   put:
 *     summary: Update a profile by user ID
 *     tags: [Profiles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               bio:
 *                 type: string
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               twitterHandle:
 *                 type: string
 *               instagramHandle:
 *                 type: string
 *               avatar:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       404:
 *         description: Profile not found
 *       500:
 *         description: Server error
 */
router.put("/:userId", authenticateUser, upload.single('avatar'), updateProfile);

/**
 * @swagger
 * /api/profiles/{userId}:
 *   delete:
 *     summary: Delete a profile by user ID
 *     tags: [Profiles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       200:
 *         description: Profile deleted successfully
 *       404:
 *         description: Profile not found
 *       500:
 *         description: Server error
 */
router.delete("/:userId", authenticateUser, deleteProfile);

/**
 * @swagger
 * /api/profiles/search:
 *   get:
 *     summary: Search profiles by first name or last name
 *     tags: [Profiles]
 *     parameters:
 *       - in: query
 *         name: firstName
 *         schema:
 *           type: string
 *         description: The first name to search for
 *       - in: query
 *         name: lastName
 *         schema:
 *           type: string
 *         description: The last name to search for
 *     responses:
 *       200:
 *         description: Profiles found
 *       404:
 *         description: No profiles found
 *       500:
 *         description: Server error
 */
router.get("/search", authenticateUser, searchProfile);

module.exports = router;
