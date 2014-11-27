var modulo = require('./laOca.js');
var _ = require("underscore");

describe("El juego de la Oca...",function(){

	var juego;

	describe("En cuanto a la inicialización",function(){
		beforeEach(function(){
			colores=["rojo","azul"];
			this.juego = (new modulo.LaOcaFactory(colores)).crearJuego();
		});

		it("...la variable juego debe estar definida",function(){
			expect(this.juego).toBeDefined();
		});

		it("...el juego debe tener un tablero",function(){
			expect(this.juego.tablero).toBeDefined();
		});

		it("...el tablero debe tener 64 elementos",function(){
			expect(this.juego.tablero.casillas.length).toEqual(64);
		});

		it("...el juego tiene una coleccion de fichas", function(){
			expect(this.juego.coleccionFichas).toBeDefined();
		});

		it("...la coleccion de fichas debe tener 2 fichas",function(){
			expect(this.juego.coleccionFichas.length).toEqual(2);
		});

		it("...inicialmente, todas las fichas están libres",function(){
			var todasLibres=_.find(this.juego.coleccionFichas,function(f){
				return f.libre==false});
			expect(this.todasLibres).toBeUndefined();
		});

		it("...el juego tiene una coleccion de jugadores",function(){
			expect(this.juego.coleccionJugadores).toBeDefined();
		});

		it("...el juego permite crear un jugador llamado Pepe",function(){
			this.jugador=new modulo.Jugador("Pepe",this.juego);
			expect(this.jugador.nombre).toMatch("Pepe");
		});

		it("...el juego permite asignar una ficha libre a Pepe",function(){
			this.jugador=new modulo.Jugador("Pepe",this.juego);
			this.jugador.asignarFicha();
			expect(this.jugador.ficha).not.toBeUndefined();
		});
	});

	describe("Comprobar el tablero...",function(){
		beforeEach(function(){
			colores=["rojo","azul"];		
			this.juego = (new modulo.LaOcaFactory(colores)).crearJuego();
		});

		it("...las casillas 6 y 12 tienen Puente",function(){
			expect(this.juego.tablero.casillas[6].tema.titulo).toEqual("Puente");
			expect(this.juego.tablero.casillas[12].tema.titulo).toEqual("Puente");
		});

		it("...la casilla 19 tiene una Posada",function(){
			expect(this.juego.tablero.casillas[19].tema.titulo).toEqual("Posada");			
		});

		it("...las casillas 26 y 53 tiene Dados",function(){
			expect(this.juego.tablero.casillas[26].tema.titulo).toEqual("Dados");
			expect(this.juego.tablero.casillas[53].tema.titulo).toEqual("Dados");
		});

		it("...la casilla 42 tiene Laberinto",function(){
			expect(this.juego.tablero.casillas[42].tema.titulo).toEqual("Laberinto");
		});

		it("...la casilla 52 tiene Cárcel",function(){
			expect(this.juego.tablero.casillas[52].tema.titulo).toEqual("Carcel");
		});

		it("...la casilla 58 tiene Calavera",function(){
			expect(this.juego.tablero.casillas[58].tema.titulo).toEqual("Calavera");
		});

		it("...las casillas 5,9,14,18,23,27,32,36,41,45,50,54 y 59 tienen Oca",function(){
			expect(this.juego.tablero.casillas[5].tema.titulo).toEqual("Oca");
			expect(this.juego.tablero.casillas[9].tema.titulo).toEqual("Oca");
			expect(this.juego.tablero.casillas[14].tema.titulo).toEqual("Oca");
			expect(this.juego.tablero.casillas[18].tema.titulo).toEqual("Oca");
			expect(this.juego.tablero.casillas[23].tema.titulo).toEqual("Oca");
			expect(this.juego.tablero.casillas[27].tema.titulo).toEqual("Oca");
			expect(this.juego.tablero.casillas[32].tema.titulo).toEqual("Oca");
			expect(this.juego.tablero.casillas[36].tema.titulo).toEqual("Oca");
			expect(this.juego.tablero.casillas[41].tema.titulo).toEqual("Oca");
			expect(this.juego.tablero.casillas[45].tema.titulo).toEqual("Oca");
			expect(this.juego.tablero.casillas[50].tema.titulo).toEqual("Oca");			
			expect(this.juego.tablero.casillas[54].tema.titulo).toEqual("Oca");		
			expect(this.juego.tablero.casillas[59].tema.titulo).toEqual("Oca");	
		})
	});

	describe("Comprobamos el funcionamiento de los turnos con tres jugadores",function(){
		var ju1,ju2,ju3;
		beforeEach(function(){
			colores=["rojo","azul","verde"];			
			this.juego = (new modulo.LaOcaFactory(colores)).crearJuego();
			this.ju1=new modulo.Jugador("Pepe",this.juego);
			this.ju1.asignarFicha();
			this.ju2=new modulo.Jugador("Luis",this.juego);
			this.ju2.asignarFicha();
			this.ju3=new modulo.Jugador("Lola",this.juego);
			this.ju3.asignarFicha();
		});		

		it("El turno lo tiene jug1, cae en una casilla normal y pasa el turno a jug2",function(){
			this.juego.setTurno(this.ju1);
			this.ju1.ficha.casilla=this.juego.tablero.getCasilla(1);
			this.ju1.ficha.mover(1);
			expect(this.ju1.ficha.casilla.posicion).toEqual(2);
			expect(this.ju1.turno.nombre).toMatch("NoMeToca");
			expect(this.ju3.turno.nombre).toMatch("NoMeToca");			
			expect(this.ju2.turno.nombre).toMatch("MeToca");			
		});
		it("El turno lo tiene jug2, cae en una casilla normal y pasa el turno a jug3",function(){
			this.juego.setTurno(this.ju2);
			this.ju2.ficha.casilla=this.juego.tablero.getCasilla(1);
			this.ju2.ficha.mover(1);
			expect(this.ju2.ficha.casilla.posicion).toEqual(2);
			expect(this.ju2.turno.nombre).toMatch("NoMeToca");
			expect(this.ju1.turno.nombre).toMatch("NoMeToca");			
			expect(this.ju3.turno.nombre).toMatch("MeToca");			
		});		
		it("El turno lo tiene jug3, cae en una casilla normal y pasa el turno a jug1",function(){
			this.juego.setTurno(this.ju3);
			this.ju3.ficha.casilla=this.juego.tablero.getCasilla(1);
			this.ju3.ficha.mover(1);
			expect(this.ju3.ficha.casilla.posicion).toEqual(2);
			expect(this.ju3.turno.nombre).toMatch("NoMeToca");
			expect(this.ju2.turno.nombre).toMatch("NoMeToca");			
			expect(this.ju1.turno.nombre).toMatch("MeToca");			
		});		
	})

	describe("Comprobar el funcionamiento de la casilla Oca",function(){
		var ju1;
		var ju2;
		beforeEach(function(){
			colores=["rojo","azul"];
			this.juego = (new modulo.LaOcaFactory(colores)).crearJuego();
			this.ju1=new modulo.Jugador("Pepe",this.juego);
			this.ju1.asignarFicha();
			this.ju2=new modulo.Jugador("Luis",this.juego);
			this.ju2.asignarFicha();
			//this.ju1.siguientemodulo.Jugador(this.ju2);
			//this.ju2.siguientemodulo.Jugador(this.ju1);
			this.juego.setTurno(this.ju1);
		});

		it("La fase es Jugar, el turno lo tiene jug1",function(){
			expect(this.juego.fase.nombre).toMatch("Jugar");
			expect(this.ju1.turno.nombre).toMatch("MeToca");
		});

		it("jug1 cae en casilla 5 y pasa a la 9 y mantiene el turno",function(){
				this.ju1.ficha.mover(4);
				expect(this.ju1.ficha.casilla.posicion).toEqual(9);
				expect(this.ju1.turno.nombre).toMatch("MeToca");
		});

		it("jug1 cae en casilla 9 y pasa a la 14 y mantiene el turno",function(){
				this.ju1.ficha.casilla=this.juego.tablero.getCasilla(8);
				//this.juego.fase.lanzar(this.ju1.ficha, 1);
				this.ju1.ficha.mover(1);
				expect(this.ju1.ficha.casilla.posicion).toEqual(14);
				expect(this.ju1.turno.nombre).toMatch("MeToca");
		});

		it("jug1 cae en casilla 14 y pasa a la 18 y mantiene el turno",function(){
				this.ju1.ficha.casilla=this.juego.tablero.getCasilla(13);
				//this.juego.fase.lanzar(this.ju1.ficha, 1);
				this.ju1.ficha.mover(1);
				expect(this.ju1.ficha.casilla.posicion).toEqual(18);
				expect(this.ju1.turno.nombre).toMatch("MeToca");
		});

		it("jug1 cae en casilla 18 y pasa a la 23 y mantiene el turno",function(){
				this.ju1.ficha.casilla=this.juego.tablero.getCasilla(17);
				this.ju1.ficha.mover(1);
				expect(this.ju1.ficha.casilla.posicion).toEqual(23);
				expect(this.ju1.turno.nombre).toMatch("MeToca");
		});

		it("jug1 cae en casilla 23 y pasa a la 27 y mantiene el turno",function(){
				this.ju1.ficha.casilla=this.juego.tablero.getCasilla(22);
				this.ju1.ficha.mover(1);
				expect(this.ju1.ficha.casilla.posicion).toEqual(27);
				expect(this.ju1.turno.nombre).toMatch("MeToca");
		});

		it("jug1 cae en casilla 27 y pasa a la 32 y mantiene el turno",function(){
				this.ju1.ficha.casilla=this.juego.tablero.getCasilla(25);
				this.ju1.ficha.mover(2);
				expect(this.ju1.ficha.casilla.posicion).toEqual(32);
				expect(this.ju1.turno.nombre).toMatch("MeToca");
		});

		it("jug1 cae en casilla 32 y pasa a la 36 y mantiene el turno",function(){
				this.ju1.ficha.casilla=this.juego.tablero.getCasilla(31);
				this.ju1.ficha.mover(1);
				expect(this.ju1.ficha.casilla.posicion).toEqual(36);
				expect(this.ju1.turno.nombre).toMatch("MeToca");
		});
		it("jug1 cae en casilla 36 y pasa a la 41 y mantiene el turno",function(){
				this.ju1.ficha.casilla=this.juego.tablero.getCasilla(35);
				this.ju1.ficha.mover(1);
				expect(this.ju1.ficha.casilla.posicion).toEqual(41);
				expect(this.ju1.turno.nombre).toMatch("MeToca");
		});
		it("jug1 cae en casilla 41 y pasa a la 45 y mantiene el turno",function(){
				this.ju1.ficha.casilla=this.juego.tablero.getCasilla(40);
				this.ju1.ficha.mover(1);
				expect(this.ju1.ficha.casilla.posicion).toEqual(45);
				expect(this.ju1.turno.nombre).toMatch("MeToca");
		});	
		it("jug1 cae en casilla 45 y pasa a la 50 y mantiene el turno",function(){
				this.ju1.ficha.casilla=this.juego.tablero.getCasilla(44);
				this.ju1.ficha.mover(1);
				expect(this.ju1.ficha.casilla.posicion).toEqual(50);
				expect(this.ju1.turno.nombre).toMatch("MeToca");
		});
		it("jug1 cae en casilla 50 y pasa a la 54 y mantiene el turno",function(){
				this.ju1.ficha.casilla=this.juego.tablero.getCasilla(49);
				this.ju1.ficha.mover(1);
				expect(this.ju1.ficha.casilla.posicion).toEqual(54);
				expect(this.ju1.turno.nombre).toMatch("MeToca");
		});		
		it("jug1 cae en casilla 54 y pasa a la 59 y mantiene el turno",function(){
				this.ju1.ficha.casilla=this.juego.tablero.getCasilla(53);
				this.ju1.ficha.mover(1);
				expect(this.ju1.ficha.casilla.posicion).toEqual(59);
				expect(this.ju1.turno.nombre).toMatch("MeToca");
		});	
		it("jug1 cae en casilla 59 y pasa a la 63 y mantiene el turno",function(){
			this.ju1.ficha.casilla=this.juego.tablero.getCasilla(58);
			this.ju1.ficha.mover(1);
			expect(this.ju1.ficha.casilla.posicion).toEqual(63);
			expect(this.ju1.turno.nombre).toMatch("MeToca");
		});
	});

	describe("Comprobar el funcionamiento de la casilla Puente",function(){
		var ju1;
		var ju2;
		beforeEach(function(){
			colores=["rojo","azul"];
			this.juego = (new modulo.LaOcaFactory(colores)).crearJuego();
			this.ju1=new modulo.Jugador("Pepe",this.juego);
			this.ju1.asignarFicha();
			this.ju2=new modulo.Jugador("Luis",this.juego);
			this.ju2.asignarFicha();
			//this.ju1.siguientemodulo.Jugador(this.ju2);
			//this.ju2.siguientemodulo.Jugador(this.ju1);
			this.juego.setTurno(this.ju1);
		});

		it("La fase es Jugar, el turno lo tiene jug1",function(){
			expect(this.juego.fase.nombre).toEqual("Jugar");
			expect(this.ju1.turno.nombre).toMatch("MeToca");
		});

		it("jug1 cae en casilla 6 y pasa a la 12 y mantiene el turno",function(){
				this.ju1.ficha.casilla=this.juego.tablero.getCasilla(5);
				this.ju1.ficha.mover(1);
				expect(this.ju1.ficha.casilla.posicion).toEqual(12);
				expect(this.ju1.turno.nombre).toMatch("MeToca");
		});	

		it("jug1 cae en casilla 12 y pasa a la 6 y mantiene el turno",function(){
				this.ju1.ficha.casilla=this.juego.tablero.getCasilla(11);
				this.ju1.ficha.mover(1);
				expect(this.ju1.ficha.casilla.posicion).toEqual(6);
				expect(this.ju1.turno.nombre).toMatch("MeToca");
		});	
	});

	describe("Comprobar el funcionamiento de la casilla Posada",function(){
		var ju1;
		var ju2;
		beforeEach(function(){
			colores=["rojo","azul"];			
			this.juego = (new modulo.LaOcaFactory(colores)).crearJuego();
			this.ju1=new modulo.Jugador("Pepe",this.juego);
			this.ju1.asignarFicha();
			this.ju2=new modulo.Jugador("Luis",this.juego);
			this.ju2.asignarFicha();
			//this.ju1.siguientemodulo.Jugador(this.ju2);
			//this.ju2.siguientemodulo.Jugador(this.ju1);
			this.juego.setTurno(this.ju1);
		});

		it("La fase es Jugar, el turno lo tiene jug1",function(){
			expect(this.juego.fase.nombre).toEqual("Jugar");
			expect(this.ju1.turno.nombre).toMatch("MeToca");
		});

		it("jug1 cae en casilla 19 pierde dos turnos, el turno pasa a jug2",function(){
			this.ju1.ficha.casilla=this.juego.tablero.getCasilla(18);
			this.ju1.ficha.mover(1);
			expect(this.ju1.ficha.casilla.posicion).toEqual(19);
			expect(this.ju2.turno.nombre).toMatch("MeToca");
			expect(this.ju1.turno.nombre).toMatch("NoMeToca");
			expect(this.ju1.estado.nombre).toEqual("Pierde2Turnos");
		});	

		it("jug1 está en la Posada y pierde dos turnos",function(){
			this.ju1.ficha.casilla=this.juego.tablero.getCasilla(18);
			this.ju1.ficha.mover(1);
			expect(this.ju1.ficha.casilla.posicion).toEqual(19);
			expect(this.ju2.turno.nombre).toMatch("MeToca");
			expect(this.ju1.turno.nombre).toMatch("NoMeToca");
			expect(this.ju1.estado.nombre).toEqual("Pierde2Turnos");
			//this.juego.turno.lanzar(this.ju2.ficha,1);
			//this.juego.cambiarTurno(this.ju2);
			this.ju2.ficha.mover(1);	
			expect(this.ju1.estado.nombre).toEqual("Pierde1Turnos");
			//this.juego.turno.lanzar(this.ju2.ficha,1);
			//this.juego.cambiarTurno(this.ju2);
			this.ju2.ficha.mover(1);		
			//console.log(this.ju1.estado);		
			expect(this.ju1.estado.nombre).toEqual("Vivo");			
		});	
	});

	describe("Comprobar el funcionamiento de la casilla Dados",function(){
		var ju1;
		var ju2;
		beforeEach(function(){
			colores=["rojo","azul"];			
			this.juego = (new modulo.LaOcaFactory(colores)).crearJuego();
			this.ju1=new modulo.Jugador("Pepe",this.juego);
			this.ju1.asignarFicha();
			this.ju2=new modulo.Jugador("Luis",this.juego);
			this.ju2.asignarFicha();
		//	this.ju1.siguientemodulo.Jugador(this.ju2);
		//	this.ju2.siguientemodulo.Jugador(this.ju1);
			this.juego.setTurno(this.ju1);
		});

		it("La fase es Jugar, el turno lo tiene jug1",function(){
			expect(this.juego.fase.nombre).toEqual("Jugar");
			expect(this.ju1.turno.nombre).toMatch("MeToca");
		});

		it("jug1 cae en casilla 26 y pasa a la 53 y mantiene el turno",function(){
			this.ju1.ficha.casilla=this.juego.tablero.getCasilla(25);
			this.ju1.ficha.mover(1);
			expect(this.ju1.ficha.casilla.posicion).toEqual(53);
			expect(this.ju1.turno.nombre).toMatch("MeToca");
		});	

		it("jug1 cae en casilla 53 y pasa a la 26 y mantiene el turno",function(){
			this.ju1.ficha.casilla=this.juego.tablero.getCasilla(52);
			this.ju1.ficha.mover(1);
			expect(this.ju1.ficha.casilla.posicion).toEqual(26);
			expect(this.ju1.turno.nombre).toMatch("MeToca");
		});	
	});

	describe("Comprobar casilla Pozo",function(){
		var ju1;
		var ju2;
		beforeEach(function(){
			colores=["rojo","azul"];			
			this.juego = (new modulo.LaOcaFactory(colores)).crearJuego();
			this.ju1=new modulo.Jugador("Pepe",this.juego);
			this.ju1.asignarFicha();
			this.ju2=new modulo.Jugador("Luis",this.juego);
			this.ju2.asignarFicha();
		//	this.ju1.siguientemodulo.Jugador(this.ju2);
		//	this.ju2.siguientemodulo.Jugador(this.ju1);
			this.juego.setTurno(this.ju1);
		});

		it("La fase es Jugar, el turno lo tiene jug1",function(){
			expect(this.juego.fase.nombre).toEqual("Jugar");
			expect(this.ju1.turno.nombre).toMatch("MeToca");
		});		

		it("jug1 cae en casilla 31, pierde el turno y espera a que otro jugador caiga",function(){
			this.ju1.ficha.casilla=this.juego.tablero.getCasilla(30);
			this.ju1.ficha.mover(1);
			expect(this.ju1.ficha.casilla.posicion).toEqual(31);
			expect(this.ju2.turno.nombre).toMatch("MeToca");
			expect(this.ju1.turno.nombre).toMatch("NoMeToca");
		});

		it("jug1 está en el pozo y no puede jugar",function(){
			this.ju1.ficha.casilla=this.juego.tablero.getCasilla(30);
			this.ju1.ficha.mover(1);
			expect(this.ju1.ficha.casilla.posicion).toEqual(31);
			expect(this.ju2.turno.nombre).toMatch("MeToca");
			expect(this.ju1.turno.nombre).toMatch("NoMeToca");
			//this.juego.cambiarTurno(this.ju2);
			expect(this.ju1.estado.nombre).toEqual("EnPozo");
			//this.juego.cambiarTurno(this.ju2);
			this.ju2.ficha.mover(1);	
			expect(this.ju1.estado.nombre).toEqual("EnPozo");
		});

		it("jug1 está en el pozo y jug2 cae y saca a jug1",function(){
			this.ju1.ficha.casilla=this.juego.tablero.getCasilla(30);
			this.ju1.ficha.mover(1);
			expect(this.ju1.ficha.casilla.posicion).toEqual(31);
			this.ju2.ficha.casilla=this.juego.tablero.getCasilla(30);
			this.ju2.ficha.mover(1);
			expect(this.ju1.estado.nombre).toEqual("Vivo");
			expect(this.ju2.estado.nombre).toEqual("EnPozo");
		});
	});

	describe("Comprobar el funcionamiento de la casilla Laberinto",function(){
		var ju1;
		var ju2;
		beforeEach(function(){
			colores=["rojo","azul"];
			this.juego = (new modulo.LaOcaFactory(colores)).crearJuego();
			this.ju1=new modulo.Jugador("Pepe",this.juego);
			this.ju1.asignarFicha();
			this.ju2=new modulo.Jugador("Luis",this.juego);
			this.ju2.asignarFicha();
	//		this.ju1.siguientemodulo.Jugador(this.ju2);
	//		this.ju2.siguientemodulo.Jugador(this.ju1);
			this.juego.setTurno(this.ju1);
		});

		it("La fase es Jugar, el turno lo tiene jug1",function(){
			expect(this.juego.fase.nombre).toEqual("Jugar");
			expect(this.ju1.turno.nombre).toMatch("MeToca");
		});

		it("jug1 cae en casilla 42 pierde dos turnos",function(){
			this.ju1.ficha.casilla=this.juego.tablero.getCasilla(41);
			this.ju1.ficha.mover(1);
			expect(this.ju1.ficha.casilla.posicion).toEqual(42);
			expect(this.ju2.turno.nombre).toMatch("MeToca");
			expect(this.ju1.turno.nombre).toMatch("NoMeToca");
			expect(this.ju1.estado.nombre).toEqual("Pierde2Turnos");
		});	

		it("jug1 está en el Laberinto y pierde dos turnos",function(){
			this.ju1.ficha.casilla=this.juego.tablero.getCasilla(41);
			this.ju1.ficha.mover(1);
			expect(this.ju1.ficha.casilla.posicion).toEqual(42);
			expect(this.ju2.turno.nombre).toMatch("MeToca");
			expect(this.ju1.turno.nombre).toMatch("NoMeToca");
			expect(this.ju1.estado.nombre).toEqual("Pierde2Turnos");
			//this.juego.turno.lanzar(this.ju2.ficha,1);
			//this.juego.cambiarTurno(this.ju2);
			this.ju2.ficha.mover(1);	
			expect(this.ju1.estado.nombre).toEqual("Pierde1Turnos");
			//this.juego.turno.lanzar(this.ju2.ficha,1);
			//this.juego.cambiarTurno(this.ju2);
			this.ju2.ficha.mover(1);		
			//console.log(this.ju1.estado);		
			expect(this.ju1.estado.nombre).toEqual("Vivo");
		});	
	});

	describe("Comprobar el funcionamiento de la casilla Cárcel",function(){
		var ju1;
		var ju2;
		beforeEach(function(){
			colores=["rojo","azul"];			
			this.juego = (new modulo.LaOcaFactory(colores)).crearJuego();
			this.ju1=new modulo.Jugador("Pepe",this.juego);
			this.ju1.asignarFicha();
			this.ju2=new modulo.Jugador("Luis",this.juego);
			this.ju2.asignarFicha();
	//		this.ju1.siguientemodulo.Jugador(this.ju2);
	//		this.ju2.siguientemodulo.Jugador(this.ju1);
			this.juego.setTurno(this.ju1);
		});

		it("La fase es Jugar, el turno lo tiene jug1",function(){
			expect(this.juego.fase.nombre).toEqual("Jugar");
			expect(this.ju1.turno.nombre).toMatch("MeToca");
		});

		it("jug1 cae en casilla 52 pierde tres turnos",function(){
			this.ju1.ficha.casilla=this.juego.tablero.getCasilla(51);
			this.ju1.ficha.mover(1);
			expect(this.ju1.ficha.casilla.posicion).toEqual(52);
			expect(this.ju2.turno.nombre).toMatch("MeToca");
			expect(this.ju1.turno.nombre).toMatch("NoMeToca");
			expect(this.ju1.estado.nombre).toEqual("Pierde3Turnos");
		});	

		it("jug1 está en el Cárcel y pierde tres turnos",function(){
			this.ju1.ficha.casilla=this.juego.tablero.getCasilla(51);
			this.ju1.ficha.mover(1);
			expect(this.ju1.ficha.casilla.posicion).toEqual(52);
			expect(this.ju2.turno.nombre).toMatch("MeToca");
			expect(this.ju1.turno.nombre).toMatch("NoMeToca");
			expect(this.ju1.estado.nombre).toEqual("Pierde3Turnos");
			//this.juego.turno.lanzar(this.ju2.ficha,1);
			//this.juego.cambiarTurno(this.ju2);
			this.ju2.ficha.mover(1);	
			expect(this.ju1.estado.nombre).toEqual("Pierde2Turnos");
			//this.juego.turno.lanzar(this.ju2.ficha,1);
			//this.juego.cambiarTurno(this.ju2);
			this.ju2.ficha.mover(1);	
			expect(this.ju1.estado.nombre).toEqual("Pierde1Turnos");
			this.ju2.ficha.mover(1);		
			//console.log(this.ju1.estado);		
			expect(this.ju1.estado.nombre).toEqual("Vivo");
		});	
	});

	describe("Comprobar el funcionamiento de la casilla Calavera",function(){
		var ju1;
		var ju2;
		beforeEach(function(){
			colores=["rojo","azul"];			
			this.juego = (new modulo.LaOcaFactory(colores)).crearJuego();
			this.ju1=new modulo.Jugador("Pepe",this.juego);
			this.ju1.asignarFicha();
			this.ju2=new modulo.Jugador("Luis",this.juego);
			this.ju2.asignarFicha();
	//		this.ju1.siguientemodulo.Jugador(this.ju2);
	//		this.ju2.siguientemodulo.Jugador(this.ju1);
			this.juego.setTurno(this.ju1);
		});

		it("La fase es Jugar, el turno lo tiene jug1",function(){
			expect(this.juego.fase.nombre).toEqual("Jugar");
			expect(this.ju1.turno.nombre).toMatch("MeToca");
		});

		it("jug1 cae en casilla 58 pierde y vuelve a la 1",function(){
			this.ju1.ficha.casilla=this.juego.tablero.getCasilla(57);
			this.ju1.ficha.mover(1);
			expect(this.ju1.ficha.casilla.posicion).toEqual(0);
			expect(this.ju2.turno.nombre).toMatch("MeToca");
			expect(this.ju1.turno.nombre).toMatch("NoMeToca");
		});	
	});

	describe("Comprobar el funcionamiento de la casilla Fin o Jardin",function(){
		var ju1;
		var ju2;
		beforeEach(function(){
			colores=["rojo","azul"];
			this.juego = (new modulo.LaOcaFactory(colores)).crearJuego();
			this.ju1=new modulo.Jugador("Pepe",this.juego);
			this.ju1.asignarFicha();
			this.ju2=new modulo.Jugador("Luis",this.juego);
			this.ju2.asignarFicha();
	//		this.ju1.siguientemodulo.Jugador(this.ju2);
	//		this.ju2.siguientemodulo.Jugador(this.ju1);
			this.juego.setTurno(this.ju1);
		});

		it("La fase es Jugar, el turno lo tiene jug1",function(){
			expect(this.juego.fase.nombre).toEqual("Jugar");
			expect(this.ju1.turno.nombre).toMatch("MeToca");
		});

		it("jug1 cae en casilla 63 y gana, el juego termina",function(){
			this.ju1.ficha.casilla=this.juego.tablero.getCasilla(62);
			this.ju1.ficha.mover(1);
			expect(this.ju1.ficha.casilla.posicion).toEqual(63);
			expect(this.juego.fase.nombre).toEqual("Fin");
		});					
	})
})