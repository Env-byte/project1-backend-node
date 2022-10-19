import express from 'express';
import envs from "./environment";

// import the routes
import SummonerRoute from "./routes/summonerRoute";
import SwaggerRoute from "./routes/swaggerRoute";
import RegionMiddleware from "./middleware/regionMiddleware";
import ErrorHandlerMiddleware from "./middleware/errorHandlerMiddleware";

const https = require('https');
const app = express();

const server = https.createServer({key: envs.ssl.key, cert: envs.ssl.cert}, app);
app.use(express.json());

//add middleware
app.use('/api/', RegionMiddleware);

//add routes
if (envs.isDev) {
    //if dev use swagger
    app.use('/', SwaggerRoute);
}
app.use('/api/', [SummonerRoute]);

// add custom error handler middleware as the last middleware
app.use(ErrorHandlerMiddleware);
//start listening on port
const addr = `https://localhost:${envs.port}`;
server.listen(envs.port, () => {
    console.log(`Server Running here 👉 ${addr}${envs.isDev ? '/docs' : ''}`);
})
export default server;

