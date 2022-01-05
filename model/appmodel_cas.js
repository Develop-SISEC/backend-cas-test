//Api Rest Sisec

'user strict';

var sisec = require('../db/conn_cas'); //cambiar las conexiones a secundarias

var Notific = require('send');
const var_dump = require('var_dump');
var console = process.console;

var Consul = function(consul) {
    this.consul = consul.consul;
    this.status = consul.status;
    //this.created_at = new Date();
};

//Login de la app de sisec, retorna el usuario existente
Consul.searchUser = function searchUser(user, result) { //ok
    console.log("Autentificanto a ",user.username);
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
//obtener peticiones del cliente
Consul.getpeticiones = function gettarea(data, result) { //ok
    var filtro;

    console.log(data.params); //(id del cliente);

    if (data.query.estado == undefined) {
        filtro = "";
        data.query.estado = "";
        extra = "";
    } else if (data.query.estado == 'activos') {
        filtro = " and estado!=";
        data.query.estado = "Pendiente";
        extra = " and estado!='terminado' and estado!='cancelado' order by solicitado asc";
    } else if (data.query.estado == 'terminado') {
        filtro = " and estado in(";
        data.query.estado = ['Terminado', 'Cancelado'];
        extra = ")";
    } else {
        filtro = " and estado = ";
        extra = "";
    }
    console.log(filtro + data.query.estado + extra);
    sisec.query("SELECT * FROM peticiones where idCliente = ? " + filtro + "?" + extra, [data.params.id, data.query.estado], function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res);

        }
    });
};


//obetener tareas del cliente 
Consul.getTarea = function gettarea(data, result) { //ok
    var filtro;

    console.log(data.params); //(id del cliente);

    if (data.query.estado == undefined) {
        filtro = "";
        data.query.estado = "";
        extra = "";
    } else if (data.query.estado == 'activos') {
        filtro = "and estado!=";
        data.query.estado = "Pendiente";
        extra = "and estado!='terminado' and estado!='cancelado' order by Limite_Tiempo asc";
    } else {
        filtro = "and estado = ";
        extra = "";
    }
    console.log(filtro + data.query.estado + extra);
    sisec.query("SELECT id_tarea, nombre_tarea, descripcion, estado, limite_tiempo, Usuario_Id_Usuario FROM tarea where id_client = ? " + filtro + "?" + extra, [data.params.id, data.query.estado], function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res);

        }
    });
};

//taer las orts disponible
Consul.getortsdisp = function disports(id, result) { //ok
    console.log("id cliente: ", id); //(id del servicio);

    sisec.query("SELECT * FROM cotizaciones_demo where autorizado!='Pendiente' and numService = ?", id.id, function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

//traer la informacion de  la ort
Consul.getinfoort = function infoort(id, result) { //ok
    console.log("id cliente: ", id); //(id de la ort);

    sisec.query("select a.*, b.*, c.* from productos_demo as a inner join detalle_cotizacion_demo as b on a.id_producto=b.id_producto inner join cotizaciones_demo as c on b.numero_cotizacion=c.numero_cotizacion  where c.numero_cotizacion = ?", id.id, function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

//getcotizCli
Consul.getcotizCli = function getcotizCli(id, result) { //ok
    console.log("id cliente: ", id); //(id del cliente);

    sisec.query("SELECT peticion_coti.*,cotizaciones_demo.* FROM peticion_coti inner join cotizaciones_demo where id_cot = cotizaciones_demo.id_cotizacion and id_pet = ?", id.id, function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

//getcotizCliDetalles
Consul.getcotizDetalles = function getcotizDetalles(id, result) { //ok
    console.log("id cliente: ", id); //(id del cliente);

    sisec.query("SELECT detalle_cotizacion_demo.*,productos_demo.*,marcas_demo.nombre_marca,detalle_cotizacion_demo.descuentoEsp as espProduct FROM detalle_cotizacion_demo inner join productos_demo,marcas_demo where detalle_cotizacion_demo.id_producto = productos_demo.id_producto and productos_demo.id_marca_producto = marcas_demo.id_marca and numero_cotizacion = ?", id.id, function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res);

        }
    });
};

//autorizar cotizacion
Consul.authCotizacion = function getcotizDetalles(data, result) { //ok
    console.log("info auth: ", data); //(id del cliente);

    sisec.query("UPDATE `peticion_coti` SET `estado_cot` = 'Autorizado' WHERE (`id_cot` = ?)", data.cotiz, function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res);

        }
    });
};

