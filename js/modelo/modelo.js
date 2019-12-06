/*
 * Modelo
 */
var Modelo = function() {
  this.preguntas = [];
  this.ultimoId = 0;

  //inicializacion de eventos
  this.preguntaAgregada = new Evento(this);
  this.preguntaEliminada = new Evento(this);
  this.preguntaEditada = new Evento(this);
  this.preguntasBorradas = new Evento(this);
  this.votoAgregado = new Evento(this);
  this.verificarLocalStorage();
};


Modelo.prototype = {
  //se obtiene el id más grande asignado a una pregunta
  obtenerUltimoId: function() {
    if (this.preguntas.length === 0){
      return 0;
    } else {
      return this.preguntas[this.preguntas.length-1].id;
    }
  },

  //Guia 2 paso 1 - Funcionalidades del modelo
  //se agrega una pregunta dado un nombre y sus respuestas
  agregarPregunta: function(nombre, respuestas) {
    var id = this.obtenerUltimoId();
    id++;
    var nuevaPregunta = {'textoPregunta': nombre, 'id': id, 'cantidadPorRespuesta': respuestas};
    this.preguntas.push(nuevaPregunta);
    this.guardar();
    this.preguntaAgregada.notificar();
  },

  borrarPregunta: function(id){
    this.preguntas = this.preguntas.filter(function(elemento){
       return elemento.id != id; 
    });
    this.guardar();
    this.preguntaEliminada.notificar();
  },

  editarPregunta: function(id, nuevoTexto){
    this.preguntas.forEach(function(pregunta){
      if (pregunta.id == id) {
        pregunta.textoPregunta = nuevoTexto;
      }
    });
    this.guardar();
    this.preguntaEditada.notificar();
  },


  borrarTodo: function(){
    this.preguntas = [];
    this.guardar();
    this.preguntasBorradas.notificar();
  },

  //Se agregan votos
  agregarVoto: function(id, respuesta){
    this.preguntas.forEach(function(pregunta){
      if(pregunta.id == id){
        pregunta.cantidadPorRespuesta.forEach(function(r){
          if(r.textoRespuesta == respuesta){
            r.cantidad += 1;
          };
        });
      };
    });
    this.guardar();
    this.votoAgregado.notificar();
  },


//Guia 2 paso 2 - agrego LocalStorage
  guardar: function () {
    localStorage.setItem('preguntas', JSON.stringify(this.preguntas));
  },
  verificarLocalStorage: function () {
    if (localStorage.getItem('preguntas') !== null) {
      this.preguntas = JSON.parse(localStorage.getItem('preguntas'));
    }
  },
};

