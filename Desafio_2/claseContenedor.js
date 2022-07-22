const fs = require('fs')

class Contenedor {
    constructor(fileRoute){
        this.fileRoute = fileRoute
    }
    
    #viewFile = async () => {
        let items = [];
        try {
            items = await fs.promises.readFile(this.fileRoute, 'utf-8');
        } catch (error) {
            console.log(error)
        }
        if(items === '') items = '[]';
        return (JSON.parse(items))
    }

    save = async objData => {
        try {
            const products = await this.#viewFile()
            if(products.length){ 
                /*Si ya existen productos en el fichero, estos se deben mantener y agregar los nuevos*/
                await fs.promises.writeFile(this.fileRoute,
                                            JSON.stringify([...products,
                                                           {...objData, id: products.length + 1}],
                                                           null, 4),
                                            'utf-8')

                return products.length + 1
            }else{
                await fs.promises.writeFile(this.fileRoute,
                                            JSON.stringify([{...objData, id: 1}], null, 4),
                                            'utf-8')
                
                return 1
            }
        } catch (error) {
            console.log(`Ha ocurrido el siguiente error: ${error}`)
        }          
    }
    getById = async id => { 
        try {
            const products = await this.#viewFile()
            let productWithId = products.find(item => item.id === id)
            if(productWithId.length){
                return productWithId
            }else{
                throw Error = "No existe un producto con este id.\n"
            }
        } catch (error) {
            return error
        }
    } 

    getAll = async () => {
        try {
            const products = await this.#viewFile()
            if(products.length){
                return products
            }else{
                throw Error = "No hay productos cargados.\n"
            }
        } catch (error) {
            return error
        }
    }
        
    deleteById = async id => { //void  =>  Elimina del archivo el objeto con el id buscado.

    } 
    
    deleteAll = async () => { // void  =>  Elimina todos los objetos presentes en el archivo.

    }        
        
}

module.exports = Contenedor