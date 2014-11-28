var url = "http://127.0.0.1:1337/";

//Funciones de comunicación con el API REST

function ficha(nombre){
	$.getJSON(url+'ficha/'+nombre,function(data){
		mostrarColor(data.color);
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
}