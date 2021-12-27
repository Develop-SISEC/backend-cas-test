'use strict';

module.exports = function(app) {
    var ctrl = require('../controller/controller_cas');
    ////////////////////
    app.route('/prueba')
        .get(ctrl.doSomething)

    app.route('/login')
    .post(ctrl.searchU); //sistema de login username, password, tipo(cliente o tecnico)


};