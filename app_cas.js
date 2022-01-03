//Api Rest  Cas Sisec
// Cargar modulos y crear nueva aplicacion
var express = require("express");
var app = express();
var bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
var fs = require('fs');
var cors = require('cors');
var http = require('http');
var https = require('https');
var scribe = require('scribe-js')();

//var cert = fs.readFileSync('../../ssl/certs/api_sisec_sisec_com_mx_b1659_f3469_1589989280_644721ea4f8582124033a25d068d762c.crt');
//var key = fs.readFileSync('../../ssl/keys/b1659_f3469_8c329df59f34aae3c8df6329869c9e5f.key');

var cert = fs.readFileSync('cert/cert.pem');
var key = fs.readFileSync('cert/key.pem');

app.use(bodyParser.json());
//app.use(bodyParser.urlencoded());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
const formidable = require('express-formidable');

var port = process.env.PORT || 8080; //8080

//app.use(formidable());
app.use(fileUpload());
app.use(bodyParser.json()); // soporte para bodies codificados en jsonsupport
app.use(bodyParser.urlencoded({ extended: true })); // soporte para bodies codificados
app.use('/logs', scribe.webPanel());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST,DELETE');
    res.header("Content-Type: application/json; charset=UTF-8");
    res.header("Content-Type: application/x-www-form-urlencoded");
    res.header("Content-Type: multipart/form-data");
    next();
});

var routes = require('./routes/routes_cas'); //importing route
routes(app);

/*
var server = app.listen(port, function() {
    console.log('API server started on ' + port);
    console.log(app.get('url'));
});
*/

https.createServer({
    cert: cert,
    key: key,
}, app).listen(port, function() {
    console.log("My https server listening on port " + port + "...");
});