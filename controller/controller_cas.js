//Api Rest Sisec

'use strict';

var Consul = require('../model/appmodel_cas');
const var_dump = require('var_dump');
var Notific = require('send');
var fs = require('fs');

var console = process.console;
//Datos Recibidos: username, password, tipo

exports.doSomething = function(req, res) {
    var data = req.body
    console.log(data);
}

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
//getpeticiones
exports.getpeticiones = function(req, res) { //get
    var datas = req;
    Consul.getpeticiones(datas, function(err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};


//Datos recibidos: id
exports.getTarea = function(req, res) { //get
    var datas = req;
    Consul.getTarea(datas, function(err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};

//Datos recibidos: desc, fecha_actual, fecha_actual, fecha_3dias, id
exports.crearTarea = function(req, res) { //post
    var data = req.body;
    Consul.crearTarea(data, function(err, task) {
        if (err)
            res.send(err);

        //Notific.suscrib(data.insertId, data.token);
        res.json(task);
    });
};


//Datos recibidos: id tarea
exports.getavance = function(req, res) { //get avance de una tarea 
    var data = req.params;
    Consul.getAvance(data, function(err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
}

//traer orts disponibles al usuario
exports.getortsdisp = function(req, res) { //get avance de una tarea 
    var data = req.params;
    Consul.getortsdisp(data, function(err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
}

//get informacion de la ort selecionada
exports.getinfoort = function(req, res) { //get avance de una tarea 
    var data = req.params;
    Consul.getinfoort(data, function(err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
}

exports.updAvance = function(req, res) { //post
    var data = req.body;

    Consul.updateAvance(data, function(err, task) { //if get req.params | if post req.body or form-data req.fields
        if (err)
            res.send(err);
        res.json(task);
    });
};

exports.getTecticoA = function(req, res) { //get avance de una tarea 
    var data = req.params;

    var resultado = {
        asig: [],
        asis: []
    };

    Consul.getTecnicoAsignado(data, function(err, task) {
        if (err)
            res.send(err);

        resultado.asig.push(task);
        Consul.getTecnicosAsistente(data, function(err, task2) {
            if (err)
                res.send(err);
            resultado.asis.push(task2);
            res.json(resultado);
        });
    });
}

//Datos recibidos: id tarea //////////////////////////
exports.searchp = function(req, res) { //get avance de una tarea 
    var data = req.params;
    Consul.searchP(data, function(err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
}


//Datos: recibidos id
exports.updatetarea = function(req, res) { //post
    var data = req.body;

    if (data.estado == 'Confirmado') {
        Consul.updateTarea(data, function(err, task) { //if get req.params | if post req.body or form-data req.fields
            if (err)
                res.send(err);
            res.json(task);
        });
    } else {
        Consul.updateTarea(data, function(err, task) { //if get req.params | if post req.body or form-data req.fields
            if (err)
                res.send(err);
            //res.json(task);
        });

        Consul.updateTareafecha(data, function(err, task) { //if get req.params | if post req.body or form-data req.fields
            if (err)
                res.send(err);
            res.json(task);
        });
    }


};


exports.actualizarPeticion = function(req, res) { //post
    var data = req.body;
    console.log("estasdo: ", data.estado);

    //verificar lo que llega 

    if (data.estado1 == "Aceptado") {

        Consul.creartareaServ(data, function(err, task1) {
            if (err) {

            } else {
                console.log(task1)
                Consul.updateTarea(data, function(err, task2) { //if get req.params | if post req.body or form-data req.fields
                    if (err)
                        res.send(err);
                    console.log(task2)
                    res.json(task2);
                });
            }
        })
    } else { //rechazado

        var mxTime = new Date().toLocaleString("en-US", { timeZone: "America/Cancun" });
        mxTime = new Date(mxTime);
        fecha = mxTime.toLocaleString();

        data.fecha = fecha;

        Consul.updateTarea(data, function(err, task) { //if get req.params | if post req.body or form-data req.fields
            if (err)
                res.send(err);
            res.json(task);
        });
    }


};

exports.updatetarea2 = function(req, res) { //post
    var data = req.body;

    Consul.updateTarea(data, function(err, task) { //if get req.params | if post req.body or form-data req.fields
        if (err)
            res.send(err);
        res.json(task);
    });
};

//Datos: recibidos id
exports.setFecha = function(req, res) { //post
    var data = req.body;
    Consul.updateTarea(data, function(err, task) { //if get req.params | if post req.body or form-data req.fields
        if (err)
            res.send(err);
        res.json(task);
    });
};

//Datos recibidos: rate, coment, idtarea
exports.crearEncuesta = function(req, res) { //post
    var data = req.body;
    Consul.crearEncuesta(data, function(err, task) { //if get req.params | if post req.body 
        if (err)
            res.send(err);
        res.json(task);
    });
};

exports.delete_a_task = function(req, res) { //get
    Consul.remove(req.params.taskId, function(err, task) {
        if (err)
            res.send(err);
        res.json({
            message: 'Task successfully deleted'
        });
    });
};

////////////Tecnicos o interno /////////////////////////////

exports.getpeticionesinfo = function(req, res) { //get trae las tareas asignadas del tecnico mediante su id
    var data = req.params;

    Consul.getinfopeticion(data, function(err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};

//getcotizC
exports.getcotizC = function(req, res) { //get trae las tareas asignadas del tecnico mediante su id
    var data = req.params;

    Consul.getcotizCli(data, function(err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};

//getcotizDetalles
exports.getcotizDeta = function(req, res) { //get trae las tareas asignadas del tecnico mediante su id
    var data = req.params;

    Consul.getcotizDetalles(data, function(err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};

//autorizar cotizacion del cliente, cliente envia el id de peticion y de cotizacion
exports.authCotiz = function(req, res) { //get trae las tareas asignadas del tecnico mediante su id
    var data = req.body;

    Consul.CerrarCotz(data, function(err, task) {
        if (err)
            res.send(err);
        Consul.authCotizacion(data, function(err, task) {
            if (err)
                res.send(err);
            res.json(task);
        });
    });
};

exports.getTareaTech = function(req, res) { //get trae las tareas asignadas del tecnico mediante su id
    var data = req.params;
    Consul.getTareaTecnico(data, function(err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};

exports.getTareaTech2 = function(req, res) { //get trae las tareas asistente del tecnico mediante su id
    var data = req.params;
    Consul.getTareaTecnicoA(data, function(err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};

exports.getDireccion = function(req, res) { //get
    var data = req.params;
    Consul.getDireccion(data, function(err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};

//enviar el listado de productos para salida del tecnico
exports.salidaprodlist = function(req, res) {
    var data = req.params; //el id de capeta
    console.log("sendlist: ", req.params);
    Consul.getProductosSalida(data, function(err, task) {
        if (err) {
            res.send(err);
        } else {
            res.json(task);
        }
    });
};

exports.deleteFile = function(req, res) { //get
    var data = req.params;
    console.log("delete file: ", req.params.id);
    console.log("id file: ", req.query);


    Consul.eliminarArchivo(req.query, function(err, task) {
        if (err) {
            console.log(err);
        } else {
            console.log(task);
            fs.unlink('../cas/serv-files/' + req.params.id + "/JPG/" + req.query.file, (err) => {
                if (err) console.log(err);
                console.log('successfully deleted' + req.query.file);
            });
        }
    });

};

//metodo para descargar archivos
// ./tecnico/tarea/download/1?name=ortPRUEBA.pdf
exports.sendPDF = function(req, res) { //get req.params

    var namD = req; //el id de capeta

    console.log(namD.params.id); //id de carptea
    //console.log(namD.query.name); //name del archivo a descargar

    const testFolder = '../cas/serv-files/' + namD.params.id + "/JPG/" + namD.query.name; //ruta de otros archivos segun la carpeta del servicio
    console.log(testFolder);

    res.download(testFolder);

    //solicitar el id y el nombre del archivo a descargar y con el download de ionic descargo el pdf

};

//enviar el listado de archivos por get /tecnico/tarea/files/1
exports.sendlist = function(req, res) {

    var data = req.params; //el id de capeta

    console.log("sendlist: ", req.params);

    Consul.getarchivos(data, function(err, task) {
        if (err) {
            res.send(err);
        } else {
            res.json(task);
        }
    });

    /*
    const testFolder = '../cas/serv-files/' + req.params.id + '/JPG/'; //ruta de otros archivos segun la carpeta del servicio
    console.log(testFolder);
    fs.readdir(testFolder, function(err, flist) { //obtener lista de archivos
        if (err) console.log(err);
        res.send(flist);
    });*/
};

//metodo para subir un archivo al servidor 
//
exports.subirArch = function(req, res) { //post req.fields / req.files
    //agregar la ruta del servicio segun el id o carpeta del servicio
    //
    var info = req.body;
    console.log("archivo11: ", req.files.archivo.name);

    var dir2 = '../cas/serv-files/' + req.params.id + '/JPG/' + req.files.archivo.name;
    var dir = '/home/siseccom/public_html/cas/serv-files/' + req.params.id + '/JPG/' + req.files.archivo.name;


    if (!fs.existsSync(dir2)) {
        fs.writeFile('../cas/serv-files/' + req.params.id + '/JPG/' + req.files.archivo.name, req.files.archivo.data, function(err) {
            if (err) {
                return console.log(err);
            } else
                console.log("The file was saved!")
            res.send("The file was saved!");
        });
    }

};

//metodo para recibir los datos para la ort
//
exports.datsORT = function(req, res) { //post req.fields / req.files
    var info = req.body;

    console.log("labores1 ort: ", req.fields);
    console.log("labores2 ort: ", req.body);
    console.log("archivos ort: ", req.files.name);


    /*

    var dir2 = '../cas/serv-files/' + req.params.id + '/JPG/' + req.files.archivo.name;
    var dir = '/home/siseccom/public_html/cas/serv-files/' + req.params.id + '/JPG/' + req.files.archivo.name;


    if (!fs.existsSync(dir2)) {
        fs.writeFile('../cas/serv-files/' + req.params.id + '/JPG/' + req.files.archivo.name, req.files.archivo.data, function(err) {
            if (err) {
                return console.log(err);
            } else
                console.log("The file was saved!")
            res.send("The file was saved!");
        });
    }*/

};

exports.insertFile = function(req, res) { //post
    var data = req.body;
    console.log("info file: ", data)

    Consul.subirFile(data, function(err, task) {
        if (err) {
            res.send(err);
        } else {
            if (data.tipo == "ORT") {
                console.log("ORT:");

                var avance = {
                        percent: 70,
                        id: data.id
                    } //11913

                Consul.updateAvance(avance, function(err, task) {
                    if (err)
                        res.send(err);

                    var jsun = {
                        dep: "Almacen",
                        id: data.id
                    }

                    Consul.updateTareaArea(jsun, function(err, task) {
                        if (err)
                            res.send(err);
                        res.json(task);
                    });
                });



            } else {
                console.log("Evidencia:");
                res.json(task);
            }

        }
    });
};

//metodo obetener comentarios del cliente
exports.getComenClient = function(req, res) { //get
    var data = req.params; //idCliente
    Consul.getComenCliente(data, function(err, task) {
        if (err) {
            res.send(err);
        } else {
            res.json(task);
        }
    });
};

//Metodo get, traer comentarios de un servicio
exports.getComentsID = function(req, res) { //get
    var data = req.params;
    Consul.getCometarios(data, function(err, task) {
        if (err) {
            res.send(err);
        } else {
            res.json(task);
        }
    });
};

//insertar nuevo comentario de un servicio post
//dat.coment, dat.fecha, dat.id, dat.user
exports.crearComentario = function(req, res) { //post
    var data = req.body;
    Consul.insComentario(data, function(err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};

//obtener todas las tareas, quiza cambiar a peticiones
exports.getTareasF = function(req, res) { //get
    var data = req.params;
    Consul.getTareasFull(data, function(err, task) {
        if (err) {
            res.send(err);
        } else {
            res.json(task);
        }
    });
};

/////////////////////////////////////////////////////////////////////////////
////////////////////////////////Notificaciones///////////////////////////////

exports.sendnotifi = function(req, res) { //get
    var data = req.body;
    console.log(data);
    Notific.notifTopic(data.topicz, data.msg, function(err, task) {
        if (err)
            res.send(err);
    });
};

exports.subsc = function(req, res) { //post
    var data = req.body;
    console.log("data ", data);

    Consul.getTareaActivas(data.user, function(err, task) {
        if (err)
            res.send(err);

        //res.json(task);
        //console.log("task: ", task);
        Notific.setupSubs(task, data.token);
        //console.log("json: ", res.json(task));
    });

};
//Fecha de Modificacion 05-01-2022
exports.getInfoService = function(req, res){
    var data = req.params;
    Consul.getInfoServicio(data, function(err, task){
if(err){
    res.send(err);
}else{
res.json(task);
}
});

};

/////////////////// fin insertar usuario//////////