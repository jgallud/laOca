	var rutaImg="client/img/";
	var contexto;
	var colFichas=[];
	var casillas=[];
	var dibujarCasillas=[];
	var imagenes={};
	var rutas={
		dados:rutaImg+"dados.png",
		puente:rutaImg+"puente.png",
		laberinto:rutaImg+"laberinto.png",
		oca:rutaImg+"oca.png",
		posada:rutaImg+"posada.png",
		pozo:rutaImg+"pozo.png",
		calavera:rutaImg+"calavera.png",
		carcel:rutaImg+"carcel.png",
		rojo:rutaImg+"rojo.png",
		azul:rutaImg+"azul.png",
		casillaFinal:rutaImg+"final.jpg",
		verde:rutaImg+"verde.png",
		amarillo:rutaImg+"amarillo.png",
		negro:rutaImg+"negro.png"
	}
	var lista=[];

	var Contenido=function(x,y,tam){
		this.coordX=x;
		this.coordY=y;
		this.tam=tam;
	}

	function calcularSpiral(){
		arr=spiralArray(8);

		for(i=0;i<8;i++){
			for(j=0;j<8;j++){
				text=arr[i][j];//i+'-'+j;
				lista[text]=new Contenido(5+i*65,10+j*65,65);

				//context.fillText(text,10+i*65,20+j*65);
				//context.strokeRect(5+i*65,10+j*65,65,65); 
				/*
				color=parseInt(color,16)-1;
				console.log(color.toString(16));
				context.fillStyle="#"+color.toString(16);
				context.fillRect(5+i*65,10+j*65,65,65);
				*/
				//cordx=12+i*65;
				//cordy=22+j*65;			
				//dibujarCasillas[text](context,cordx,cordy);
			}
		}
	}

	function dibujarTablero(){
		var tab=document.getElementById("tablero");
		var context = tab.getContext('2d');
		var text="";
		var cordx,cordy;
		var texto="#000000";
		var colorRect;
		var cont=1;
		var r=200,g=255,b=255;
		context.clearRect(0,0,tab.width,tab.height);
		contexto=context;		

		//context.moveTo(lista[0].coordX+50,lista[0].coordY+10);
		//colorRect="#6DDFE9";
		colorRect="rgb("+r+","+g+","+b+")";
		for(var i in lista){
			//context.strokeRect(lista[i].coordX,lista[i].coordY,lista[i].tam,lista[i].tam); 			
			if (cont%8 == 0){
				r=200-cont*2;
				g=255-cont*2;
				b=255-cont*2;
				colorRect="rgb("+r+","+g+","+b+")";
			}
			context.strokeRect(lista[i].coordX,lista[i].coordY,lista[i].tam,lista[i].tam); 
			context.fillStyle=colorRect;
			context.fillRect(lista[i].coordX,lista[i].coordY,lista[i].tam,lista[i].tam); 
			context.fillStyle=texto;
			context.fillText(i, lista[i].coordX+5,lista[i].coordY+10);
			cordx= lista[i].coordX+7;//12+i*65;
			cordy= lista[i].coordY+12;//22+j*65;			
			dibujarCasillas[i](context,cordx,cordy);			
			cont++;
		}
	}

	function spiralArray(edge) {
	    var arr = Array(edge),
	        x = 0, y = edge,
	        total = edge * edge--,
	        dx = 1, dy = 0,
	        i = 0, j = 0;
	    while (y) arr[--y] = [];
	    while (i < total) {
	        arr[y][x] = i++;
	        x += dx; y += dy;
	        if (++j == edge) {
	            if (dy < 0) {x++; y++; edge -= 2}
	            j = dx; dx = -dy; dy = j; j = 0;
	       }
	    }
	    return arr;
	}

	function cargarTablero(){
		//cargarDados();
		cargarFunciones();
		cargarImagenes(rutas,dibujarTablero);
		calcularSpiral();
	}

	function cargarFunciones(){
		for(var i=0;i<=63;i++){
			dibujarCasillas[i.toString()]=dibujarNormal;			
		}
		dibujarCasillas["26"] = dibujarDados;
		dibujarCasillas["53"] = dibujarDados;
		dibujarCasillas["6"] = dibujarPuente;
		dibujarCasillas["12"] = dibujarPuente;
		dibujarCasillas["42"] = dibujarLaberinto;
		dibujarCasillas["19"] = dibujarPosada;
		dibujarCasillas["31"] = dibujarPozo;
		dibujarCasillas["52"] = dibujarCarcel;
		dibujarCasillas["58"] = dibujarCalavera;			
		dibujarCasillas["5"] = dibujarOca;
		dibujarCasillas["9"] = dibujarOca;							
		dibujarCasillas["14"] = dibujarOca;
		dibujarCasillas["18"] = dibujarOca;
		dibujarCasillas["23"] = dibujarOca;
		dibujarCasillas["27"] = dibujarOca;
		dibujarCasillas["32"] = dibujarOca;
		dibujarCasillas["36"] = dibujarOca;
		dibujarCasillas["41"] = dibujarOca;
		dibujarCasillas["45"] = dibujarOca;
		dibujarCasillas["50"] = dibujarOca;
		dibujarCasillas["54"] = dibujarOca;
		dibujarCasillas["59"] = dibujarOca;
		dibujarCasillas["63"] = dibujarFinal;																				
	}

	function cargarImagenes(rutas,callback){
		
		var imgCargadas=0;
		var numImg=0;

		for(var src in rutas){
			numImg++;
		}
		for(var src in rutas){
			imagenes[src] = new Image();
			imagenes[src].onload=function(){
				if(++imgCargadas>=numImg){
					callback();
				}
			};
			imagenes[src].src=rutas[src];
		}
	}


	function dibujarNormal(contxt,x,y){

	}

	// function cargarDados(){
	// 	dados=new Image();
	// 	dados.src="../img/dados.png";
	// 	dados.id="dados";
	// 	dados.onload=function(){
	// 		//context.drawImage(dados,x,y,50,50);
	// 		casillas["dados"]=dados;
	// 	}
	// }

	function dibujarDados(context,x,y){
	
		//dados=new Image();
		//dados.src="../img/dados.png";
		//dados.onload=function(){
		//if (casillas["dados"]){
		context.drawImage(imagenes.dados,x,y,50,50); //casillas["dados"]
		//}
	}

	function dibujarPuente(context,x,y){
		//puente=new Image();
		//puente.src="../img/puente.jpg";
		//puente.onload=function(){
		context.drawImage(imagenes.puente,x,y,52,40);
		//}
	}

	function dibujarLaberinto(context,x,y){
		//lab=new Image();
		//lab.src="../img/laberinto.jpg";
		//lab.onload=function(){
		context.drawImage(imagenes.laberinto,x,y,53,49);
		//}
	}

	function dibujarOca(context,x,y){
		//oca=new Image();
		//oca.src="../img/oca.jpg";
		//oca.onload=function(){
		context.drawImage(imagenes.oca,x,y,45,45);
		//}
	}

	function dibujarPosada(context,x,y){
		//ada=new Image();
		//ada.src="../img/posada.jpg";
		//ada.onload=function(){
		context.drawImage(imagenes.posada,x,y,50,45);
		//}
	}

	function dibujarPozo(context,x,y){
		//zo=new Image();
		//zo.src="../img/pozo.png";
		//zo.onload=function(){
		context.drawImage(imagenes.pozo,x,y,59,52);
		//}
	}

	function dibujarCarcel(context,x,y){
	//	carcel=new Image();
	//	carcel.src="../img/carcel.jpg";
	//	carcel.onload=function(){
		context.drawImage(imagenes.carcel,x,y,55,50);
	//	}
	}

	function dibujarCalavera(context,x,y){
	//	calavera=new Image();
	//	calavera.src="../img/calavera.jpg";
	//	calavera.onload=function(){
		context.drawImage(imagenes.calavera,x,y,55,50);
	//	}
	}

	function dibujarFinal(context,x,y){
	//	calavera=new Image();
	//	calavera.src="../img/calavera.jpg";
	//	calavera.onload=function(){
		context.drawImage(imagenes.casillaFinal,x,y,55,50);
	//	}
	}	

	// function cargarFicha(color){
	// 	var ficha=new Image();
	// 	ficha.src="../img/"+color+".png";
	// 	ficha.id=color;
	// 	ficha.onload=function(){
	// 		colFichas.push(ficha);
	// 		//context.drawImage(ficha,x,y,30,30);
	// 	}
	// }

	function dibujarFicha(color,context,x,y){
		//for(var i in colFichas){
		//	if (colFichas[i].id==color){
		if (color){
			context.drawImage(eval("imagenes."+color),x,y,30,30);//colFichas[i]
		}
		//	}
		//}
	}

	function dibujarFichaEn(color,casilla){
		var cas;
		for(i=0;i<8;i++){
			for(j=0;j<8;j++){
				cas=arr[i][j];
				if (cas==casilla){
					dibujarFicha(color,contexto,12+i*65,22+j*65);
				}
			}
		}
	}