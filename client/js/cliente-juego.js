var url = "http://127.0.0.1:1337/";
var intervaloInicio;
var color;

//Funciones de comunicación con el API REST

function ficha(nombre){
	$.getJSON(url+'ficha/'+nombre,function(data){
		color=data.color;
		mostrarColor(data.color);
	})
}

function reset(){
	$.getJSON(url+"reset",function(data){
		window.location.reload();
	})
}

function hayJugadores(){
	$.getJSON(url+"hayJugadores",function(data){
		if (data.res=="ok"){
			clearInterval(intervaloInicio);
			mostrarBotonEmpezar();
		}
	})
}

function turno(){
	$.getJSON(url+"turno/"+color,function(data){
		if (data.res=="MeToca"){
			$('#j1').append("<p>Turno: "+data.turnoº+"</p>")
		}
		else{
			$('#j1').append("<p>Turno: "+data.turno+"</p>")
		}
	})
}

// Funciones de control de la interacción

function pedirFicha(){
	$('#pedirBtn').on("click",function(){
		$('#pedirBtn').remove();
		ficha($('#nombre').val());
	})
}

function mostrarColor(color){
	$('#pedir').remove();
	$('#j1').append("Ficha: "+color);
	intervaloInicio = setInterval("hayJugadores()", 3000);
}

function mostrarBotonEmpezar(){
	$('#j1').append("<p id='emp'><button id='empezar'>A jugar!</button></p>");
	$('#empezar').on("click",function(){
		$('#emp').remove();
		turno();
	})

}
