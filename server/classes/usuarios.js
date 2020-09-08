
class Usuarios {

  constructor(){
    this.personas = [];
  }


  //Método para agregar objetos de personas del chat a un arreglo
  agregarPersona( id, nombre, sala ){
    let persona = {id, nombre, sala};

    this.personas.push(persona);
    return this.personas;
  }


  //Método para obtener una persona por el id
  getPersona( id ){
    let persona = this.personas.filter( pers =>{
      return pers.id === id;
    })[0];
    
    return persona;
  }
  

  //Método para obtener a todas las personas
  getPersonas(){
    return this.personas;
  }


  //Método para obtener las personas por sala
  getPersonasPorSala( sala ){
    let personaEnSala = this.personas.filter( pers => {
      return pers.sala === sala;
    });
    return personaEnSala;
  }



  //Método para eliminar una persona del arreglo personas
  borrarPersona( id ){
    let personaBorrada = this.getPersona(id);

    this.personas = this.personas.filter( pers =>{
      return pers.id != id;
    });

    return personaBorrada;
  }





}//Fin de la clase



module.exports = {
  Usuarios
}