var url = "http://127.0.0.1:1337/";

function reset(){
	$.getJSON(url + 'reset',function(data){
		$('#partida').append("<p id='fase'>"+data.fase+"</p>");
	})
}