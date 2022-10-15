import express from "express"; //import express
import {getTest, newTest} from "../controllers/test";

const router = express.Router();
/**
 * @openapi
 * /test:
 *   post:
 *    summary: Test Post
 *    tags:
 *      - Test
 *    responses:
 *      200:
 *          description: Returns a mysterious string.
 */
router.post("/test", newTest);

/**
 * @openapi
 * /test:
 *   get:
 *     summary: Test Get
 *     tags:
 *      - Test
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
router.get("/test", getTest)
export default router
