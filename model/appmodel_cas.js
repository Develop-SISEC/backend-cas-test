
var sisec = require('../db/conn_cas'); //cambiar las conexiones a secundarias
const var_dump = require('var_dump');
var console = process.console;

var Consul = function(consul) {
    this.consul = consul.consul;
    this.status = consul.status;
    //this.created_at = new Date();
};

//Login de la app de sisec, retorna el usuario existente
Consul.searchUser = function searchUser(user, result) { //ok
    console.log(user.username);
    sisec.query("SELECT * FROM usuario where Usuario= ? and Pass = ? ", [user.username, user.password, user.tipo], function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            if (res == "") {
                res = JSON.stringify({
                    status: "Error no user found"
                });
            }
            console.log('Data: ', res);
            result(res);
        }
    });
};

module.exports = Consul;