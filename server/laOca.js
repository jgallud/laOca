var LaOcaFactory = function(colores){
	this.crearTablero=function(){
		var tablero = new Tablero();
		return tablero;
	}
	this.crearFichas=function(colores){
		var coleccionFichas=[];
		for(var i in colores){
			coleccionFichas.push(new Ficha(colores[i]));
		}
		return coleccionFichas;
	}
	this.crearJuego=function(){
		return new LaOca(this.crearTablero(),this.crearFichas(colores));
	}
}

function CasillasFactory() {
    this.crearCasillaNormal = function (posicion) {
        return new Casilla(posicion, new Normal());
    }
    this.crearCasillaPosada = function (posicion) {
        return new Casilla(posicion, new Posada());
    }
    this.crearCasillaPozo = function (posicion) {
        return new Casilla(posicion, new Pozo());
    }
    this.crearCasillaOca = function (posicion, siguiente) {
        return new Casilla(posicion, new Oca(siguiente));
    }
    this.crearCasillaPuente = function (posicion, siguiente) {
        return new Casilla(posicion, new Puente(siguiente));
    }
    this.crearCasillaDados = function (posicion, siguiente) {
        return new Casilla(posicion, new Dados(siguiente));
    }
    this.crearCasillaLaberinto = function (posicion) {
        return new Casilla(posicion, new Laberinto());
    }
    this.crearCasillaCarcel = function (posicion) {
        return new Casilla(posicion, new Carcel());
    }
    this.crearCasillaCalavera = function (posicion) {
        return new Casilla(posicion, new Calavera());
    }
    this.crearCasillaFin = function (posicion) {
        return new Casilla(posicion, new Fin());
    }
}

var Control=function(){
	this.partidas=[];
	this.id=0;
	this.agregarPartida=function(juego){		
		var miid=this.id;
		this.partidas[miid]=juego;
		this.id++;
		return miid;
	}
}

function LaOca(tablero, coleccionFichas) {
    this.tablero = tablero;
    this.coleccionFichas = coleccionFichas;
    this.coleccionJugadores = [];
    this.turno = undefined;
    this.fase = undefined;
    this.numeroJugadores = undefined;

    this.asignarFicha = function (jugador) {
        this.fase.asignarFicha(jugador);
    };

    this.buscarFichaLibre = function () {
        for (var i = 0; i < this.coleccionFichas.length; i++) {
            if (this.coleccionFichas[i].libre) {
                return this.coleccionFichas[i];
            }
        }
        return false;
    };

    this.buscarJugador=function(nombre){
		for(f in this.coleccionJugadores){
			if (nombre==this.coleccionJugadores[f].nombre){
				return this.coleccionJugadores[f];
			}
		}
		return undefined;
	}

    this.setTurno = function (jugador) {
        jugador.turno = new MeToca();
        this.turno=jugador;
    }

    this.miSiguiente = function (jugador) {
        var indice = this.coleccionJugadores.indexOf(jugador);;
        var siguienteIndice = (indice + 1) % (this.coleccionJugadores.length);
        return this.coleccionJugadores[siguienteIndice];
    }

    this.iniciarJuego = function () {
        this.numeroJugadores = this.coleccionFichas.length;
        this.fase = new Inicio(this);
    }

    this.iniciarJuego();
}

/*
var LaOca=function(colFichas, tablero,numeroJugadores) {
	
	this.colFichas = colFichas;
	this.tablero = tablero;
	this.numeroJugadores=numeroJugadores;
	this.colJugadores = [];
	this.fase={};
	this.turno={};

 	this.asignarFicha=function(jugador){
 		var enc=false;
		for(f in this.colFichas){
			if (this.colFichas[f].libre){				
				enc=true;
				this.colFichas[f].libre=false;
				this.colFichas[f].casilla=this.tablero.casillas[0];
				this.colFichas[f].jugador=jugador;
				jugador.ficha=this.colFichas[f];
				this.colJugadores.push(jugador);
				break;
			}
		};
		if (!enc){
			console.log("Ya no quedan fichas libres");
		}
	};

	this.buscarJugador=function(nombre){
		for(f in this.colJugadores){
			if (nombre==this.colJugadores[f].nombre){
				return this.colJugadores[f];
			}
		}
		return undefined;
	}

	this.inicioJuego=function(juego){
		this.fase=new Inicio(juego);
	};

	this.iniciar=function(){
		this.fase.iniciar();
	}

	this.setTurno=function(jugador){
		jugador.turno=new MeToca();
		this.turno=jugador;
	};

	this.cambiarTurno=function(jugador){
		if(jugador.siguiente.estado.esVivo(jugador.siguiente)){
			jugador.turno=new NoMeToca();
			jugador.siguiente.turno=new MeToca();
			this.turno=jugador.siguiente;
		}
	}

	this.inicioJuego(this);
}
*/