//cerrar las cotizaciones no aceptadas
Consul.CerrarCotz = function getcotizDetalles(data, result) { //ok
    console.log("info auth: ", data); //(id del cliente);

    sisec.query("UPDATE `peticion_coti` SET `estado_cot` = 'Cerrado' WHERE (`id_pet` = ?)", data.id_pet, function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res);

        }
    });
};

Consul.getTareaActivas = function gettarea(id, result) { //ok
    console.log("id cliente: ", id); //(id del cliente);

    sisec.query("SELECT id_tarea FROM tarea where id_client = ? and estado != 'Terminado'", id, function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res);

        }
    });
};

Consul.crearTarea = function creartarea(tarea, result) { //ok
    //console.log((tarea.token));
    console.log(tarea);
    //"INSERT INTO `peticiones` (`tipoTarea`, `cateTarea`, `horario1`, `horario2`, `horario3`, `cliente`, `idCliente`, `comentario`, `estado`, `atendido`) VALUES ('?', '?', '?', '?', '?', '?', '?', '?', 'Pendiente', 'S/A')",[tarea.tipo, tarea.name, tarea.fecha1, tarea.fecha2, tarea.fecha_3dias, tarea.cliente, tarea.id, tarea.coment]
    sisec.query("INSERT INTO `peticiones` (`tipoTarea`, `cateTarea`, `horario1`, `horario2`, `horario3`, `cliente`, `idCliente`, `comentario`, `estado`, `atendido`,`solicitado`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'Pendiente', 'S/A',?)", [tarea.tipo, tarea.name, tarea.fecha1, tarea.fecha2, tarea.fecha_3dias, tarea.nomb, tarea.id, tarea.desc, tarea.solicitado], function(err, res) {

        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log(res.insertId);
            //Notific.suscrib(res.insertId, tarea.token);
            //console.log(res);
            result(null, res);
        }
    });
};

Consul.crearEncuesta = function crearencuesta(encu, result) { //ok
    console.log((encu.token));
    sisec.query("INSERT INTO `encuesta_tarea` (`calif`, `coment`, `id_tarea`) VALUES (?, ?, ?)", [encu.rate, encu.coment, encu.idtarea], function(err, res) {

        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });
};

