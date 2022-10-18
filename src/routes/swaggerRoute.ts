import * as core from "express-serve-static-core";
import express from "express";
import swaggerUi from "swagger-ui-express";
import fs from "fs";
const YAML = require('yamljs');
const router: core.Router = express.Router();
const path = '../../postman/schemas/index.yaml';
let yaml;
if (fs.existsSync(path)) {
    yaml = fs.readFileSync(path);
    const swaggerDocument = YAML.parse(path);
    console.log(swaggerDocument)
    router.use('/docs', swaggerUi.serve);
    router.get('/docs', swaggerUi.setup(swaggerDocument));
}

export default router; // export to use in server.js

