'use strict';
var Consul = require('../model/appmodel_cas');
const var_dump = require('var_dump');
exports.doSomething = function(req, res) {
    //var data = req.body.data
    var data="hola";
    console.log(data);
    res.send(data);
}
exports.searchU = function(req, res) { //post

    var userD = req.body;

    //console.log(req);

    if (userD == undefined) {
        res.send("Ningun dato recibido");
    } else {
        Consul.searchUser(userD, function(err, task) {
            //console.log(userD);
            if (err)
                res.send(err);

            //console.log('res:', task);
            res.send(task);
        });
    }
};
