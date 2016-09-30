var url="http://127.0.0.1:5000/";
var intervalo;
var intervaloTirada;
var numeroFichas;
var id,nombre,color,posicion;
var	socket= io.connect(url);

function crearUnirse(){
	mostrarPartidas();
	cargarTablero();
	$('#j1').append('<p id="crear"><button id="crear">Crear nueva partida</button></p>');
	$('#crear').on("click",crearPartida);
}

function crearPartida(){
	$('#crear').remove();
	$('#lista').remove();
	//cargarTablero();
	configurar();
}

function mostrarPartidas(){
	$.getJSON(url+"partidas",function(data){	
		if (data.length>0)
		{
			for(var i in data){
				$('#lista').append("<p id='idp"+i+"'><b>Partida:</b>"+data[i].nombre+" <b>Fichas:</b>"+data[i].numFich+" <b>Jugadores:</b>"+data[i].numJug+"</p>");
				if (data[i].numJug<data[i].numFich){
					$('#idp'+i).append(" <button id='unir' onclick='unirse("+data[i].id+")'>Jugar</button>");
				}
			}
		}
		else{
			$('#lista').append('No hay partidas creadas');
		}
	})
}

function unirsePartida(){
	$('#crear').remove();
	//cargarTablero();
}

function unirse(numero){
	//console.log(numero);
	unirsePartida();
	$('#unir').remove();
	id=numero;
	$('#lista').remove();
	ini();
}

function configurar(){
	$('#j1').append('<p id="conf">Número de jugadores: <input type="number" id="numJug" min="2" max="5"> <button id="b0">Número de jugadores</button></p>');
	$('#b0').on("click",function(){	
		var numero=$('#numJug').val();
		$('#conf').remove();
		$.getJSON(url+"configurar/"+numero,function(data){
			if (data.id!=undefined){
				//numeroFichas=data.res;
				id=data.id;
				ini();
			}
			else{
				$('#j1').append("<p>No se ha podido configurar el juego<p>");
			}
		});
	});
}

function ini(){
	escuchar();
	if (!nombre){ //$.cookie("nombre")
		$('#j1').append('<p id="entrar">Nombre jugador: <input type="text" id="nombre" > <button id="b1">Pedir Ficha</button></p>');
		$('#b1').on("click",function(){
			nom=$('#nombre').val();
			if (nom==""){
				nom="jug"+(new Date().getTime().toString());
			}
			$.getJSON(url + 'nombre/'+nom+'/'+id, function(data){
				ficha=data;
				//$.cookie("nombre",nom);
				nombre=nom;
				//$.cookie("color",ficha.color);
				color=ficha.color;
				//$.cookie("posicion",ficha.posicion);
				posicion=ficha.posicion;
				//console.log({"id":id,"color":ficha.color});
				socket.emit("listo",{"id":id,"color":ficha.color});
				//esperarAlResto();
				//intervalo=setInterval("haySegundoJugador()", 3000);
				
				//dibujarFichaEn($.cookie("color"),$.cookie("posicion"));
				dibujarFichaEn(color,posicion);
				mostrarJugador(nom,ficha.color,ficha.posicion);
			});		
		});
	}
	else{
		mostrarJugador(nombre,color,posicion);
		//mostrarJugador($.cookie("nombre"),$.cookie("color"),$.cookie("posicion"));
	}
}

function salir(){
	$('#titulo').remove();
	$('#salir').remove();
	$('#home1').remove();
	$('#home2').remove();
	$('#numJug').remove();
	$('#emp').remove();
	$('#tirada1').remove();
	$('#tirada2').remove();
	$('#dados').remove();
	$('#tirar').remove();
	$('#fin').remove();
	var cookies=$.cookie();
	for(var cookie in cookies){
		$.removeCookie(cookie);
	}
	//clearInterval(intervalo);	
	//clearInterval(intervaloTirada);	
	socket.emit("disconnect",{});
	//socket.removeAllListeners();
	//configurar();
	location.reload();
}

function mostrarJugador(nom,color,posicion){
	$('#entrar').remove();	
	$('#j1').append("<p id='home1'>Bienvenido jugador: "+nom+" </p>");
	$('#j1').append("<p id='home2'>Color: "+color+" </p>");
	$('#j1').append("<p><button id='salir'>Salir</button> </p>");
	dibujarFichaEn(color,posicion);
//	dibujarFichaEn($.cookie("color"),posicion);
	$('#salir').on('click',function(){
		salir();	
	})
}

function empezar(){
	$.getJSON(url+"empezar/"+id,function(data){						
						mostrarRival();
						mostrarLanzar(data.turno);
						//mostrarTirada(data.turno,data.casilla,data.fase);						
					})
}

// function haySegundoJugador(){	
// 	$.getJSON(url + 'hayjugadores', function(data){
// 			var num=data.numero;
// 			$('#numJug').remove();			
// 			//$('#j1').append('<p id="numJug">El número de jugadores es: '+num+'</p>');
// 			if (num==numeroFichas){
// 				$('#emp').remove();
// 				$('#j1').append('<p id="emp">Que empiece el juego <button id="b2">Empezar</button></p>');
// 				$('#b2').on('click',function(){
// 					clearInterval(intervalo);
// 					$('#emp').remove();
// 					empezar();
// 				});
// 			}
// 		});
// }

