const express = require("express");
const multer = require("multer");
const path = require("path");
const {
  createRecipe,
  getRecipe,
  updateRecipe,
  deleteRecipe,
  likeRecipe,  // New controller for liking a recipe
  commentRecipe,  // New controller for commenting on a recipe
  searchRecipesByTitle  // New controller for searching recipes by title
} = require("../controllers/recipe");
const authenticateUser = require("../middlewares/authenticateUser");

const router = express.Router();

// Multer setup for file uploads
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
 *   name: Recipes
 *   description: API for managing recipes
 */

/**
 * @swagger
 * /api/recipes:
 *   post:
 *     summary: Create a new recipe with optional media (image/video)
 *     tags: [Recipes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               ingredients:
 *                 type: array
 *                 items:
 *                   type: string
 *               instructions:
 *                 type: array
 *                 items:
 *                   type: string
 *               description:
 *                 type: string
 *               media:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Media files(images/video) (optional)
 *     responses:
 *       201:
 *         description: Recipe created successfully
 *       400:
 *         description: Bad request, file upload error or validation error
 *       500:
 *         description: Server error
 */
router.post("/", authenticateUser, upload.array('media', 5), createRecipe);

/**
 * @swagger
 * /api/recipes/{recipeId}:
 *   get:
 *     summary: Get a recipe by ID
 *     tags: [Recipes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: recipeId
 *         required: true
 *         schema:
 *           type: string
 *         description: The recipe ID
 *     responses:
 *       200:
 *         description: Recipe retrieved successfully
 *       404:
 *         description: Recipe not found
 *       500:
 *         description: Server error
 */
router.get("/:recipeId", authenticateUser, getRecipe);

/**
 * @swagger
 * /api/recipes/{recipeId}:
 *   put:
 *     summary: Update a recipe by ID with optional media update
 *     tags: [Recipes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: recipeId
 *         required: true
 *         schema:
 *           type: string
 *         description: The recipe ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               ingredients:
 *                 type: array
 *                 items:
 *                   type: string
 *               instructions:
 *                 type: array
 *                 items:
 *                   type: string
 *               description:
 *                 type: string
 *               media:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: uri
 *                   description: Updated media file URLs
 *     responses:
 *       200:
 *         description: Recipe updated successfully
 *       404:
 *         description: Recipe not found
 *       500:
 *         description: Server error
 */
router.put("/:recipeId", authenticateUser, upload.array('media', 5), updateRecipe);

/**
 * @swagger
 * /api/recipes/{recipeId}:
 *   delete:
 *     summary: Delete a recipe by ID
 *     tags: [Recipes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: recipeId
 *         required: true
 *         schema:
 *           type: string
 *         description: The recipe ID
 *     responses:
 *       200:
 *         description: Recipe deleted successfully
 *       404:
 *         description: Recipe not found
 *       500:
 *         description: Server error
 */
router.delete("/:recipeId", authenticateUser, deleteRecipe);

/**
 * @swagger
 * /api/recipes/{recipeId}/like:
 *   post:
 *     summary: Like a recipe by ID
 *     tags: [Recipes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: recipeId
 *         required: true
 *         schema:
 *           type: string
 *         description: The recipe ID
 *     responses:
 *       200:
 *         description: Recipe liked successfully
 *       404:
 *         description: Recipe not found
 *       500:
 *         description: Server error
 */
router.post("/:recipeId/like", authenticateUser, likeRecipe);

/**
 * @swagger
 * /api/recipes/{recipeId}/comment:
 *   post:
 *     summary: Post a comment on a recipe
 *     tags: [Recipes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: recipeId
 *         required: true
 *         schema:
 *           type: string
 *         description: The recipe ID
 *       - in: body
 *         name: comment
 *         description: Comment text
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             comment:
 *               type: string
 *               description: The comment text
 *     responses:
 *       201:
 *         description: Comment posted successfully
 *       400:
 *         description: Bad request, validation error
 *       500:
 *         description: Server error
 */
router.post("/:recipeId/comment", authenticateUser, commentRecipe);

/**
 * @swagger
 * /api/recipes/search:
 *   get:
 *     summary: Search for recipes by title
 *     tags: [Recipes]
 *     parameters:
 *       - in: query
 *         name: title
 *         required: true
 *         schema:
 *           type: string
 *         description: The title of the recipe to search for
 *     responses:
 *       200:
 *         description: Recipes retrieved successfully
 *       404:
 *         description: No recipes found
 *       500:
 *         description: Server error
 */
router.get("/search", authenticateUser, searchRecipesByTitle);

module.exports = router;
