//instalar express en este ejemplo si no lo teníamos

var fs=require("fs");
var config=JSON.parse(fs.readFileSync("./server/config.json"));
var host=config.host;
var port=config.port;
var exp=require("express");
var application_root = __dirname,
	path = require('path');
var modulo = require('./server/laOca.js');
var juego;
var tablero;
var jugador;

var app=exp(); 

app.use('/',exp.static(__dirname));

app.get("/",function(request,response){
	var contenido=fs.readFileSync("./client/index-juego.html");
	response.setHeader("Content-type","text/html");
	response.send(contenido);
});

app.get("/reset",function(request,response){
	iniJuego();
	console.log("Fase:"+juego.fase.nombre);
	var jsonData={
		"fase" : juego.fase.nombre
	};
	response.send(jsonData);
});

app.listen(port,host);

function iniJuego(){
	var	colores=["rojo","azul","verde"];
	juego = (new modulo.LaOcaFactory(colores)).crearJuego();
	//tablero = new modulo.Tablero();
	//var coleccionFichas=[new modulo.Ficha("roja"),new modulo.Ficha("azul"),new modulo.Ficha("verde")];
	//juego = new modulo.LaOca(tablero, coleccionFichas,2);
}