Consul.getAvance = function getavance(data, result) { //ok

    console.log(data);
    sisec.query("SELECT * FROM avance_tarea WHERE `Tarea_Id_Tarea` = ? order by fecha_avance desc", [data.id], function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
}

Consul.updateAvance = function upavance(data, result) { //ok

    console.log("avance: ", data);

    sisec.query("UPDATE `avance_tarea` SET `Porcentaje_Avance` = ? WHERE (`Id_Info` = ?);", [data.percent, data.id], function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
}

Consul.updateTarea = function(data, result) { //ok
    console.log(data);
    sisec.query("UPDATE `peticiones` SET `estado` = ? WHERE (`idpeticiones` = ?)", [data.estado, data.id], function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};

function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

Consul.creartareaServ = function(data, result) { //ok
    console.log(data);

    var mxTime = new Date().toLocaleString("en-US", { timeZone: "America/Cancun" });
    mxTime = new Date(mxTime);

    var mxtime2 = addDays(mxTime, 3);

    console.log("tiempo 2: ", mxtime2)

    fecha = mxTime.toLocaleString();

    sisec.query("INSERT INTO `tarea` (`Nombre_Tareaa`, `Descripcion`, `fecha_creada`, `Fecha`, `Limite_Tiempo`, `Estado`, `Tipo`, `Usuario_Id_Usuario`, `Areas_Privadas_Id_AreaP`, `Cuidad`, `Acciones`, `Categoria`, `OT`, `id_client`, `cobrado`, `type`, `departamento`, `subido`, `solicita`, `val`, `validacionAlmacen`, `materiales`) VALUES ('Pendiente', 'desc', ?, ?, ?, 'Pendiente', 'Con Costo', '37', NULL, '3', '1', 'cat', 'ot', 'clientid', 'cobr', 'tipo', 'dept', 'sub', 'solicits', 'val', 'validalm', 'mat')", [fecha, fecha, mxtime2, data.id], function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};

Consul.updateTareaArea = function(data, result) { //ok
    console.log(data);
    sisec.query("UPDATE `tarea` SET `departamento` = ? WHERE (`id_tarea` = ?)", [data.dep, data.id], function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};

Consul.updateTareafecha = function(data, result) { //ok
    console.log(data);
    sisec.query("UPDATE `tarea` SET `limite_tiempo` = ? WHERE (`id_tarea` = ?)", [data.fecha, data.id], function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};

Consul.remove = function(id, result) { //por asignar (delete)
    /*
        sisec.query("DELETE FROM tasks WHERE id = ?", [id], function(err, res) {

            if (err) {
                console.log("error: ", err);
                result(null, err);
            } else {

                result(null, res);
            }
        });
    */
};


Consul.searchP = function searchpr(data, result) { //ok
    var filtro;

    console.log(data.params); //(id del cliente);

    //busqueda de productos
    if (data.query.estado == undefined) {
        filtro = "";
        data.query.estado = "";
        extra = "";
    } else if (data.query.estado == 'activos') {
        filtro = " and estado!=";
        data.query.estado = "Pendiente";
        extra = " and estado!='terminado' and estado!='cancelado' order by solicitado asc";
    } else if (data.query.estado == 'terminado') {
        filtro = " and estado in(";
        data.query.estado = ['Terminado', 'Cancelado'];
        extra = ") limit 8";
    } else {
        filtro = " and estado = ";
        extra = "limit 8";
    }
    console.log(filtro + data.query.estado + extra);


    //SELECT * FROM productos_demo where concat(nombre_producto,modelo_producto,id_departamento_producto) like '%tornillo%' and tipoProduct = 'Micelaneo' limit 8

    sisec.query(" SELECT * FROM productos_demo where concat(nombre_producto,modelo_producto,id_departamento_producto) like '%?%' " + filtro + "?" + extra, [data.params.id, data.query.estado], function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res);

        }
    });
};

///consultas Tecnicos

//obtener las tareas asignadas
Consul.getTareaTecnico = function(id, result) { //ok
    console.log("raq:", id.id);
    sisec.query("SELECT tarea.*,avance_tarea.*,client.Empresa FROM tarea inner join avance_tarea, client where tarea.Id_Tarea = avance_tarea.Tarea_Id_Tarea and Estado in('Progreso') and avance_tarea.Porcentaje_Avance < 80 and Usuario_Id_Usuario = ? and tarea.id_client = client.id_Client order by Id_Tarea desc", id.id, function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            console.log("resultado es", res);
            result(null, res);
        }
    });
};

//obtener las tareas donde es asistente
Consul.getTareaTecnicoA = function(id, result) { //ok
    console.log("raq2:", id.id);
    sisec.query("SELECT servicios_tecnicos.*,tecnicos.*,tarea.*,avance_tarea.*,client.Empresa FROM servicios_tecnicos inner join tecnicos,tarea,avance_tarea,client where tecnicos.usuario = ? and tecnicos.id_Tecnico = servicios_tecnicos.id_tecnico and servicios_tecnicos.idTarea = tarea.Id_Tarea and servicios_tecnicos.idTarea = avance_tarea.Tarea_Id_Tarea and tarea.Estado in ('Progreso') and avance_tarea.Porcentaje_Avance < 80 and tarea.id_client = client.id_Client order by Id_Tarea desc;", id.id, function(err, res) {
        if (err) {
            //console.log("error: ", err);
            result(null, err);
        } else {
            //console.log(res);
            result(null, res);
        }
    });
};

Consul.getDireccion = function(dat, result) { // ok - id_client solo direccion ver si se puede encriptar
    sisec.query("SELECT * FROM client where id_client = ?", dat.id, function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {

            result(null, res);
        }
    });
};

Consul.getComenCliente = function(dat, result) { // ok - id_client solo direccion ver si se puede encriptar
    sisec.query("SELECT * FROM clientobservacion where id_Client = ?", dat.idCliente, function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {

            result(null, res);
        }
    });
};

Consul.getCometarios = function(dat, result) { // ok - id_client solo direccion ver si se puede encriptar
    sisec.query("SELECT * FROM observaciones where id_serv = ? and obser_visible=1;", dat.id, function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {

            result(null, res);
        }
    });
};

Consul.insComentario = function(dat, result) { // ok - id_client solo direccion ver si se puede encriptar
    sisec.query("INSERT INTO `observaciones` (`observacion`, `fecha`, `id_serv`, `user`,`obser_visible`) VALUES (?, ?, ?, ?,1)", [dat.coment, dat.fecha, dat.id, dat.user], function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {

            result(null, res);
        }
    });
};

