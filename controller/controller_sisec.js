//Api Rest Sisec

'use strict';

var Consul = require('../model/appmodel_sisec');
const var_dump = require('var_dump');
var Notific = require('send');
var fs = require('fs');

var console = process.console;

exports.searchU = function(req, res) { //post

    var userD = req.body;

    //console.log(req);

    if (userD == undefined) {
        res.send("Ningun dato recibido");
    } else {
        Consul.searchUser(userD, function(err, task) {
            console.log("Recibiendo datos para autentificar", userD);
            if (err)
                res.send(err);

            //console.log('res:', task);
            res.send(task);
        });
    }
};