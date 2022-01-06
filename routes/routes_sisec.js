//Api Rest Sisec

'use strict';
module.exports = function(app) {
    var ctrl = require('../controller/controller_sisec');

    app.route('/login2')
        .post(ctrl.searchU); //sistema de login username, password, tipo(cliente o tecnico)
};