describe("El juego de la Oca...",function(){

	var juego;
	var coleccionFichas;
	var tablero;
	var jugador;

	describe("En cuanto a la inicialización",function(){
		beforeEach(function(){
			this.juego = (new LaOcaFactory2Fichas()).crearJuego();
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

		it("...la coleccion de fichas debe tener 3 fichas",function(){
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
			this.jugador=new Jugador("Pepe",this.juego);
			expect(this.jugador.nombre).toMatch("Pepe");
		});

		xit("...el juego permite asignar una ficha libre a Pepe",function(){

		});
	});

	describe("Comprobar el tablero...",function(){
		beforeEach(function(){
			this.juego = (new LaOcaFactory2Fichas()).crearJuego();
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

		it("...las casillas 5,9,14,18,23,27,32... tienen Oca",function(){
			expect(this.juego.tablero.casillas[5].tema.titulo).toEqual("Oca");
			expect(this.juego.tablero.casillas[9].tema.titulo).toEqual("Oca");
			expect(this.juego.tablero.casillas[14].tema.titulo).toEqual("Oca");
			expect(this.juego.tablero.casillas[18].tema.titulo).toEqual("Oca");
			expect(this.juego.tablero.casillas[23].tema.titulo).toEqual("Oca");
			expect(this.juego.tablero.casillas[27].tema.titulo).toEqual("Oca");
			expect(this.juego.tablero.casillas[32].tema.titulo).toEqual("Oca");
			//faltan casillas (completar)
		})
	});

	describe("Comprobar el funcionamiento del tema Oca",function(){
		beforeEach(function(){
			this.juego = (new LaOcaFactory2Fichas()).crearJuego();
		});
	})


})
