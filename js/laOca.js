function LaOca2FichasBuilder(){
	this.crearTablero=function(){
		var tablero = new Tablero();
		return tablero;
	}
	this.crearFichas=function(){
		var coleccionFichas=[new Ficha("roja"),new Ficha("azul")];
		return coleccionFichas;
	}
	this.crearJuego=function(){
		return new LaOca(this.crearTablero(),this.crearFichas(),2);
	}
}

function CasillasFactory(tablero){
	this.tablero=tablero;
	this.crearCasillaNormal=function(posicion){
		return new Casilla(posicion,new Normal(),this.tablero);
	}
	this.crearCasillaPosada=function(posicion){
		return new Casilla(posicion,new Posada(),this.tablero);
	}
	this.crearCasillaOca=function(posicion,siguiente){
		return new Casilla(posicion,new Oca(siguiente),this.tablero);
	}
	this.crearCasillaPuente=function(posicion,siguiente){
		return new Casilla(posicion, new Puente(siguiente),this.tablero);
	}
	this.crearCasillaDados=function(posicion,siguiente){
		return new Casilla(posicion, new Dados(siguiente),this.tablero);
	}
	this.crearCasillaLaberinto=function(posicion){
		return new Casilla(posicion,new Laberinto(),this.tablero);
	}	
	this.crearCasillaCarcel=function(posicion){
		return new Casilla(posicion,new Carcel(),this.tablero);
	}
	this.crearCasillaCalavera=function(posicion){
		return new Casilla(posicion,new Calavera(),this.tablero);
	}
}

function LaOca(tablero, coleccionFichas,numeroJugadores){
	this.tablero = tablero;
	this.coleccionFichas=coleccionFichas;
	this.coleccionJugadores=[];
	this.turno=undefined;
	this.fase=undefined;
	this.numeroJugadores=numeroJugadores;

	this.asignarFicha=function(jugador){
		var enc=false;
		for(f in this.coleccionFichas){
			if (this.coleccionFichas[f].libre){
				enc=true;
				this.coleccionFichas[f].libre=false;
				this.coleccionFichas[f].casilla=this.tablero.casillas[1];
				this.coleccionFichas[f].asignarJugador(jugador);
				jugador.ficha=this.coleccionFichas[f];
				this.coleccionJugadores.push(jugador);
				break;
			}
		};
		if (!enc){
			console.log("Ya no quedan fichas libres");
		}
	};
	this.setTurno=function(jugador){
		this.turno=jugador;
		jugador.turno=new MeToca();
	}
	this.cambiarTurno=function(jugador){
		var indice=this.coleccionJugadores.indexOf(jugador);
		var siguienteIndice=(indice+1)%(this.coleccionJugadores.length);
		this.setTurno(this.coleccionJugadores[siguienteIndice]);
		jugador.turno=new NoMeToca();
	}
	this.iniciarJuego=function(){
		this.fase=new FaseInicio(this);
	}

	this.iniciarJuego();
}

function FaseInicio(juego){
	this.juego=juego;
	this.asignarFicha=function(jugador){
		this.juego.asignarFicha(jugador);
		if (this.juego.coleccionJugadores.length==this.juego.numeroJugadores){
			this.juego.fase=new FaseJugar(this.juego);
		}
	}
	this.lanzar=function(jugador){
		console.log("Todavía no puedes lanzar los dados");
	}
}

function FaseJugar(juego){
	this.juego=juego;
		this.asignarFicha=function(jugador){
			console.log("Ahora no se puede escoger ficha");
	}

	this.lanzar=function(jugador){
		jugador.turno.lanzar(jugador);		
	}
}

function Tablero(){
	this.casillas=[];
	this.iniciarTablero=function(){
		this.casillas[0]="El Juego de la Oca";
		for(i=1;i<=63;i++){
			this.casillas[i]=casillasFactory.crearCasillaNormal(i);
			this.casillas[i].asignarTablero(this);
		}
	};

	// this.asignarCasilla=function(posicion,tema){
	// 	this.casillas[posicion].tema=tema;
	// }

	this.configurarTablero=function(){
		this.casillas[6] = casillasFactory.crearCasillaPuente(6,12);
		this.casillas[12] = casillasFactory.crearCasillaPuente(12,6);		
		this.casillas[19] = casillasFactory.crearCasillaPosada(19);
		this.casillas[26] = casillasFactory.crearCasillaDados(25,53);
		this.casillas[53] = casillasFactory.crearCasillaDados(53,26);		
		this.casillas[42] = casillasFactory.crearCasillaLaberinto(42);
		this.casillas[52] = casillasFactory.crearCasillaCarcel(52);
		this.casillas[58] = casillasFactory.crearCasillaCalavera(58);
		this.casillas[5] = casillasFactory.crearCasillaOca(5,9);
		this.casillas[9] = casillasFactory.crearCasillaOca(9,14);
		this.casillas[14] = casillasFactory.crearCasillaOca(14,18);				
		this.casillas[18] = casillasFactory.crearCasillaOca(18,23);		
		this.casillas[23] = casillasFactory.crearCasillaOca(23,27);		
		this.casillas[27] = casillasFactory.crearCasillaOca(27,32);
		this.casillas[32] = casillasFactory.crearCasillaOca(32,36);
		this.casillas[36] = casillasFactory.crearCasillaOca(36,41);
		this.casillas[41] = casillasFactory.crearCasillaOca(40,45);
		this.casillas[45] = casillasFactory.crearCasillaOca(45,50);
		this.casillas[50] = casillasFactory.crearCasillaOca(50,54);
		this.casillas[54] = casillasFactory.crearCasillaOca(54,59);
		this.casillas[59] = casillasFactory.crearCasillaOca(59,63);		
	}

	this.moverSinCaer=function(ficha,posicion){
		ficha.nuevaCasilla(this.casillas[posicion]);
	}

	this.desplazar=function(ficha,posicion){
		var nuevaPosicion=ficha.getPosicion()+posicion;
		if (nuevaPosicion > 63){
			nuevaPosicion = 63-nuevaPosicion%63;
		};
		return nuevaPosicion;
	}

	this.mover=function(ficha,posicion){
		var nuevaPosicion = this.desplazar(ficha,posicion);
		ficha.cae(this.casillas[nuevaPosicion]);
	}

	casillasFactory=new CasillasFactory(this);
	this.iniciarTablero();
	this.configurarTablero();
}

