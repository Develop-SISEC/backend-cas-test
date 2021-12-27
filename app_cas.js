// api rest cas &  pagina sisec
// Cargar modulos y crear nueva aplicacion
const http = require('http');
var https = require('https');
var express = require("express");
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
var cors = require('cors');
const formidable = require('express-formidable');

var cert = fs.readFileSync('cert/cert.pem');
var key = fs.readFileSync('cert/key.pem');

app.use(bodyParser.json()); // soporte para bodies codificados en jsonsupport
app.use(bodyParser.urlencoded({ extended: true })); // soporte para bodies codificados
app.use(cors());

var port = process.env.PORT || 8080; //8080

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
//app.use('/api/users',require('./routes/routes_cas'));
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