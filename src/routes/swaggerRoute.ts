import * as core from "express-serve-static-core";
import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import envs from "../environment";

const router: core.Router = express.Router();
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: envs.project.name,
            version: envs.project.version,
        },
    },
    apis: ['./src/routes/*.ts'], // files containing annotations as above
};
const openapiSpecification = swaggerJsdoc(options);

router.use('/docs', swaggerUi.serve);
router.get('/docs', swaggerUi.setup(openapiSpecification));
export default router; // export to use in server.js
