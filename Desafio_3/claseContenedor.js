import fs from 'fs'

export default class Contenedor {
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
                    JSON.stringify([...products, {...objData, id: products.length + 1}], null, 4),
                    'utf-8')

                return products.length + 1
            }else{
                await fs.promises.writeFile(this.fileRoute,
                                            JSON.stringify([{...objData, id: 1}], null, 4),
                                            'utf-8')
                
                return 1
            }
        } catch (error) {
            throw `Ha ocurrido el siguiente error: ${error}`
        }          
    }
    getById = async id => { 
        try {
            const products = await this.#viewFile()
            let productWithId = products.find(item => item.id === id)
            if(productWithId){
                return productWithId
            }else{
                throw Error = "No existe un producto con este id."
            }
        } catch (error) {
            throw `Ha ocurrido el siguiente error: ${error}`
        }
    } 

    getAll = async () => {
        try {
            const products = await this.#viewFile()
            if(products.length){
                return products
            }else{
                throw Error = "No hay productos cargados."
            }
        } catch (error) {
            throw `Ha ocurrido el siguiente error: ${error}`
        }
    }
        
    deleteById = async id => { 
        try {
            const products = await this.#viewFile()
            let productWithId = products.find(item => item.id === id)
            if(productWithId){
                let productsWhitoutIdItem = products.filter(item => item.id !== id )
                await fs.promises.writeFile(this.fileRoute,
                                            JSON.stringify([...productsWhitoutIdItem], null, 4))
            }else{
                throw Error = "No existe un producto con este id."
            }
        } catch (error) {
            throw `Ha ocurrido el siguiente error: ${error}`
        }
    } 
    
    deleteAll = async () => { 
        try {
            const products = await this.#viewFile()
            if(products.length){
                await fs.promises.writeFile(this.fileRoute, '[]' ,'utf8')
            }
        } catch (error) {
            throw `El archivo no se pudo grabar: ${error}`
        }
    }        
}
