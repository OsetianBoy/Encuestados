/*
 * Controlador
 */
var Controlador = function(modelo) {
  this.modelo = modelo;
};

Controlador.prototype = {
  agregarPregunta: function(pregunta, respuestas) {
      this.modelo.agregarPregunta(pregunta, respuestas);
  },

  botonBorrarPregunta: function(){
    var id = parseInt($('.list-group-item.active').attr('id'));
    if (id > 0){
      this.modelo.borrarPregunta(id);
    }
  },

  botonEditarPregunta: function(nuevoNombre){
    var id = parseInt($('.list-group-item.active').attr('id'));
    if(id > 0){
      this.modelo.editarPregunta(id, nuevoNombre);
    }
  },

  borrarTodo: function(){
   this.modelo.borrarTodo();
  },

  agregarVoto: function(pregunta,respuestaSeleccionada){
    this.modelo.agregarVoto(pregunta, respuestaSeleccionada);
  },
};