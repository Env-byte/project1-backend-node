import * as core from "express-serve-static-core";
import express from "express";
import swaggerUi from "swagger-ui-express";
import fs from "fs";

const YAML = require('yamljs');
const router: core.Router = express.Router();
const path = './postman/schemas/openapi.yaml';
if (fs.existsSync(path)) {
    const swaggerDocument = YAML.load(path);
    router.use('/docs', swaggerUi.serve);
    router.get('/docs', swaggerUi.setup(swaggerDocument));
} else {
    console.log(`does not exist ${path}`)
}

export default router; // export to use in server.js

