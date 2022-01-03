//Api Rest Sisec

'use strict';

module.exports = function(app) {
    var ctrl = require('../controller/controller_cas');
    console.log("rutas");
    /////////////////////
    // todoList Routes
    ////////////////////
    app.route('/')
        .post(ctrl.doSomething)

    app.route('/login')
        .post(ctrl.searchU); //sistema de login username, password, tipo(cliente o tecnico)

    app.route('/cliente/dir/:id')
        .get(ctrl.getDireccion) //obtener informacion del cliente
        .post()
        .delete();

    app.route('/users/info/:id')
        .get(ctrl.getTecticoA); //busca informacion sobre el usario por su id

    app.route('/cliente/peticiones/:id')
        .get(ctrl.getpeticiones);

    //traer cotizaciones del cliente segun su numero de peticion
    app.route('/cliente/cotizaciones/:id')
        .get(ctrl.getcotizC);

    //traer cotizaciones del cliente segun su numero de peticion
    app.route('/cliente/cotizacionDeta/:id')
        .get(ctrl.getcotizDeta);

    app.route('/cliente/cotizacion/auth')
        .post(ctrl.authCotiz);

    app.route('/search/produc/:name')
        .post(ctrl.searchp);
    ///

    app.route('/cliente/tarea/:id')
        .get(ctrl.getTarea); //trae todas las tareas del cliente se puede usar filtros '/id?estado = xyz'

    app.route('/cliente/tarea/avance/:id')
        .get(ctrl.getavance);

    app.route('/cliente/tarea/fecha/:id')
        .post(ctrl.setFecha);

    app.route('/cliente/tarea')
        .get() //obetener avance de tareas
        .post(ctrl.crearTarea) //generar una nueva tarea (ok)
        .put()
        .delete();

    app.route('/cliente/tarea/mod')
        .post(ctrl.updatetarea) //pasar a un estado nuevo la tarea (Terminado por el cliente)
        .get();

    app.route('/cliente/tarea/encuesta')
        .get()
        .post(ctrl.crearEncuesta) //agregar los resultados de la encuesta de calidad por parte del cliente
        .put()
        .delete();

    ///////////////////////////////////////
    //Tecnicos
    //
    ///////////////////////////////////////

    app.route('/tecnico/tarea/:id')
        .get(ctrl.getTareaTech)
        .post();

    app.route('/tecnico/tareaAs/:id')
        .get(ctrl.getTareaTech2)
        .post();

    app.route('/servicio/tarea/mod')
        .post(ctrl.updatetarea2) //pasar a un estado nuevo la tarea (Terminado por el cliente)
        .get();

    app.route('/servicio/peticion/:id')
        .post(ctrl.actualizarPeticion) //actualizar el estado de la peticion
        .get(ctrl.getpeticionesinfo); //obtener la peticion completa selecionada del cliente

    app.route('/tecnico/tarea/avance/:id')
        .get(ctrl.getavance)
        .post(ctrl.updAvance);

    app.route('/tecnico/tarea/download/:id')
        .get(ctrl.sendPDF);

    app.route('/tecnico/tarea/upload/:id')
        .post(ctrl.subirArch);

    app.route('/tecnico/tarea/files/:id')
        .get(ctrl.sendlist) //obtener lista de achivos
        .post(ctrl.insertFile) //subir archivo
        .delete(ctrl.deleteFile); //eliminar archivo

    app.route('/tecnico/tarea/ort/:id')
        .post(ctrl.datsORT) //llenar ort

    app.route('/tecnico/getAll')
        .get(ctrl.getTareasF);

    app.route('/cliente/tarea/coments/:id')
        .get(ctrl.getComentsID)
        .post(ctrl.crearComentario);

    app.route('/cliente/coments/:idCliente')
        .get(ctrl.getComenClient);

    app.route('/tecnico/tarea/prods/:id')
        .get(ctrl.salidaprodlist);

    app.route('/tecnico/tarea/ortsd/:id')
        .get(ctrl.getortsdisp);

    app.route('/tecnico/tarea/ortinfo/:id')
        .get(ctrl.getinfoort);





    //////////////////////////////////////////
    //Notificaciones
    //////////////////////////////////////////
    app.route('/notficacion/prueba') //sistema de notificaciones de prueba a un dispositivo
        .post(ctrl.sendnotifi);

    app.route('/notficacion/cliente/subs') //Siscribir a los clientes
        .post(ctrl.subsc)
        //#endregion

};