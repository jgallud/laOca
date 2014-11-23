
function LaOcaFactory2Fichas(){
	this.crearTablero=function(){
		return new Tablero(new CasillasFactory());
	}
	this.crearFichas=function(){
		return [new Ficha("roja"),new Ficha("azul")];
	}
	this.crearJuego=function(){
		return new LaOca(this.crearTablero(),this.crearFichas(),2);
	}
}

function CasillasFactory(){
	this.crearCasillaNormal=function(posicion, tablero){
		return new Casilla(posicion,new Normal(), tablero);
	}
	this.crearCasillaPosada=function(posicion, tablero){
		return new Casilla(posicion,new Posada(), tablero);
	}
	this.crearCasillaPozo=function(posicion, tablero){
		return new Casilla(posicion,new Pozo(), tablero);
	}
	this.crearCasillaOca=function(posicion,siguiente, tablero){
		return new Casilla(posicion,new Oca(siguiente), tablero);
	}
	this.crearCasillaPuente=function(posicion,siguiente, tablero){
		return new Casilla(posicion, new Puente(siguiente), tablero);
	}
	this.crearCasillaDados=function(posicion,siguiente, tablero){
		return new Casilla(posicion, new Dados(siguiente), tablero);
	}
	this.crearCasillaLaberinto=function(posicion, tablero){
		return new Casilla(posicion,new Laberinto(), tablero);
	}	
	this.crearCasillaCarcel=function(posicion, tablero){
		return new Casilla(posicion,new Carcel(), tablero);
	}
	this.crearCasillaCalavera=function(posicion, tablero){
		return new Casilla(posicion,new Calavera(), tablero);
	}
	this.crearCasillaFin=function(posicion, tablero){
		return new Casilla(posicion, new Fin(), tablero);
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
	//	var jugadorAnterior=this.turno;
		jugador.turno=new MeToca();
	//	this.turno=jugador;
	//	if (jugadorAnterior){
	//		jugadorAnterior.turno=new NoMeToca();
	//	}
	}
	this.miSiguiente=function(jugador){
		var indice=this.coleccionJugadores.indexOf(jugador);;
		var siguienteIndice=(indice+1)%(this.coleccionJugadores.length);
		return this.coleccionJugadores[siguienteIndice];
	}
	this.iniciarJuego=function(){
		this.fase=new FaseInicio(this);
	}

	this.iniciarJuego();
}

function FaseInicio(juego){
	this.juego=juego;
	this.nombre="Inicio";
	this.asignarFicha=function(jugador){
		this.juego.asignarFicha(jugador);
		if (this.juego.coleccionJugadores.length==this.juego.numeroJugadores){
			this.juego.fase=new FaseJugar(this.juego);
		}
	}
	this.lanzar=function(jugador){
		console.log("Todavía no puedes lanzar los dados");
	}

	this.esFin=function(){
		return false;
	}

}

function FaseJugar(juego){
	this.juego=juego;
	this.nombre="Jugar";
		this.asignarFicha=function(jugador){
			console.log("Ahora no se puede escoger ficha");
	}

	this.lanzar=function(jugador){
		jugador.turno.lanzar(jugador);		
	}

	this.esFin=function(){
		return false;
	}
}

function FaseFin(juego){
	this.juego=juego;
	this.nombre="Fin";
	this.asignarFicha=function(jugador){
		console.log("No hay sitio libre");
	};
	this.lanzar=function(ficha,num){
		console.log("Juego finalizado");
	};
	this.esFin=function(){
		return true;
	}
}

