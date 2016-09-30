

var fs=require("fs");
//var config=JSON.parse(fs.readFileSync("config.json"));
//var host=config.host;
//var port=config.port;
var application_root = __dirname,
    path = require( 'path' ); //Utilities for dealing with file paths
var exp=require("express");
var modulo = require('./server/laOca.js');
var app=exp(); 
var http=require("http");
var server=http.createServer(app);
var io=require("socket.io");
var juego;
//var jugador;
var control;


     //Where to serve static content
     //app.use( exp.static( path.join( application_root, 'site') ) );
//app.use('/',exp.static(__dirname));
app.set('port', (process.env.PORT || 5000));

app.use(exp.static(__dirname + '/'));


control=new modulo.Control();

app.get("/",function(request,response){
     /*
    var contenido=fs.readFileSync("./client/index-juego.html");    
    response.setHeader("Content-type","text/html");    
    response.send(contenido);
    */
    response.sendFile(__dirname+"/client/index-juego.html");
});

app.get("/reset",function(req,res){
    juego=undefined;//modulo.iniJuego("2");
    //socket.emit("disconnect",{ok:"ok"});
    coleccion=[];
    //socket.close();
    res.redirect("/");
})

app.get("/partidas",function(req,res){
    var jsonData=[];
    var juego;
    var nombre;
    if (control.partidas.length!=0){
        for(var i=0;i< control.partidas.length;i++){
            juego=control.partidas[i];
            nombre=juego.coleccionJugadores[0].nombre;
            //console.log("juego: "+juego);
            jsonData.push({"id":i,
                "nombre":nombre,
                "numJug":juego.coleccionJugadores.length,
                "numFich":juego.coleccionFichas.length})
        };
    }
    else{
        jsonData={"res":"no hay partidas"};
    }
    res.send(jsonData);
});

// app.get("/nuevaPartida",function(req,res){
//     var jsonData;
//     var id;
//     id = control.agregarPartida()
// })

app.get("/configurar/:numJug",function(req,res){

    var id;
    id = control.agregarPartida(modulo.iniJuego(req.params.numJug));
    res.send({"id":id});
    // if(!juego){
    //     juego=modulo.iniJuego(req.params.numJug);
    //     if (juego){
    //         res.send({"res":juego.coleccionFichas.length});
    //     }
    //     else{
    //         res.send({"res":0});
    //     }
    // }
    // else{
    //     res.send({"res":juego.coleccionFichas.length});
    // }
});

app.get("/nombre/:nom/:id",function(req,res){
    var jugador;
    var partida;
    partida = control.partidas[req.params.id];
    if (partida){
        jugador=new modulo.Jugador(req.params.nom,partida);
        jugador.asignarFicha();
        if (jugador.ficha){
            var jsonData={
                "color":jugador.ficha.color,
                "posicion":jugador.ficha.casilla.posicion
            };
            res.send(jsonData);
        }
        else{
            res.send("No hay mas huecos, sorry");
        }
    }
    else{
        res.send("Partida no encontrada");
    }
});

app.get("/hayjugadores",function(req,res){
    var jsonData={
        "numero":juego.coleccionJugadores.length
    };
    res.send(jsonData);
});

app.get("/turno",function(req,res){
    var jsonData={
        "turno":juego.turno.nombre,
        "casilla":juego.turno.ficha.casilla.posicion,
        "fase":juego.fase.nombre
    };
    res.send(jsonData);
});

app.get("/lanzar/:nombre/:id",function(req,res){
    var partida = control.partidas[req.params.id];
    var jugador= partida.buscarJugador(req.params.nombre);

    if (jugador){
        jugador.lanzar();
        var jsonData={
            "tirada":jugador.tirada,
            "posicion":jugador.ficha.casilla.posicion,
            "casilla":jugador.ficha.casilla.tema.titulo,
            "estado":jugador.estado.nombre,
            "turno":partida.turno.ficha.color,//juego.turno.nombre,
            "fase":partida.fase.nombre
        };
        res.send(jsonData);        
    }
});

app.get("/rivales/:id",function(req,res){
    var jsonData=[];
    var partida = control.partidas[req.params.id];
    for(var i in partida.coleccionJugadores){
        jsonData.push({"posicion":partida.coleccionJugadores[i].ficha.casilla.posicion,
            "color":partida.coleccionJugadores[i].ficha.color})
    };
    res.send(jsonData);
});

app.get("/empezar/:id",function(req,res){
    var partida = control.partidas[req.params.id];
    if (partida.fase.nombre=="Jugar")
    {
       var jsonData={
            "fase":partida.fase.nombre,
            "turno": partida.turno.ficha.color,//juego.turno.nombre,
            "casilla":partida.turno.ficha.casilla.posicion
        };
        res.send(jsonData);   
    }
    else{
        partida.setTurno(partida.coleccionJugadores[0]);
        partida.iniciarJuego();
        var jsonData={
            "fase":partida.fase.nombre,
            "turno":partida.turno.nombre,
            "casilla":partida.turno.ficha.casilla.posicion
        };
        res.send(jsonData);    
    }
})

console.log("servidor iniciado...");
/*
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
*/
server.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

var socket = io.listen(server);
var coleccion =[];
socket.on('connection',function(client){
    client.on('listo',function(data){
        //console.log(data.id+" "+data.color);
        if (coleccion[data.id]){
            coleccion[data.id].push(data.color);    
        }
        else{
            coleccion[data.id]=[];
            coleccion[data.id].push(data.color);
        }
      //  console.log("numero jug:"+coleccion[data.id].length);
        if (coleccion[data.id].length== control.partidas[data.id].coleccionFichas.length){ //juego.coleccionFichas.length){
            socket.emit("go",{juego:"ok"});
        }
    });
    client.on('turno',function(data){
        var partida=control.partidas[data.id];
        socket.emit("metoca",{"turno":partida.turno.ficha.color,"id":data.id,"fase":partida.fase.nombre});
    });
    client.on("disconnect",function(){
        socket.emit('usuario desconectado');
        //socket.disconnect();
    })
})

