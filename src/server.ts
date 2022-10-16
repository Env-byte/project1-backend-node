import express from 'express';
import envs from "./environment";

// import the routes
import SummonerRoute from "./routes/summonerRoute";
import SwaggerRoute from "./routes/swaggerRoute";

const https = require('https');
const app = express();

const server = https.createServer({key: envs.ssl.key, cert: envs.ssl.cert}, app);

app.use(express.json());

//add routes
let routes = [SummonerRoute]
if (envs.isDev) {
    //if dev use swagger
    routes.push(SwaggerRoute);
}
app.use('/', routes);

//start listening on port
server.listen(envs.port, () => {
    console.log(`Server Running here 👉 https://localhost:${envs.port}${envs.isDev ? '/docs' : ''}`);
})