function Inicio(juego) {
    this.juego = juego;
    this.nombre = "Inicio";
    this.asignarFicha = function (jugador) {
        var fichaLibre = this.juego.buscarFichaLibre();
        if (fichaLibre) {
            fichaLibre.libre = false;
            fichaLibre.nuevaCasilla(this.juego.tablero.casillas[0]);
            fichaLibre.asignarJugador(jugador);
            jugador.ficha = fichaLibre;
            this.juego.coleccionJugadores[this.juego.coleccionJugadores.length]=jugador;
            if (this.juego.coleccionJugadores.length == this.juego.coleccionFichas.length) {
            	this.juego.setTurno(this.juego.coleccionJugadores[0]);
                this.juego.fase = new Jugar(juego);
            }
        }
    }
    this.lanzar = function (jugador) {
        console.log("Todavía no puedes lanzar los dados");
    }

    this.esFin = function () {
        return false;
    }
}

/*
function Inicio(juego){
	this.juego=juego;
	this.nombre="Inicio";
	this.asignarFicha=function(jugador){
		this.juego.asignarFicha(jugador);
		if (this.juego.colJugadores.length==this.juego.numeroJugadores){
			this.juego.fase=new Jugar(this.juego);
		}
	};
	this.iniciar=function(){
		if (this.juego.colJugadores.length>=2){
			this.juego.fase=new Jugar(this.juego);
		}
	};

	this.lanzar=function(ficha,num){
		console.log("Todavía no se puede lanzar");
	};
	this.esInicio=function(){
		return true;
	}
}
*/

