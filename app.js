new Vue({
  el: "#app",
  data: {
    saludJugador: 100,
    saludMonstruo: 100,
    hayUnaPartidaEnJuego: false,
    turnos: [], //es para registrar los eventos de la partida
    esJugador: false,
    rangoAtaque: [3, 10],
    rangoAtaqueEspecial: [10, 20],
    rangoAtaqueDelMonstruo: [5, 12],
  },

  methods: {
    getSalud(salud) {
      return `${salud}%`;
    },
    empezarPartida: function () {
      this.hayUnaPartidaEnJuego = true;
    },
    atacar: function () {
      if (!this.esJugador) {
        let numRandom = getrandom(
          this.rangoAtaqueDelMonstruo[0],
          this.rangoAtaqueDelMonstruo[1]
        );
        this.saludJugador = this.calcularHeridas(this.saludJugador, numRandom);
        if (this.saludJugador === 100) {
          this.saludMonstruo = 100;
          this.turnos.length = 0;
          let turno = {
            text: "EL MONSTRUO ES EL GANADOR",
          };
          this.turnos.push(turno);
        } else {
          let turno = {
            text: "EL MONSTRUO LASTIMA AL JUGADOR EN " + numRandom,
            esJugador: false,
          };
          this.turnos.push(turno);
          this.esJugador = true;
        }
      } else {
        this.ataqueDelMonstruo();
      }
      function getrandom(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }
    },
    ataqueEspecial: function () {
      let numRandomEspecial;
      if (!this.esJugador) {
        numRandomEspecial = getrandom(
          this.rangoAtaqueEspecial[0],
          this.rangoAtaqueEspecial[1]
        );
        this.saludJugador = this.calcularHeridas(
          this.saludJugador,
          numRandomEspecial
        );
        console.log("Esta atacando el monstruo")
        if (this.saludJugador === 100) {
          this.saludMonstruo = 100;
          this.turnos.length = 0;
          let turno = {
            text: "EL MONSTRUO ES EL GANADOR",
          };
          this.turnos.push(turno);
        } else {
          let turno = {
            text:
              "EL MONSTRUO GOLPEA DURAMENTE AL JUGADOR EN " + numRandomEspecial,
            esJugador: true,
          };
          this.turnos.push(turno);
          this.esJugador = true;
        }
      } else {
        numRandomEspecial = getrandom(
          this.rangoAtaqueEspecial[0],
          this.rangoAtaqueEspecial[1]
        );
        this.saludMonstruo = this.calcularHeridas(
          this.saludMonstruo,
          numRandomEspecial
        );
        console.log("Esta atacando el jugador")
        if (this.saludMonstruo === 100) {
            this.saludMonstruo = 100;
            this.turnos.length = 0;
            let turno = {
              text: "EL JUGADOR ES EL GANADOR",
            };
            this.turnos.push(turno);
          } else {
            let turno = {
              text:
                "EL JUGADOR GOLPEA DURAMENTE AL MONTRUO EN " + numRandomEspecial,
                 esJugador: false,
            };
            this.turnos.push(turno);
            this.esJugador = false;
          }
      }
      function getrandom(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }
    },

    curar: function () {
    let salud;
    let recuperacion;
    if (!this.esJugador){
    salud = this.saludMonstruo;
    salud + 10 > 100 ? recuperacion = 100 :  recuperacion = salud + 10;
    salud === 100 ? this.saludMonstruo = 100 : this.saludMonstruo = recuperacion;
    this.esJugador = true;
    }else{
    salud = this.saludJugador;
    salud + 10 > 100 ? recuperacion = 100 :  recuperacion = salud + 10;
   salud === 100 ? this.saludJugador = 100 : this.saludJugador = recuperacion;   
     this.esJugador = false;
    }
    },

    registrarEvento(evento) {},
    terminarPartida: function () {
      this.hayUnaPartidaEnJuego = false;
      this.saludJugador = 100;
      this.saludMonstruo = 100;
      this.turnos.length = 0;
    },

    ataqueDelMonstruo: function () {
      let numRandom = getrandom(this.rangoAtaque[0], this.rangoAtaque[1]);
      this.saludMonstruo = this.calcularHeridas(this.saludMonstruo, numRandom);
      if (this.saludMonstruo === 100) {
        this.saludJugador = 100;
        this.turnos.length = 0;
        let turno = {
          text: "EL JUGADOR ES EL GANADOR",
        };
        this.turnos.push(turno);
      } else {
        let turno = {
          text: "EL JUGADOR GOLPEA AL MONSTRUO EN " + numRandom,
          esJugador: true,
        };
        this.turnos.push(turno);
        this.esJugador = false;
      }
      function getrandom(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }
    },
    calcularHeridas: function (salud, numRandom) {
      let saludBarra;
      salud - numRandom < 0
        ? (saludBarra = 100)
        : (saludBarra = salud - numRandom);
      return saludBarra;
    },
    verificarGanador: function () {
      return false;
    },
    cssEvento(turno) {
      //Este return de un objeto es prque vue asi lo requiere, pero ponerlo acá queda mucho mas entendible en el codigo HTML.
      return {
        "player-turno": turno.esJugador,
        "monster-turno": !turno.esJugador,
      };
    },
  },
});
