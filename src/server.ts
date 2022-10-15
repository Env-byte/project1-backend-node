import express, {Application} from 'express';
import envs from "./environment";

// import the routes
import testRoute from "./routes/test";
import swaggerRoute from "./routes/swagger";

const https = require('https');
const app: Application = express();

const server = https.createServer({key: envs.ssl.key, cert: envs.ssl.cert}, app);

app.use(express.json());

//add routes
let routes = [testRoute]
if (envs.isDev) {
    //if dev use swagger
    routes.push(swaggerRoute);
}
app.use('/', routes);

//start listening on port
server.listen(envs.port, () => {
    console.log(`Server Running here 👉 https://localhost:${envs.port}${envs.isDev ? '/docs' : ''}`);
})

