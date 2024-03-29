const fs = require('fs')

class Contenedor {
    constructor(fileRoute){
        this.fileRoute = fileRoute
    }
    
    #viewFile = async () => {
        let products = []
        try {
            products = await fs.promises.readFile(this.fileRoute, 'utf-8');
            if(products === '') products = '[]'
        } catch (error) {
            return []
        }
        return (JSON.parse(products))
    }

    save = async objData => {
        try {
            const products = await this.#viewFile()
            if(products.length){ 
                /*Si ya existen productos en el fichero, estos se deben mantener y agregar el nuevo*/
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
            throw `${error}`
        }          
    }
    getById = async id => { 
        try {
            const products = await this.#viewFile()
            let productWithId = products.find(item => item.id === id)
            if(productWithId){
                return productWithId
            }else{
                return { error : 'Producto no encontrado' }
            }
        } catch (error) {
            throw `${error}`
        }
    } 

    getAll = async () => {
        try {
            const products = await this.#viewFile()
            if(products.length){
                return products
            }else{
                return { error : 'No se encontraron productos' }
            }
        } catch (error) {
            throw `${error}`
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
                return { msg : 'El producto fue eliminado' }
            }else{
                return { error : 'Producto no encontrado' }
            }
        } catch (error) {
            throw `${error}`
        }
    } 
    
    deleteAll = async () => { 
        try {
            const products = await this.#viewFile()
            if(products.length){
                await fs.promises.writeFile(this.fileRoute, '[]' ,'utf8')
            }
        } catch (error) {
            throw `${error}`
        }
    }
    
    getRandomProduct = async () => {
        try {
            const products = await this.#viewFile()
            if(products.length){
                const randomId = Math.ceil(Math.random() * products.length)
                const product = await this.getById(randomId)
                return product
            }else{
                return { error : 'No se encontraron productos' }
            }
        } catch (error) {
            throw `${error}`
        }
    }

    updateProduct = async objData => {
        try {
            let products = await this.#viewFile()
            const productIndex = products.findIndex(product => product.id === objData.id)
            if(productIndex !== -1){ 
                products[productIndex] = objData
                await fs.promises.writeFile(this.fileRoute, JSON.stringify(products, null, 4), 'utf-8')

                return { msg : `El producto con el id ${objData.id} fue actualizado con éxito` }
            }else{
                return { error : 'El producto con el id indicado no existe' }
            }
        } catch (error) {
            throw `${error}`
        }          
    }
}

module.exports = Contenedor