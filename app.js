"use strict";

// Module Dependencies
// -------------------
const express = require("express");
const http = require("http");
const jwt = require("jwt-simple");
const request = require("request");
const path = require("path");
const util = require('util');



const jwtSignature =
    const jwtSignature =
    "Hw1kLz_GWTeQ_V9_XMhxri0umqJuefZ7_sPbEUAc1n4e9xV0Gyf3i1a6WGxiIlhkvJtqOcH6TvVY0rQkTppIimWozshQTQ7qUsaljWpSDhusj7BhYdjS_Ok13yFTC-em8s2cq-m-DpnuB8X13eXFMSjCGfqq7SXG3sJPAGBi5-eUa-L02fK7c48ecxu9IZTBdPRUuS7x5b60TBmivMp0z0zNz2ChPOu61kl5QgOoNptxJMPn3qLnQrBcd-eKBA2";
/*const jwtSignature = process.env.JB_APP_SIGNATURE;
const client_id = process.env.client_id;
const client_secret = process.env.client_secret;
const dataExtension = process.env.dataExtensionsDestino;*/

var app = express();
app.use(express.json());

// Configure Express
app.set("port", process.env.PORT || 3000);

app.use(express.static(path.join(__dirname, "public")));

app.use(
    require("body-parser").raw({
        type: "application/jwt",
    })
);

// curl -X POST http://localhost:3000/journeybuilder/save/
app.post("/journeybuilder/save", function (req, res) {
    //logging.info('He pasado por logs => save '+body);
    //const body = jwt.decode(req.body.toString("utf8"), jwtSignature);
    //res.sendStatus(200);
    res.sendStatus(200);
});

// curl -X POST http://localhost:3000/journeybuilder/validate/
app.post("/journeybuilder/validate", function (req, res) {
    //logging.info('He pasado por logs => validate '+req.body);
    //const body = jwt.decode(req.body.toString("utf8"), jwtSignature);
    res.sendStatus(200);
});

// curl -X POST http://localhost:3000/journeybuilder/publish/
app.post("/journeybuilder/publish", function (req, res) {
    //logging.info('He pasado por logs => publish '+req.body);
    //const body = jwt.decode(req.body.toString("utf8"), jwtSignature);
    res.sendStatus(200);
});

// curl -X POST http://localhost:3000/journeybuilder/stop/
app.post("/journeybuilder/stop", function (req, res) {
    //logging.info('He pasado por logs => stop '+req.body);
    //const body = jwt.decode(req.body.toString("utf8"), jwtSignature);
    res.sendStatus(200);
});

/*// Funcion que guarda los datos en Data Extensions
function writeDataExtension(token, logdata) {
    var options = {
        method: "POST",
        url: `https://mcwwt77n7vvthpq0k9j7slyptvpm.rest.marketingcloudapis.com/data/v1/async/dataextensions/key:${dataExtension}/rows`,

        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(logdata),
    };

    request.post(options, function (error, response, body) {
        if (error) {
            console.log("- Err writing in log: " + error);
        } else {
            console.log("- Writing to log");
            console.log(response.headers);
        }
    });
}*/

app.post(
    "/journeybuilder/execute",
    function (req, res, next) {
        // return 200 and pass the the work in background
        res.sendStatus(200);

        next();
    },
    function (req, res, next) {
        console.log(
            "==================================================================================="
        );
        //console.log("REQ: ");
        //console.log(util.inspect(req, {depth: null}));
        //console.log("HEADERS: ");
        //console.log(util.inspect(req.headers, {depth: null}));
        console.log("BODY: ", req.body);
        console.log("JWT: ", req.body.toString("utf8"));
        // Decodifica el body que viene en la respuesta
        const body = jwt.decode(req.body.toString("utf8"), jwtSignature);
        console.log("BODY: ", body);
        console.log(
            "==================================================================================="
        );
        /*// Find
        let inArguments = body.inArguments.find((o) => o.nombre !== undefined);

        // 01. Auth to Salesforce
        var options = {
            method: "POST",
            url: "https://mcwwt77n7vvthpq0k9j7slyptvpm.auth.marketingcloudapis.com/v2/token",
            form: {
                grant_type: "client_credentials",
                client_id: client_id,
                client_secret: client_secret,
            },
        };

        request.post(options, function (error, response, body) {
            if (error) {
                console.log("- Can't get the token from salesforce: " + error);
            } else {
                let token = JSON.parse(body);
                token = token.access_token;

                let logdata = {
                    items: [
                        {
                            nombre: inArguments.nombre,
                            email: inArguments.email,
                            descripcion: inArguments.descripcion,
                        },
                    ],
                };
                writeDataExtension(token, logdata);
            }
        });*/
    }
);

http.createServer(app).listen(app.get("port"), function () {
    console.log("Express server listening on port " + app.get("port"));
});
