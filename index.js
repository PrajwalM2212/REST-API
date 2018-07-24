const http = require('http');
const https = require('https');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;
const fs = require('fs');
const config = require('./config');


const httpServer = http.createServer((req, res) => unifiedServer(req, res));
httpServer.listen(config.httpPort, () => console.log(`Server listening on port ${config.httpPort}`));

/*
const httpsServerOptions = new Object({
    key: fs.readFileSync('./https/key.pem'),
    cert: fs.readFileSync('./https/cert.pem'),
});
const httpsServer = https.createServer(httpsServerOptions, (req, res) => unifiedServer(req, res));
httpsServer.listen(5000, () => console.log(`Server listening on port 5000`));
*/

const unifiedServer = (req, res) => {


    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/, '');
    const method = req.method;
    const headers = req.headers;
    const queryObject = parsedUrl.query;

    req.on('error', (err) => {
        console.log(err.stack);
    })

    let decodedString = '';
    decoder = new StringDecoder('utf-8');
    req.on('data', (chunk) => {

        decodedString += decoder.write(chunk);

    }).on('end', () => {

        decodedString += decoder.end();


        const reqData = new Object({
            method,
            trimmedPath,
            headers,
            queryObject,
            reqPaylod: decodedString,

        });


        const handler = typeof (router[trimmedPath]) !== "undefined" ? router[trimmedPath] : handlers.notFound;

        handler(reqData, (statusCode, resPayload) => {


            statusCode = typeof (statusCode) === "number" ? statusCode : 404;

            resPayload = typeof (resPayload) === "object" ? resPayload : {};

            const resPayloadString = JSON.stringify(resPayload);

            res.writeHead(statusCode, {
                'Content-Type': 'application/json'
            });

            res.write(resPayloadString);

            res.end();

        })

    })

}


const handlers = new Object();
handlers.hello = (reqPayload, callback) => {

    const resPayload = { 'hello': 'This is a rest api built with pure nodejs' };

    callback(200, resPayload);

}

handlers.notFound = (reqPayload, callback) => {
    callback(404);
}


const router = new Object({
    hello: handlers.hello
})