function Jugar(juego){
	this.juego=juego;
	this.nombre="Jugar";
	this.asignarFicha=function(jugador){
		console.log("No hay sitio libre");
	};
	this.lanzar=function(jugador){ //(ficha,num){
		//ficha.mover(num);
		jugador.tirar();
	};
	this.esJugar=function(){
		return true;
	};
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

var Tablero = function(){
	this.casillas=[];
	this.iniciarNormal=function(){
		for(i=0;i<=63;i++){
			this.casillas[i]=casillasFactory.crearCasillaNormal(i);			
		}
	};

	this.iniciarTablero=function(){		
		for(i=0;i<=63;i++){			
			this.casillas[i].asignarTablero(this);
		}
	};

	this.configurarTablero=function(){
		this.casillas[6] = casillasFactory.crearCasillaPuente(6,12);
		this.casillas[12] = casillasFactory.crearCasillaPuente(12,6);		
		this.casillas[19] = casillasFactory.crearCasillaPosada(19);
		this.casillas[31] = casillasFactory.crearCasillaPozo(31);
		this.casillas[26] = casillasFactory.crearCasillaDados(26,53);
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
		this.casillas[41] = casillasFactory.crearCasillaOca(41,45);
		this.casillas[45] = casillasFactory.crearCasillaOca(45,50);
		this.casillas[50] = casillasFactory.crearCasillaOca(50,54);
		this.casillas[54] = casillasFactory.crearCasillaOca(54,59);
		this.casillas[59] = casillasFactory.crearCasillaOca(59,63);
		this.casillas[63] = casillasFactory.crearCasillaFin(63);				
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

	casillasFactory=new CasillasFactory();
	this.iniciarNormal();
	this.configurarTablero();
	this.iniciarTablero();
}

/*
var Tablero=function(){
	this.casillas=[];
	this.iniciarTablero=function(){
		//this.casillas[0]="El Juego de la Oca";
		for(i=0;i<=63;i++){
			this.casillas[i]=new Casilla(i,new Normal(),this);
		}
	};
	this.asignarCasilla=function(pos,tema){
		this.casillas[pos].tema=tema;
	};

	this.configurarTablero=function(){
		this.asignarCasilla(5,new Oca(9));
		this.asignarCasilla(9, new Oca(14));
		this.asignarCasilla(14, new Oca(18));
		this.asignarCasilla(18, new Oca(23));
		this.asignarCasilla(23, new Oca(27));
		this.asignarCasilla(27, new Oca(32));
		this.asignarCasilla(32, new Oca(36));
		this.asignarCasilla(36, new Oca(41));
		this.asignarCasilla(41, new Oca(45));
		this.asignarCasilla(45, new Oca(50));
		this.asignarCasilla(50, new Oca(54));		
		this.asignarCasilla(54, new Oca(63));
		this.asignarCasilla(6,new Puente(12));
		this.asignarCasilla(12,new Puente(6));
		this.asignarCasilla(19,new Posada());
		this.asignarCasilla(26,new Dados(53));
		this.asignarCasilla(53,new Dados(26));		
		this.asignarCasilla(31,new Pozo());
		this.asignarCasilla(42,new Laberinto());
		this.asignarCasilla(52,new Carcel());
		this.asignarCasilla(58,new Calavera());
		this.asignarCasilla(63,new Fin());		
	};
    
	this.desplazar=function(ficha,num){
        var nuevaPos=ficha.getPosicion()+num;
		//console.log("nueva pos:"+nuevaPos);
		if (nuevaPos >63){
			nuevaPos=63-nuevaPos%63;
		};
		return nuevaPos;
	};
    this.mover = function(ficha,num){
    	var nuevaPos=this.desplazar(ficha,num);
        ficha.cae(this.casillas[nuevaPos]);
    };
    this.moverSinCaer=function(ficha,num){    	
    	ficha.nuevaCasilla(this.casillas[num]);
    	//console.log("Mover sin caer en num: "+num+" casilla:"+this.casillas[num].posicion);
    };
    this.getCasilla=function(num){
    	return this.casillas[num];
    }

	this.iniciarTablero();
	this.configurarTablero();
}

function Casilla(pos,tem,tablero){
	this.posicion=pos;
	this.tema=tem;
	this.tablero=tablero;
	this.mover=function(ficha,num){
	   this.tablero.mover(ficha,num);
	};
	this.moverSinCaer=function(ficha,num){
		this.tablero.moverSinCaer(ficha,num);
	};
	this.cae=function(ficha){
		this.tema.cae(ficha);
	}
}
*/

function Casilla(posicion, tema) {
    this.posicion = posicion;
    this.tema = tema;
    this.tablero = undefined;
    this.moverSinCaer = function (ficha, posicion) {
        this.tablero.moverSinCaer(ficha, posicion);
    }
    this.mover = function (ficha, posicion) {
        this.tablero.mover(ficha, posicion);
    }
    this.cae = function (ficha) {
        this.tema.cae(ficha);
    }
    this.asignarTablero = function (tablero) {
        this.tablero = tablero;
    }
}

var Ficha = function(color){
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

/*
var Ficha = function(color,jugador){
	this.color=color;
	this.libre=true;
	this.casilla="";
	this.jugador=jugador;
	this.nuevaCasilla=function(casilla){
		this.casilla=casilla;
	};
	this.cae=function(casilla){
		this.casilla=casilla;
		this.casilla.cae(this);
	};
	this.moverSinCaer=function(pos){
		this.casilla.moverSinCaer(this,pos);
	};
	this.mover=function(pos){
		this.casilla.mover(this,pos);
	};
    this.getPosicion=function(){
    	return this.casilla.posicion;
    };
    this.cambiarTurno=function(){
    	this.jugador.cambiarTurno();
    };
    this.pierdeTurno=function(obj){
    	this.jugador.pierdeTurno(obj);
    }
}
*/

function Normal(){
	this.titulo="Normal";
	this.cae=function(ficha){
		console.log("Casilla normal en: "+ficha.casilla.posicion);
		ficha.cambiarTurno();
	}
}

function Oca(siguiente){
	this.titulo="Oca";
	this.siguiente=siguiente;
	this.cae=function(ficha){
		if (ficha.casilla.posicion==59){
			ficha.mover(4);
		}
		else
		{
			ficha.moverSinCaer(this.siguiente);
			console.log("De Oca a Oca y tiro porque me toca");
		}
	}
}

function Puente(otro){
	this.titulo="Puente";
	this.otro=otro;
	this.cae=function(ficha){
		ficha.moverSinCaer(this.otro);
		console.log("De puente a puente y tiro porque me lleva la corriente");
	}
}

function Posada(){
	this.titulo="Posada";
	this.cae=function(ficha){
		console.log("Caíste en la Posada, pierdes dos turnos");
		ficha.pierdeTurno(new PierdeTurno2());
		ficha.cambiarTurno();
	}
}

function Dados(otro){
	this.titulo="Dados";
	this.otro=otro;
	this.cae=function(ficha){
		console.log("Caíste en los dados, vuelve a tirar");
		ficha.moverSinCaer(this.otro);
	}
}

function Pozo(){
	this.titulo="Pozo";
	this.pozo=undefined;
	this.cae=function(ficha){
		if (this.pozo){
			this.pozo.salirPozo();
			this.pozo.estado=new Vivo();
		};
		console.log("Caiste en el pozo");
		ficha.jugador.entrarPozo();	
		this.pozo=ficha.jugador;
		ficha.jugador.estado=new EnPozo();	
		ficha.cambiarTurno();
	}
}

function Laberinto(){
	this.titulo="Laberinto";
	this.cae=function(ficha){
		console.log("Caíste en el laberinto");
		ficha.pierdeTurno(new PierdeTurno2());
		ficha.cambiarTurno();
	}
}

function Carcel(){
	this.titulo="Carcel";
	this.cae=function(ficha){
		console.log("Caíste en la cárcel");
		ficha.pierdeTurno(new PierdeTurno3());
		ficha.cambiarTurno();
	}
}

function Calavera(){
	this.titulo="Calavera";
	//this.otro=1;
	this.cae=function(ficha){
		console.log("Caíste en la calavera");
		ficha.moverSinCaer(0);
		ficha.cambiarTurno();
	}
}

function Fin(){
	this.titulo="Fin";
	this.cae=function(ficha){
		console.log("Enhorabuena, ha ganado jugador "+ficha.jugador.nombre);
		ficha.jugador.juego.fase=new FaseFin();
	}
}

function MeToca(){
	this.nombre="MeToca";
	this.lanzar=function(jugador){
		jugador.estado.lanzar(jugador);
	}
}

function NoMeToca(){
	this.nombre="NoMeToca";
	this.lanzar=function (jugador){
		console.log("No es tu turno");
	}
}

function Vivo(){
	console.log("Ya puedes seguir jugando");
	this.nombre="Vivo";
	this.esVivo=function(){
		return true;
	}
	this.lanzar=function (jugador){
		var numero=Math.round(Math.random()*5 +1);
		console.log("Dados: "+numero);
		jugador.tirada=numero;
		jugador.ficha.mover(numero);
	}
	this.esVivo=function(jugador){
		return true;
	}
	this.tomarTurno = function (jugador) {
		jugador.juego.turno=jugador;
        jugador.turno = new MeToca();
    }
}

function PierdeTurno3(){
	this.nombre="Pierde3Turnos";
	this.esPierdeTurno3=function(){
		return true;
	}
	this.lanzar=function(jugador){
		console.log("Te queda todavía 2 turnos sin jugar");
		jugador.estado=new PierdeTurno2();
		jugador.juego.cambiarTurno(jugador);
	}
	this.esVivo=function(jugador){
		console.log("Te queda todavía 2 turnos sin jugar");
		jugador.estado=new PierdeTurno2();
		return false;
	}
	this.tomarTurno = function (jugador) {
        console.log("Faltan dos turnos sin jugar");
        jugador.estado = new PierdeTurno2();
        jugador.cambiarTurno();
    }
}

function PierdeTurno2(){
	this.nombre="Pierde2Turnos";
	this.esPierdeTurno2=function(){
		return true;
	}	
	this.lanzar=function(jugador){
		console.log("Te quedan 2 turno sin jugar");
		jugador.estado=new PierdeTurno1();
		jugador.juego.cambiarTurno(jugador);
	}
	this.esVivo=function(jugador){
		console.log("Te quedan 2 turno sin jugar");
		jugador.estado=new PierdeTurno1();
		return false;
	}
	this.tomarTurno = function (jugador) {
        console.log("Falta un turnos sin jugar");
        jugador.estado = new PierdeTurno1();
        jugador.cambiarTurno();
    }
}

function PierdeTurno1(){
	this.nombre="Pierde1Turno";
	this.esPierdeTurno1=function(){
		return true;
	}
	this.lanzar=function(jugador){
		console.log("Te queda 1 turno sin jugar");
		jugador.estado=new Vivo();
		jugador.juego.cambiarTurno(jugador);
	}
	this.tomarTurno = function (jugador) {
        console.log("El siguiente turno ya puedes jugar");
        jugador.estado = new Vivo();
        jugador.cambiarTurno();
    }
	this.esVivo=function(jugador){
		console.log("Te queda 1 turno sin jugar");
		jugador.estado=new Vivo();
		return false;
	}	
}

function EnPozo(){
	this.nombre="EnPozo";
	this.esPozo=function(){
		return true;
	}	
	this.lanzar=function(jugador){
		console.log("Lo siento, sigues en el pozo");
		jugador.juego.cambiarTurno(jugador);
	}
	this.esVivo=function(jugador){
		return false;
	}
	this.tomarTurno = function (jugador) {
        console.log("No puedes jugar, estas en el Pozo");
        //jugador.estado = new Vivo();
        jugador.cambiarTurno();
    }
}

var Jugador = function(nombre,juego){
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
		//this.turno.lanzar(this);
	}
	this.tirar=function(){
		this.turno.lanzar(this);
	}
	this.entrarPozo=function(){
		this.turno=new NoMeToca();
	}
	this.salirPozo=function(){
		this.turno=new MeToca();
	}
	this.cambiarTurno=function(){
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
}

/*
var Jugador=function(nombre,juego){
	this.nombre=nombre;
	this.juego=juego;
	this.turno=new NoMeToca();
	this.estado=new Vivo();
	this.ficha="";
	this.siguiente={};
	this.tirada=0;
	this.asignarFicha=function(){
		this.juego.fase.asignarFicha(this);
	};
	this.siguienteJugador=function(jugador){
		this.siguiente=jugador;
	};
	this.entrarPozo=function(){
		this.turno=new NoMeToca();
	}
	this.salirPozo=function(){
		this.turno=new MeToca();
	}
	this.pierdeTurno=function(objeto){
		this.estado=objeto;
	};
	this.lanzar=function (){
		this.turno.lanzar(this);
	};
	this.cambiarTurno=function(){
		this.juego.cambiarTurno(this);
	}
}
*/

var iniJuego = function(num){
    var colores=[];
    colores["2"]=["rojo","azul"]; //["rojo","azul"];
    colores["3"]=["rojo","azul","verde"];
    colores["4"]=["rojo","azul","verde","amarillo"];
    colores["5"]=["rojo","azul","verde","amarillo","negro"];
    return (new LaOcaFactory(colores[num])).crearJuego();
}

/*
module.exports.Jugador=Jugador;
module.exports.Ficha=Ficha;
module.exports.Tablero=Tablero;
module.exports.LaOca=LaOca;
*/
module.exports.Control = Control;
module.exports.Jugador = Jugador;
module.exports.LaOcaFactory = LaOcaFactory;
module.exports.iniJuego = iniJuego;