function mostrarRival(){
	$.getJSON(url+"rivales/"+id,function(data){
		for(var i in data){
			dibujarFichaEn(data[i].color,data[i].posicion);
		}	
	})
}


function mostrarLanzar(col){
	//console.log("Color: "+color);
	if (col==color) //$.cookie("color"))
	{	
		//$('.error').stop().fadeIn(400).delay(3000).fadeOut(400); //fade out after 3 seconds	
		$('#tirar').remove();
		$('#partida').append("<button id='tirar'>Lanzar dados</button>")
		$('#tirar').on('click',function(){
			//$('#dados').remove();
			$('#tirar').remove();
			tirada();
		});
	}
}

// function mostrarTirada(turno,casilla,fase){
// 	if (turno==$.cookie('nombre')){
// 		$('#partida').append("<p id=tirada1> Estas en la casilla: "+casilla+"</p>");
// 		$('#partida').append("<p id=tirada2> Fase del juego: "+fase+"</p>");
// 		$('#botonTirar').append("<button id='tirar'>Lanzar dados</button>")
// 		$('#tirar').on('click',function(){
// 			$('#tirar').remove();
// 			$('#tirada1').remove();
// 			$('#tirada2').remove();
// 			tirada();
// 		});
// 	}
// 	else{
// 		$('#turno').remove();
// 		$('#partida').append("<p id='turno'>Espera a que te toque<p>");
// 		//intervaloTirada=setInterval("meToca()", 3000);
// 	}
// }

function tirada(){
	//$('#tirada2').remove();
	$('#dados').remove();
	$.getJSON(url+'lanzar/'+nombre+'/'+id,function(data){ //$.cookie('nombre')
		//$('#partida').append('<hr>');		
		//$('#partida').append('<p id="tirada2">Tirada: '+data.tirada+' Posicion: '+data.posicion+' Casilla:'+data.casilla+' Estado:'+data.estado+' Turno:'+data.turno+'</p>');
		//$.cookie("posicion",data.posicion);
		posicion=data.posicion;
		//$.cookie("posRival",data.posRival);
		//dibujarTablero();
		dibujarFichaEn(color,posicion);
	//	dibujarFichaEn($.cookie("color"),$.cookie("posicion"));
		$('#zonaDados').append('<p id="dados">Has sacado un: '+data.tirada+'</p>');
		if (data.casilla=="Oca"){
			$('#dados').append(' >> De Oca a Oca y tiro porque me toca');
		}
		if (data.casilla=="Puente"){
			$('#dados').append(' >> De Puente a Puente y tiro porque me lleva la corriente');
		}
		if (data.casilla=="Calavera"){
			$('#dados').append(' >> Tropiezo con la Calavera y vuelvo a iniciar la carrera');
		}
		if (data.casilla=="Cárcel"){
			$('#dados').append(' >> Entro en la Cárcel y estoy 3 turnos sin inmutarme');
		}
		if (data.casilla=="Posada"){
			$('#dados').append(' >> Entro en la Posada y me quedo dos turnos sin tirada');
		}
		if (data.casilla=="Dados"){
			$('#dados').append(' >> De Dado a Dado y tiro porque me ha tocado');
		}
		if (data.casilla=="Pozo"){
			$('#dados').append(' >> Caigo en el Pozo y me espero a que llegue otro mozo');
		}
		if (data.casilla=="Laberinto"){
			$('#dados').append(' >> Me metí en el Laberinto y estoy dos turnos con el tinto')
		}
		if (data.fase=="Fin"){
			$('#dados').append('<p id="fin">Enhorabuena, ganaste la partida!</p>');
		}
		socket.emit("turno",{"id":id});
		//mostrarRival();
		//mostrarTirada(data.turno,data.casilla,data.fase);		
	})
}

function mostrarFin(colorFicha){
	$('#dados').append('<p id="fin">Fin de la partida, ha ganado la ficha '+colorFicha+'</p>');
}
// function meToca(){
// 	dibujarTablero();
// 	dibujarFichaEn($.cookie("color"),$.cookie("posicion"));
// 	//dibujarFichaEn($.cookie("colorRival"),$.cookie("posRival"));
// 	mostrarRival();
// 	$.getJSON(url + 'turno', function(data){
// 		if (data.turno==$.cookie("nombre")){
// 			$('#turno').remove();
// 			//clearInterval(intervaloTirada);
// 			mostrarTirada(data.turno,data.casilla,data.fase);
// 		}
// 	});
// }

// function tirarDados(){
// 	var numero=Math.round(Math.random()*5 +1);
// 	console.log("Dados: "+numero);
// 	return numero;
// }

function escuchar(){
	socket.on('go',function(){
		empezar();
	});
	socket.on('metoca',function(col){
		dibujarTablero();
		mostrarRival();
		if (col.id==id){
			if (col.fase=="Fin"){
				mostrarFin(col.turno);
			}
			if (col.turno==color){ //$.cookie("color")){
				mostrarLanzar(col.turno);				
			}
		}
	})
	socket.on("disconnect",function(){
		console.log("Socket cerrado");
	})
}