function Casilla(posicion, tema, tablero){
	this.posicion=posicion;
	this.tema=tema;
	this.tablero=tablero;
	this.moverSinCaer=function(ficha,posicion){
		this.tablero.moverSinCaer(ficha,posicion);
	}
	this.mover=function(ficha,posicion){
		this.tablero.mover(ficha,posicion);
	}
	this.cae=function(ficha){
		this.tema.cae(ficha);
	}
	this.asignarTablero=function(tablero){
		this.tablero=tablero;
	}
}

function Normal(){
	this.titulo="Normal";
	this.cae=function(ficha){
		console.log("Casilla normal");
		ficha.cambiarTurno();
	}
}

function Puente(otroPuente){
	this.titulo="Puente";
	this.otroPuente=otroPuente;
	this.cae=function(ficha){
		//mover la ficha al otro puente y decirle que tire de nuevo
		console.log("De puente a puente y tiro porque me lleva la corriente");
		ficha.moverSinCaer(this.otroPuente);
	}
}

function Oca(otraOca){
	this.titulo="Oca";
	this.otraOca=otraOca;
	this.cae=function(ficha){
		console.log("De Oca a Oca y tiro porque me toca");
		ficha.moverSinCaer(this.otraOca);
	}
}

function Posada(){
	this.titulo="Posada";
	this.cae=function(ficha){
		console.log("Caíste en la Posada");
	}
}

function Dados(otrosDados){
	this.titulo="Dados";
	this.otrosDados=otrosDados;
	this.cae=function(ficha){
		//mover la ficha al otro puente y decirle que tire de nuevo
		console.log("De dado a dado y tiro porque me ha tocado");
		ficha.moverSinCaer(this.otrosDados);
	}
}

function Laberinto(){
	this.titulo="Laberinto";
	this.cae=function(ficha){
		console.log("Caíste en el Laberinto");
	}
}

function Carcel(){
	this.titulo="Carcel";
	this.cae=function(ficha){
		console.log("Caíste en la Cárcel");
	}
}

function Calavera(){
	this.titulo="Calavera";
	this.cae=function(ficha){
		console.log("Caíste en la Calavera");
	}
}

function Ficha(color){
	this.color=color;
	this.libre=true;
	this.casilla=undefined;
	this.jugador=undefined;
	this.asignarJugador=function(jugador){
		this.jugador=jugador;
	}
	this.moverSinCaer=function(posicion){
		this.casilla.moverSinCaer(this,posicion);
	}
	this.nuevaCasilla=function(casilla){
		this.casilla=casilla;
	}
	this.mover=function(posicion){
		this.casilla.mover(this,posicion);
	}
	this.getPosicion=function(){
		return this.casilla.posicion;
	}

	this.cae=function(casilla){
		this.casilla=casilla;
		this.casilla.cae(this);
	}
	this.cambiarTurno=function(){
		this.jugador.cambiarTurno();
	}
}

function MeToca(){
	this.lanzar=function(jugador){
		var numero=Math.round(Math.random()*5+1);
		console.log("Tirada: "+numero);
		jugador.ficha.mover(numero);
	}
}

function NoMeToca(){
	this.lanzar=function(jugador){
		console.log("No es tu turno");
	}
}

function Jugador(nombre,juego){
	this.nombre=nombre;
	this.ficha=undefined;
	this.juego=juego;
	this.turno=new NoMeToca();

	this.asignarFicha=function(){
		this.juego.fase.asignarFicha(this);
	}
	this.lanzar=function(){
		this.juego.fase.lanzar(this);
	}
	this.cambiarTurno=function(){
		this.juego.cambiarTurno(this);
	}

}