function Tablero(casillasFactory){
	this.casillas=[];
	this.casillasFactory = casillasFactory;
	this.iniciarNormal=function(){
		for(i=0;i<=63;i++){
			this.casillas[i]=this.casillasFactory.crearCasillaNormal(i,this);			
		}
	};

	this.configurarTablero=function(){
		this.casillas[6] = this.casillasFactory.crearCasillaPuente(6,12,this);
		this.casillas[12] = this.casillasFactory.crearCasillaPuente(12,6,this);		
		this.casillas[19] = this.casillasFactory.crearCasillaPosada(19,this);
		this.casillas[31] = this.casillasFactory.crearCasillaPozo(31,this);
		this.casillas[26] = this.casillasFactory.crearCasillaDados(26,53,this);
		this.casillas[53] = this.casillasFactory.crearCasillaDados(53,26,this);		
		this.casillas[42] = this.casillasFactory.crearCasillaLaberinto(42,this);
		this.casillas[52] = this.casillasFactory.crearCasillaCarcel(52,this);
		this.casillas[58] = this.casillasFactory.crearCasillaCalavera(58,this);
		this.casillas[5] = this.casillasFactory.crearCasillaOca(5,9,this);
		this.casillas[9] = this.casillasFactory.crearCasillaOca(9,14,this);
		this.casillas[14] = this.casillasFactory.crearCasillaOca(14,18,this);				
		this.casillas[18] = this.casillasFactory.crearCasillaOca(18,23,this);		
		this.casillas[23] = this.casillasFactory.crearCasillaOca(23,27,this);		
		this.casillas[27] = this.casillasFactory.crearCasillaOca(27,32,this);
		this.casillas[32] = this.casillasFactory.crearCasillaOca(32,36,this);
		this.casillas[36] = this.casillasFactory.crearCasillaOca(36,41,this);
		this.casillas[41] = this.casillasFactory.crearCasillaOca(41,45,this);
		this.casillas[45] = this.casillasFactory.crearCasillaOca(45,50,this);
		this.casillas[50] = this.casillasFactory.crearCasillaOca(50,54,this);
		this.casillas[54] = this.casillasFactory.crearCasillaOca(54,59,this);
		this.casillas[59] = this.casillasFactory.crearCasillaOca(59,63,this);
		this.casillas[63] = this.casillasFactory.crearCasillaFin(63,this);				
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

	this.getCasilla=function(num){
		return this.casillas[num];
	}

	this.mover=function(ficha,posicion){
		var nuevaPosicion = this.desplazar(ficha,posicion);
		ficha.cae(this.casillas[nuevaPosicion]);
	}
	this.iniciarNormal();
	this.configurarTablero();
}

function Casilla(posicion, tema, tablero){
	this.posicion=posicion;
	this.tema=tema;
	this.tablero= tablero;
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
		console.log("Caíste en la Posada y pierdes dos turnos");
		ficha.pierdeTurno(new Pierde2Turnos());
		ficha.cambiarTurno();
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

function Pozo(){
	this.titulo="Pozo";
	this.pozo=undefined;
	this.cae=function(ficha){
		if (this.pozo){
//			this.pozo.turno=;
			this.pozo.estado=new Vivo();
		};
		console.log("Caiste en el pozo");
//		ficha.jugador.entrarPozo();	
		this.pozo=ficha.jugador;
		ficha.jugador.estado=new EnPozo();	
		ficha.cambiarTurno();
	}
}

function Laberinto(){
	this.titulo="Laberinto";
	this.cae=function(ficha){
		console.log("Caíste en el Laberinto");
		ficha.pierdeTurno(new Pierde2Turnos());
		ficha.cambiarTurno();
	}
}

function Carcel(){
	this.titulo="Carcel";
	this.cae=function(ficha){
		console.log("Caíste en la Cárcel");
		ficha.pierdeTurno(new Pierde3Turnos());
		ficha.cambiarTurno();
	}
}

function Calavera(){
	this.titulo="Calavera";
	this.cae=function(ficha){
		console.log("Caíste en la Calavera");
		ficha.moverSinCaer(0);
		ficha.cambiarTurno();
	}
}

function Fin(){
	this.titulo="Fin";
	this.cae=function(ficha){
		ficha.jugador.juego.fase=new FaseFin(ficha.juego);
		console.log("Fin del juego");
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
	this.pierdeTurno=function(obj){
		this.jugador.pierdeTurno(obj);
	}
}

function MeToca(){
	this.nombre="MeToca";
	this.lanzar=function(jugador){
		var numero=Math.round(Math.random()*5+1);
		console.log("Tirada: "+numero);
		jugador.ficha.mover(numero);
	}
}

function NoMeToca(){
	this.nombre="NoMeToca";
	this.lanzar=function(jugador){
		console.log("No es tu turno");
	}
}

function Vivo(){
	this.nombre="Vivo";
	this.esVivo=function(){
		return true;
	}
	this.tomarTurno=function(jugador){
		jugador.turno=new MeToca();
	}
}

function EnPozo(){
	this.nombre="EnPozo";
	this.tomarTurno=function(){
		
	}
}

function PierdeNTurnos(numero){
	this.nombre="Pierde"+numero+"Turnos";
	this.numero=numero;
	this.esVivo=function(){
		return false;
	}
	this.tomarTurno=function(jugador){
		console.log("Faltan "+this.numero+" turnos sin jugar");
		jugador.estado=new PierdeNTurnos(this.numero-1);
		jugador.cambiarTurno();
	}
}

function Pierde3Turnos(){
//	this.nombre="Pierde3Turnos";
//	this.esVivo=function(){
//		return false;
//	}
	this.tomarTurno=function(jugador){
		console.log("Faltan dos turnos sin jugar");
		jugador.estado=new Pierde2Turnos();
		jugador.cambiarTurno();
	}
}
Pierde3Turnos.prototype= new PierdeNTurnos(3);

function Pierde2Turnos(){
	//this.nombre="Pierde2Turnos";
	//this.esVivo=function(){
	//	return false;
	//}
	this.tomarTurno=function(jugador){	
		console.log("Faltan un turno sin jugar");
		jugador.estado=new Pierde1Turno();
		jugador.cambiarTurno();
	}
}
Pierde2Turnos.prototype=new PierdeNTurnos(2);

function Pierde1Turno(){
//	this.nombre="Pierde1Turno";
//	this.esVivo=function(){
//		return false;
//	}
	this.tomarTurno=function(jugador){
		console.log("El siguiente ya te toca");
		jugador.estado=new Vivo();
		jugador.cambiarTurno();
	}
}

Pierde1Turno.prototype=new PierdeNTurnos(1);

function Jugador(nombre,juego){
	this.nombre=nombre;
	this.ficha=undefined;
	this.juego=juego;
	this.turno=new NoMeToca();
	this.estado=new Vivo();

	this.asignarFicha=function(){
		this.juego.fase.asignarFicha(this);
	}
	this.lanzar=function(){
		this.juego.fase.lanzar(this);
	}
	this.cambiarTurno=function(){
		//this.juego.cambiarTurno(this);
		this.turno=new NoMeToca();
		var miSiguiente=this.juego.miSiguiente(this);
		miSiguiente.tomarTurno();
	}
	this.tomarTurno=function(){
		this.estado.tomarTurno(this);
	}
	this.pierdeTurno=function(obj){
		this.estado=obj;
	}
	// this.pasar=function(){
	// 	this.estado.pasar(this);
	// }
}
