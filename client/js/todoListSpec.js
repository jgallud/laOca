describe("El juego de La Oca...",function(){
	var juego;
	var colFichas;
	var tablero;
	var jugador;

	

	describe("Comprobaciones iniciales...",function(){
		beforeEach(function(){
				this.colFichas=[new Ficha("rojo"),new Ficha("azul"), new Ficha("verde")];
				this.tablero=new Tablero();
				this.juego=new LaOca(this.colFichas,this.tablero,2);	
			});

		it("El juego debe estar definido",function(){
			expect(this.juego).toBeDefined();
		});

		it("El juego debe tener un tablero",function(){
			expect(this.juego.tablero).toBeDefined();
		});

		it("debe asegurar que el tablero tiene 63 casillas (64, comienza en 0)",function(){
			expect(this.juego.tablero.casillas.length).toEqual(64);
		});	

		it("debe tener una colección de 3 fichas",function(){
			expect(this.juego.colFichas.length).toEqual(3);
		});

		it("debería tener todas las fichas libres inicialmente",function(){
			var libre=_.find(this.juego.colFichas,function(f){return f.libre==false;});
			expect(this.libre).toBeUndefined();
		});

		it("tener una coleccion de jugadores",function(){
			expect(this.juego.colJugadores).toBeDefined();
		});

		it("tener la lista de jugadores inicialmente vacia",function(){
			expect(this.juego.colJugadores.length).toEqual(0);
		});

	});

	describe("Comprobar las casillas",function(){
		beforeEach(function(){
				this.colFichas=[new Ficha("rojo"),new Ficha("azul"), new Ficha("verde")];
				this.tablero=new Tablero();
				this.juego=new LaOca(this.colFichas,this.tablero,2);	
			});

		it("las casillas  6 y 12 son puentes",function(){
			expect(this.juego.tablero.casillas[6].tema.titulo).toEqual("Puente");
			expect(this.juego.tablero.casillas[12].tema.titulo).toEqual("Puente");
		});

		it("la casilla 19 es una posada",function(){
			expect(this.juego.tablero.casillas[19].tema.titulo).toEqual("Posada");
		});

		it("las casillas 26 y 53 tienen dados",function(){
			expect(this.juego.tablero.casillas[26].tema.titulo).toEqual("Dados");
			expect(this.juego.tablero.casillas[53].tema.titulo).toEqual("Dados");
		});

		it("la casilla 42 tiene un laberinto",function(){
			expect(this.juego.tablero.casillas[42].tema.titulo).toEqual("Laberinto");
		});

		it("la casilla 52 tiene la cárcel",function(){
			expect(this.juego.tablero.casillas[52].tema.titulo).toEqual("Carcel");
		});

		it("la casilla 58 tiene la calavera",function(){
			expect(this.juego.tablero.casillas[58].tema.titulo).toEqual("Calavera");
		});
	});

	describe("Sobre los jugadores",function(){

		beforeEach(function(){
			this.colFichas=[new Ficha("rojo"),new Ficha("azul"), new Ficha("verde")];
			this.tablero=new Tablero();
			this.juego=new LaOca(this.colFichas,this.tablero,2);	
			this.jugador=new Jugador("Pepe");		
			});
	
		it("permite crear un jugador llamado Pepe",function(){			
			expect(this.jugador).toBeDefined();
			expect(this.jugador.nombre).toMatch("Pepe");
		});

		it("comprobamos que existe un jugador llamado Pepe",function(){
			expect(this.jugador).toBeDefined();
			expect(this.jugador.nombre).toMatch("Pepe");
		});


		it("Comprobamos que el nuevo jugador no tiene ficha",function(){		
			expect(this.jugador.ficha).toBe('');
		});

		it("asignamos ficha al jugador",function(){		
			this.juego.asignarFicha(this.jugador);
			expect(this.jugador.ficha).not.toBe('');
		});

		it("Comprobamos que solo quedan dos fichas libres",function(){
			this.juego.asignarFicha(this.jugador);
			var libres=_.filter(this.juego.colFichas,function(f){return f.libre==true;});
			expect(libres.length).toEqual(2);
		});

		it("Comprobamos que la lista de jugadores del juego tiene 1 elemento",function(){
			this.juego.asignarFicha(this.jugador);
			expect(this.juego.colJugadores.length).toEqual(1);
		});

		it("Comprobamos que el jugador de la lista es Pepe",function(){
			this.juego.asignarFicha(this.jugador);
			expect(this.juego.colJugadores[0].nombre).toMatch("Pepe");
		});
	});

	describe("Sobre el funcionamiento de las fases",function(){
		var ju1;
		var ju2;
		beforeEach(function(){
			this.colFichas=[new Ficha("rojo"),new Ficha("azul"), new Ficha("verde")];
			this.tablero=new Tablero();
			this.juego=new LaOca(this.colFichas,this.tablero,2);
			this.ju1=new Jugador("Pepe",this.juego);
			this.ju1.asignarFicha();
		});

		it("Tenemos sólo un jugador, falta otro, luego la fase es Inicio",function(){
			expect(this.juego.fase.esInicio()).toBeDefined();
			expect(this.juego.fase.esInicio()).toEqual(true);
		})

		it("Asignamos el segundo jugador, la fase pasa a ser Jugar y la colección de jugadores=2",function(){
			this.ju2=new Jugador("Luis",this.juego);
			this.ju2.asignarFicha();
			this.ju1.siguienteJugador(this.ju2);
			this.ju2.siguienteJugador(this.ju1);

			expect(this.ju2.nombre).toMatch("Luis");
			expect(this.juego.colJugadores.length).toEqual(2);
			//console.log(this.juego);
			expect(this.juego.fase.esJugar()).toBeDefined();
			expect(this.juego.fase.esJugar()).toEqual(true);
		});
	});

	describe("El juego está inicializado, tenemos dos jugadores (Pepe y Luis), comprobamos los turnos",function(){
		var ju1;
		var ju2;
		beforeEach(function(){
			this.colFichas=[new Ficha("rojo"),new Ficha("azul"), new Ficha("verde")];
			this.tablero=new Tablero();
			this.juego=new LaOca(this.colFichas,this.tablero,2);
			this.ju1=new Jugador("Pepe",this.juego);
			this.ju1.asignarFicha();
			this.ju2=new Jugador("Luis",this.juego);
			this.ju2.asignarFicha();
			this.ju1.siguienteJugador(this.ju2);
			this.ju2.siguienteJugador(this.ju1);
			this.juego.setTurno(this.ju1);
		});

		it("Comprobamos que la fase es Jugar",function(){
			//var fase=new Jugar(this.juego);
			expect(this.juego.fase.esJugar()).toBeDefined();
			expect(this.juego.fase.esJugar()).toEqual(true);
		});

		it("El turno lo tiene el jugador1",function(){
			expect(this.juego.turno.nombre).toMatch("Pepe");
		});

		it("El siguiente a jugador1 es jugador2",function(){
			expect(this.ju1.siguiente.nombre).toMatch("Luis");
			expect(this.ju1.siguiente.nombre).not.toMatch("Pepe");
		});

		it("El siguiente a jugador2 es jugador1",function(){
			expect(this.ju2.siguiente.nombre).toMatch("Pepe");
			expect(this.ju2.siguiente.nombre).not.toMatch("Luis");
		});

		it("Con turno=jugador1 (Pepe), tras usar la función cambiarTurno, el turno pasa a jugador2 (Luis)",function(){
			this.juego.cambiarTurno(this.juego.turno);
			expect(this.juego.turno.nombre).toMatch("Luis");
		});
	});

	describe("Comprobar el funcionamiento de la casilla Oca",function(){
		var ju1;
		var ju2;
		beforeEach(function(){
			this.colFichas=[new Ficha("rojo"),new Ficha("azul"), new Ficha("verde")];
			this.tablero=new Tablero();
			this.juego=new LaOca(this.colFichas,this.tablero,2);
			this.ju1=new Jugador("Pepe",this.juego);
			this.ju1.asignarFicha();
			this.ju2=new Jugador("Luis",this.juego);
			this.ju2.asignarFicha();
			this.ju1.siguienteJugador(this.ju2);
			this.ju2.siguienteJugador(this.ju1);
			this.juego.setTurno(this.ju1);
		});

		it("La fase es Jugar, el turno lo tiene jug1",function(){
			expect(this.juego.fase.esJugar()).toEqual(true);
			expect(this.juego.turno.nombre).toMatch("Pepe");
		});

		it("jug1 cae en casilla 5 y pasa a la 9 y mantiene el turno",function(){
				this.juego.fase.lanzar(this.ju1.ficha, 4);
				expect(this.ju1.ficha.casilla.posicion).toEqual(9);
				expect(this.juego.turno.nombre).toMatch("Pepe");
		});

		it("jug1 cae en casilla 9 y pasa a la 14 y mantiene el turno",function(){
				this.ju1.ficha.casilla=this.juego.tablero.getCasilla(8);
				this.juego.fase.lanzar(this.ju1.ficha, 1);
				expect(this.ju1.ficha.casilla.posicion).toEqual(14);
				expect(this.juego.turno.nombre).toMatch("Pepe");
		});

		it("jug1 cae en casilla 14 y pasa a la 18 y mantiene el turno",function(){
				this.ju1.ficha.casilla=this.juego.tablero.getCasilla(13);
				this.juego.fase.lanzar(this.ju1.ficha, 1);
				expect(this.ju1.ficha.casilla.posicion).toEqual(18);
				expect(this.juego.turno.nombre).toMatch("Pepe");
		});

		it("jug1 cae en casilla 18 y pasa a la 23 y mantiene el turno",function(){
				this.ju1.ficha.casilla=this.juego.tablero.getCasilla(17);
				this.juego.fase.lanzar(this.ju1.ficha, 1);
				expect(this.ju1.ficha.casilla.posicion).toEqual(23);
				expect(this.juego.turno.nombre).toMatch("Pepe");
		});

		it("jug1 cae en casilla 23 y pasa a la 27 y mantiene el turno",function(){
				this.ju1.ficha.casilla=this.juego.tablero.getCasilla(22);
				this.juego.fase.lanzar(this.ju1.ficha, 1);
				expect(this.ju1.ficha.casilla.posicion).toEqual(27);
				expect(this.juego.turno.nombre).toMatch("Pepe");
		});

		it("jug1 cae en casilla 27 y pasa a la 32 y mantiene el turno",function(){
				this.ju1.ficha.casilla=this.juego.tablero.getCasilla(26);
				this.juego.fase.lanzar(this.ju1.ficha, 1);
				expect(this.ju1.ficha.casilla.posicion).toEqual(32);
				expect(this.juego.turno.nombre).toMatch("Pepe");
		});

		it("jug1 cae en casilla 32 y pasa a la 36 y mantiene el turno",function(){
				this.ju1.ficha.casilla=this.juego.tablero.getCasilla(31);
				this.juego.fase.lanzar(this.ju1.ficha, 1);
				expect(this.ju1.ficha.casilla.posicion).toEqual(36);
				expect(this.juego.turno.nombre).toMatch("Pepe");
		});
		it("jug1 cae en casilla 36 y pasa a la 41 y mantiene el turno",function(){
				this.ju1.ficha.casilla=this.juego.tablero.getCasilla(35);
				this.juego.fase.lanzar(this.ju1.ficha, 1);
				expect(this.ju1.ficha.casilla.posicion).toEqual(41);
				expect(this.juego.turno.nombre).toMatch("Pepe");
		});
		it("jug1 cae en casilla 41 y pasa a la 45 y mantiene el turno",function(){
				this.ju1.ficha.casilla=this.juego.tablero.getCasilla(40);
				this.juego.fase.lanzar(this.ju1.ficha, 1);
				expect(this.ju1.ficha.casilla.posicion).toEqual(45);
				expect(this.juego.turno.nombre).toMatch("Pepe");
		});	
		it("jug1 cae en casilla 45 y pasa a la 50 y mantiene el turno",function(){
				this.ju1.ficha.casilla=this.juego.tablero.getCasilla(44);
				this.juego.fase.lanzar(this.ju1.ficha, 1);
				expect(this.ju1.ficha.casilla.posicion).toEqual(50);
				expect(this.juego.turno.nombre).toMatch("Pepe");
		});
		it("jug1 cae en casilla 50 y pasa a la 54 y mantiene el turno",function(){
				this.ju1.ficha.casilla=this.juego.tablero.getCasilla(49);
				this.juego.fase.lanzar(this.ju1.ficha, 1);
				expect(this.ju1.ficha.casilla.posicion).toEqual(54);
				expect(this.juego.turno.nombre).toMatch("Pepe");
		});		
		it("jug1 cae en casilla 54 y pasa a la 59 y mantiene el turno",function(){
				this.ju1.ficha.casilla=this.juego.tablero.getCasilla(53);
				this.juego.fase.lanzar(this.ju1.ficha, 1);
				expect(this.ju1.ficha.casilla.posicion).toEqual(59);
				expect(this.juego.turno.nombre).toMatch("Pepe");
		});	
		it("jug1 cae en casilla 59 y pasa a la 63 y mantiene el turno",function(){
			this.ju1.ficha.casilla=this.juego.tablero.getCasilla(58);
			this.juego.fase.lanzar(this.ju1.ficha, 1);
			expect(this.ju1.ficha.casilla.posicion).toEqual(63);
			expect(this.juego.turno.nombre).toMatch("Pepe");
		});
	});

	describe("Comprobar el funcionamiento de la casilla Puente",function(){
		var ju1;
		var ju2;
		beforeEach(function(){
			this.colFichas=[new Ficha("rojo"),new Ficha("azul"), new Ficha("verde")];
			this.tablero=new Tablero();
			this.juego=new LaOca(this.colFichas,this.tablero,2);
			this.ju1=new Jugador("Pepe",this.juego);
			this.ju1.asignarFicha();
			this.ju2=new Jugador("Luis",this.juego);
			this.ju2.asignarFicha();
			this.ju1.siguienteJugador(this.ju2);
			this.ju2.siguienteJugador(this.ju1);
			this.juego.setTurno(this.ju1);
		});

		it("La fase es Jugar, el turno lo tiene jug1",function(){
			expect(this.juego.fase.esJugar()).toEqual(true);
			expect(this.juego.turno.nombre).toMatch("Pepe");
		});

		it("jug1 cae en casilla 6 y pasa a la 12 y mantiene el turno",function(){
				this.ju1.ficha.casilla=this.juego.tablero.getCasilla(5);
				this.juego.fase.lanzar(this.ju1.ficha, 1);
				expect(this.ju1.ficha.casilla.posicion).toEqual(12);
				expect(this.juego.turno.nombre).toMatch("Pepe");
		});	

		it("jug1 cae en casilla 12 y pasa a la 6 y mantiene el turno",function(){
				this.ju1.ficha.casilla=this.juego.tablero.getCasilla(11);
				this.juego.fase.lanzar(this.ju1.ficha, 1);
				expect(this.ju1.ficha.casilla.posicion).toEqual(6);
				expect(this.juego.turno.nombre).toMatch("Pepe");
		});	
	});

	describe("Comprobar el funcionamiento de la casilla Posada",function(){
		var ju1;
		var ju2;
		beforeEach(function(){
			this.colFichas=[new Ficha("rojo"),new Ficha("azul"), new Ficha("verde")];
			this.tablero=new Tablero();
			this.juego=new LaOca(this.colFichas,this.tablero,2);
			this.ju1=new Jugador("Pepe",this.juego);
			this.ju1.asignarFicha();
			this.ju2=new Jugador("Luis",this.juego);
			this.ju2.asignarFicha();
			this.ju1.siguienteJugador(this.ju2);
			this.ju2.siguienteJugador(this.ju1);
			this.juego.setTurno(this.ju1);
		});

		it("La fase es Jugar, el turno lo tiene jug1",function(){
			expect(this.juego.fase.esJugar()).toEqual(true);
			expect(this.juego.turno.nombre).toMatch("Pepe");
		});

		it("jug1 cae en casilla 19 pierde dos turnos",function(){
			this.juego.turno.ficha.casilla=this.juego.tablero.getCasilla(18);
			this.juego.fase.lanzar(this.juego.turno.ficha, 1);
			expect(this.ju1.ficha.casilla.posicion).toEqual(19);
			expect(this.juego.turno.nombre).toMatch("Luis");
			expect(this.ju1.estado.esPierdeTurno2()).toEqual(true);
		});	

		it("jug1 está en la Posada y pierde dos turnos",function(){
			this.juego.turno.ficha.casilla=this.juego.tablero.getCasilla(18);
			this.juego.fase.lanzar(this.juego.turno.ficha, 1);
			expect(this.ju1.ficha.casilla.posicion).toEqual(19);
			expect(this.juego.turno.nombre).toMatch("Luis");
			expect(this.ju1.estado.esPierdeTurno2()).toEqual(true);
			//this.juego.turno.lanzar(this.ju2.ficha,1);
			this.juego.cambiarTurno(this.ju2);
			this.ju1.lanzar(this.ju1.ficha,1);	
			expect(this.ju1.estado.esPierdeTurno1()).toEqual(true);
			//this.juego.turno.lanzar(this.ju2.ficha,1);
			this.juego.cambiarTurno(this.ju2);
			this.ju1.lanzar(this.ju1.ficha,1);		
			//console.log(this.ju1.estado);		
			expect(this.ju1.estado.esVivo()).toEqual(true);			
		});	
	});

	describe("Comprobar el funcionamiento de la casilla Dados",function(){
		var ju1;
		var ju2;
		beforeEach(function(){
			this.colFichas=[new Ficha("rojo"),new Ficha("azul"), new Ficha("verde")];
			this.tablero=new Tablero();
			this.juego=new LaOca(this.colFichas,this.tablero,2);
			this.ju1=new Jugador("Pepe",this.juego);
			this.ju1.asignarFicha();
			this.ju2=new Jugador("Luis",this.juego);
			this.ju2.asignarFicha();
			this.ju1.siguienteJugador(this.ju2);
			this.ju2.siguienteJugador(this.ju1);
			this.juego.setTurno(this.ju1);
		});

		it("La fase es Jugar, el turno lo tiene jug1",function(){
			expect(this.juego.fase.esJugar()).toEqual(true);
			expect(this.juego.turno.nombre).toMatch("Pepe");
		});

		it("jug1 cae en casilla 26 y pasa a la 53 y mantiene el turno",function(){
			this.ju1.ficha.casilla=this.juego.tablero.getCasilla(25);
			this.juego.fase.lanzar(this.ju1.ficha, 1);
			expect(this.ju1.ficha.casilla.posicion).toEqual(53);
			expect(this.juego.turno.nombre).toMatch("Pepe");
		});	

		it("jug1 cae en casilla 53 y pasa a la 26 y mantiene el turno",function(){
			this.ju1.ficha.casilla=this.juego.tablero.getCasilla(52);
			this.juego.fase.lanzar(this.ju1.ficha, 1);
			expect(this.ju1.ficha.casilla.posicion).toEqual(26);
			expect(this.juego.turno.nombre).toMatch("Pepe");
		});	
	});

	describe("Comprobar casilla Pozo",function(){
		var ju1;
		var ju2;
		beforeEach(function(){
			this.colFichas=[new Ficha("rojo"),new Ficha("azul"), new Ficha("verde")];
			this.tablero=new Tablero();
			this.juego=new LaOca(this.colFichas,this.tablero,2);
			this.ju1=new Jugador("Pepe",this.juego);
			this.ju1.asignarFicha();
			this.ju2=new Jugador("Luis",this.juego);
			this.ju2.asignarFicha();
			this.ju1.siguienteJugador(this.ju2);
			this.ju2.siguienteJugador(this.ju1);
			this.juego.setTurno(this.ju1);
		});

		it("La fase es Jugar, el turno lo tiene jug1",function(){
			expect(this.juego.fase.esJugar()).toEqual(true);
			expect(this.juego.turno.nombre).toMatch("Pepe");
		});		

		it("jug1 cae en casilla 31, pierde el turno y espera a que otro jugador caiga",function(){
			this.ju1.ficha.casilla=this.juego.tablero.getCasilla(30);
			this.juego.fase.lanzar(this.ju1.ficha, 1);
			expect(this.ju1.ficha.casilla.posicion).toEqual(31);
			expect(this.juego.turno.nombre).toMatch("Luis");
		});

		it("jug1 está en el pozo y no puede jugar",function(){
			this.ju1.ficha.casilla=this.juego.tablero.getCasilla(30);
			this.juego.fase.lanzar(this.ju1.ficha, 1);
			expect(this.ju1.ficha.casilla.posicion).toEqual(31);
			expect(this.juego.turno.nombre).toMatch("Luis");
			this.juego.cambiarTurno(this.ju2);
			expect(this.ju1.estado.esPozo()).toEqual(true);
			this.juego.cambiarTurno(this.ju2);
			expect(this.ju1.estado.esPozo()).toEqual(true);
		});

		it("jug1 está en el pozo y jug2 cae y saca a jug1",function(){
			this.ju1.ficha.casilla=this.juego.tablero.getCasilla(30);
			this.juego.fase.lanzar(this.ju1.ficha, 1);
			expect(this.ju1.ficha.casilla.posicion).toEqual(31);
			this.ju2.ficha.casilla=this.juego.tablero.getCasilla(30);
			this.juego.fase.lanzar(this.ju2.ficha, 1);
			expect(this.ju1.estado.esVivo()).toEqual(true);
			expect(this.ju2.estado.esPozo()).toEqual(true);
		});
	});

	describe("Comprobar el funcionamiento de la casilla Laberinto",function(){
		var ju1;
		var ju2;
		beforeEach(function(){
			this.colFichas=[new Ficha("rojo"),new Ficha("azul"), new Ficha("verde")];
			this.tablero=new Tablero();
			this.juego=new LaOca(this.colFichas,this.tablero,2);
			this.ju1=new Jugador("Pepe",this.juego);
			this.ju1.asignarFicha();
			this.ju2=new Jugador("Luis",this.juego);
			this.ju2.asignarFicha();
			this.ju1.siguienteJugador(this.ju2);
			this.ju2.siguienteJugador(this.ju1);
			this.juego.setTurno(this.ju1);
		});

		it("La fase es Jugar, el turno lo tiene jug1",function(){
			expect(this.juego.fase.esJugar()).toEqual(true);
			expect(this.juego.turno.nombre).toMatch("Pepe");
		});

		it("jug1 cae en casilla 42 pierde dos turnos",function(){
			this.juego.turno.ficha.casilla=this.juego.tablero.getCasilla(41);
			this.juego.fase.lanzar(this.juego.turno.ficha, 1);
			expect(this.ju1.ficha.casilla.posicion).toEqual(42);
			expect(this.juego.turno.nombre).toMatch("Luis");
			expect(this.ju1.estado.esPierdeTurno2()).toEqual(true);
		});	

		it("jug1 está en el Laberinto y pierde dos turnos",function(){
			this.juego.turno.ficha.casilla=this.juego.tablero.getCasilla(41);
			this.juego.fase.lanzar(this.juego.turno.ficha, 1);
			expect(this.ju1.ficha.casilla.posicion).toEqual(42);
			expect(this.juego.turno.nombre).toMatch("Luis");
			expect(this.ju1.estado.esPierdeTurno2()).toEqual(true);
			//this.juego.turno.lanzar(this.ju2.ficha,1);
			this.juego.cambiarTurno(this.ju2);
			this.ju1.lanzar(this.ju1.ficha,1);	
			expect(this.ju1.estado.esPierdeTurno1()).toEqual(true);
			//this.juego.turno.lanzar(this.ju2.ficha,1);
			this.juego.cambiarTurno(this.ju2);
			this.ju1.lanzar(this.ju1.ficha,1);		
			//console.log(this.ju1.estado);		
			expect(this.ju1.estado.esVivo()).toEqual(true);			
		});	
	});

	describe("Comprobar el funcionamiento de la casilla Cárcel",function(){
		var ju1;
		var ju2;
		beforeEach(function(){
			this.colFichas=[new Ficha("rojo"),new Ficha("azul"), new Ficha("verde")];
			this.tablero=new Tablero();
			this.juego=new LaOca(this.colFichas,this.tablero,2);
			this.ju1=new Jugador("Pepe",this.juego);
			this.ju1.asignarFicha();
			this.ju2=new Jugador("Luis",this.juego);
			this.ju2.asignarFicha();
			this.ju1.siguienteJugador(this.ju2);
			this.ju2.siguienteJugador(this.ju1);
			this.juego.setTurno(this.ju1);
		});

		it("La fase es Jugar, el turno lo tiene jug1",function(){
			expect(this.juego.fase.esJugar()).toEqual(true);
			expect(this.juego.turno.nombre).toMatch("Pepe");
		});

		it("jug1 cae en casilla 52 pierde tres turnos",function(){
			this.juego.turno.ficha.casilla=this.juego.tablero.getCasilla(51);
			this.juego.fase.lanzar(this.juego.turno.ficha, 1);
			expect(this.ju1.ficha.casilla.posicion).toEqual(52);
			expect(this.juego.turno.nombre).toMatch("Luis");
			expect(this.ju1.estado.esPierdeTurno3()).toEqual(true);
		});	

		it("jug1 está en el Cárcel y pierde tres turnos",function(){
			this.juego.turno.ficha.casilla=this.juego.tablero.getCasilla(51);
			this.juego.fase.lanzar(this.juego.turno.ficha, 1);
			expect(this.ju1.ficha.casilla.posicion).toEqual(52);
			expect(this.juego.turno.nombre).toMatch("Luis");
			expect(this.ju1.estado.esPierdeTurno3()).toEqual(true);
			this.juego.cambiarTurno(this.ju2);
			this.ju1.lanzar(this.ju1.ficha,1);	
			expect(this.ju1.estado.esPierdeTurno2()).toEqual(true);
			this.juego.cambiarTurno(this.ju2);
			this.ju1.lanzar(this.ju1.ficha,1);	
			expect(this.ju1.estado.esPierdeTurno1()).toEqual(true);
			this.juego.cambiarTurno(this.ju2);
			this.ju1.lanzar(this.ju1.ficha,1);		
			expect(this.ju1.estado.esVivo()).toEqual(true);			
		});	
	});

	describe("Comprobar el funcionamiento de la casilla Calavera",function(){
		var ju1;
		var ju2;
		beforeEach(function(){
			this.colFichas=[new Ficha("rojo"),new Ficha("azul"), new Ficha("verde")];
			this.tablero=new Tablero();
			this.juego=new LaOca(this.colFichas,this.tablero,2);
			this.ju1=new Jugador("Pepe",this.juego);
			this.ju1.asignarFicha();
			this.ju2=new Jugador("Luis",this.juego);
			this.ju2.asignarFicha();
			this.ju1.siguienteJugador(this.ju2);
			this.ju2.siguienteJugador(this.ju1);
			this.juego.setTurno(this.ju1);
		});

		it("La fase es Jugar, el turno lo tiene jug1",function(){
			expect(this.juego.fase.esJugar()).toEqual(true);
			expect(this.juego.turno.nombre).toMatch("Pepe");
		});

		it("jug1 cae en casilla 58 pierde y vuelve a la 1",function(){
			this.juego.turno.ficha.casilla=this.juego.tablero.getCasilla(57);
			this.juego.fase.lanzar(this.juego.turno.ficha, 1);
			expect(this.ju1.ficha.casilla.posicion).toEqual(1);
			expect(this.juego.turno.nombre).toMatch("Luis");
		});	
	});

	describe("Comprobar el funcionamiento de la casilla Fin o Jardin",function(){
		var ju1;
		var ju2;
		beforeEach(function(){
			this.colFichas=[new Ficha("rojo"),new Ficha("azul"), new Ficha("verde")];
			this.tablero=new Tablero();
			this.juego=new LaOca(this.colFichas,this.tablero,2);
			this.ju1=new Jugador("Pepe",this.juego);
			this.ju1.asignarFicha();
			this.ju2=new Jugador("Luis",this.juego);
			this.ju2.asignarFicha();
			this.ju1.siguienteJugador(this.ju2);
			this.ju2.siguienteJugador(this.ju1);
			this.juego.setTurno(this.ju1);
		});

		it("La fase es Jugar, el turno lo tiene jug1",function(){
			expect(this.juego.fase.esJugar()).toEqual(true);
			expect(this.juego.turno.nombre).toMatch("Pepe");
		});

		it("jug1 cae en casilla 63 y gana, el juego termina",function(){
			this.juego.turno.ficha.casilla=this.juego.tablero.getCasilla(62);
			this.juego.fase.lanzar(this.juego.turno.ficha, 1);
			expect(this.ju1.ficha.casilla.posicion).toEqual(63);
			expect(this.juego.fase.esFin()).toEqual(true);
		});					
	})
})