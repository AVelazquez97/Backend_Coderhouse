//------- 1 -------
class Usuario{
    //------- 2 -------
    constructor(nombre, apellido, libros, mascotas){
        this.nombre = nombre
        this.apellido = apellido
        this.libros = libros
        this.mascotas = mascotas
    }
    //------- 3 -------
    getFullName(){
        const fullName = `${this.nombre} ${this.apellido}`
        return fullName
    }

    addMascota(nombreMascota){
        this.mascotas.push(nombreMascota)
    }

    countMascotas(){
        return this.mascotas.length
    }
    
    addBook(nombreLibro, autorLibro){
        this.libros.push({
            nombreLibro,
            autorLibro
        });
    }
   
    getBookNames(){
        const bookNames = this.libros.map(nombre => nombre.nombreLibro)
        return bookNames
    }
}

//------- 4 -------

const libros = [
    {nombreLibro:"El Alquimista", autorLibro: "Paulo Cohelo"},
    {nombreLibro: "Donde tus sueños te lleven", autorLibro: "Javier Iriondo"}
]

const mascotas = ["Tequila", "Arnold", "Luna"]

const usuario = new Usuario('Alexis', 'Velázquez', libros, mascotas)

console.log("El nombre completo del usuario es: ", usuario.getFullName(), '\n')
console.log("La cantidad de mascotas que tiene el usuario es: ", usuario.countMascotas(), '\n')
console.log("El catalogo de libros del usuario es: ", usuario.getBookNames(), '\n')
usuario.addMascota("Greta")
usuario.addBook("El vendedor más grande del mundo","Og Mandino")
console.log("La nueva cantidad de mascotas que tiene el usuario es:", usuario.countMascotas(), '\n')
console.log("Ahora, el catalogo de libros del usuario es: ", usuario.getBookNames())