Consul.subirFile = function(dat, result) {
    //subir archivos y guardar sus configuraciones de visibilidad
    //poder eliminar los archivos que solo pueda quien lo subio 

    console.log("subir: ", dat)

    sisec.query("INSERT INTO `uploads` (`id_Serv`, `tittle`, `folder`, `file`, `ext`, `dir`, `user`, `date`, `visible`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)", [dat.id, dat.tipo, dat.folder, dat.file, dat.ext, dat.path, dat.user, dat.fecha, dat.visb], function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {

            result(null, res);
        }
    });

    //;

}

Consul.eliminarArchivo = function(dat, result) { // ok - id_client solo direccion ver si se puede encriptar
    sisec.query("DELETE FROM `uploads` WHERE (`id_Upload` = ?)", dat.idupload, function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {

            result(null, res);
        }
    });
};

Consul.getarchivos = function(dats, result) {
    //traer los archivos visibles para los tecnicos 

    var id = dats.id;
    console.log("getarchivos: ", id);


    sisec.query("SELECT * FROM uploads where id_Serv = ? and visible = 1;", id, function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });

}

Consul.getProductosSalida = function(dats, result) {
    //traer las salidas de productos visibles para los tecnicos 

    var id = dats.id;
    console.log("get productos: ", id);


    sisec.query("SELECT cotizaciones_demo.numero_cotizacion, cotizaciones_demo.numService, detalle_cotizacion_demo.id_producto, productos_demo.nombre_producto, productos_demo.modelo_producto , detalle_cotizacion_demo.cantidad,detalle_cotizacion_demo.notaProducto,detalle_cotizacion_demo.aplica,detalle_cotizacion_demo.cantDevol FROM cotizaciones_demo inner join detalle_cotizacion_demo, productos_demo where cotizaciones_demo.numero_cotizacion = detalle_cotizacion_demo.numero_cotizacion and detalle_cotizacion_demo.id_producto = productos_demo.id_producto and detalle_cotizacion_demo.aplica = 'Si' and numService = ?", id, function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });

}

Consul.getinfopeticion = function(dats, result) {
    //traer las salidas de productos visibles para los tecnicos 
    var id = dats.id;

    sisec.query("SELECT * FROM peticiones where idpeticiones = ?", id, function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });

}

Consul.getTareasFull = function(dat, result) { // ok - id_client solo direccion ver si se puede encriptar
    sisec.query("SELECT peticiones.* from peticiones order by peticiones.solicitado desc", function(err, res) {

        var jfinal = {
            data: []
        };

        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            Object.keys(res).forEach(function(key) {
                var row = res[key];
                data = [
                    row.idpeticiones,
                    row.tipoTarea,
                    row.cliente,
                    row.estado,
                    row.idCliente,
                    row.atendido,
                ];
                jfinal.data.push(data);
                //console.log(row.Id_Tarea)
            });

            result(jfinal);
        }
    });
};


Consul.getTecnicoAsignado = function(id, result) { //ok
    console.log("raq:", id.id);
    sisec.query("SELECT tarea.Id_Tarea,tarea.Usuario_Id_Usuario,usuario.* FROM tarea inner join usuario where Id_Tarea = ? and usuario.Id_Usuario = tarea.Usuario_Id_Usuario", id.id, function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};

Consul.getTecnicosAsistente = function(id, result) { //ok
    console.log("raq:", id.id);
    sisec.query("SELECT tecnicos.*,usuario.*,servicios_tecnicos.* FROM tecnicos inner join servicios_tecnicos,usuario where servicios_tecnicos.id_tecnico = tecnicos.id_Tecnico and tecnicos.usuario = usuario.Usuario  and servicios_tecnicos.idTarea = ?", id.id, function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};

//Fecha de modificación  05-01-20229
Consul.getInfoServicio = function(id, result){
    console.log("Obteniendo Información de servicio", id.id);
    //result(null, id.id)
sisec.query("SELECT tarea.*,avance_tarea.*,client.* FROM tarea inner join avance_tarea, client where tarea.Id_Tarea = avance_tarea.Tarea_Id_Tarea and tarea.id_client = client.id_Client and tarea.Id_Tarea = ?",[id.id],function(err,res){
    if(err){
    console.log("Error al traer información de servicio", err);
    result(null, err);
    }else{
        console.log("Información de servicio: ", res);
        result(null, res);
    }
});
};



//INSERT INTO `siseccom_api-rest`.`matriz_has_usuarios` (`Usuario_idCuenta`, `matriz_idmatriz`) VALUES ('4', '1');

module.exports = Consul;