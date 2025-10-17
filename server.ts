import {createServer} from "https";
import {readFileSync} from "fs";
import next from "next";

const dev = process.env.NODE_ENV !== "production";
const app = next({dev});
const handle = app.getRequestHandler();

const httpsOptions = {
    key: readFileSync("./certs/key.pem"),
    cert: readFileSync("./certs/cert.pem"),
};

app.prepare().then(() => {
    createServer(httpsOptions, (req, res) => {
        handle(req, res);
    }).listen(4000, (err) => {
        if (err) throw err;
        console.log("✅ Frontend HTTPS ready on https://localhost:4000");
    });
});