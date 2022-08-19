const fs = require('fs')

class productContainer {
    constructor(fileRoute){
        this.fileRoute = fileRoute
    }
    
    #viewFile = async () => {
        let objects = []
        try {
            objects = await fs.promises.readFile(this.fileRoute, 'utf-8');
            if(objects === '') objects = '[]'
        } catch (error) {
            return []
        }
        return (JSON.parse(objects))
    }

    save = async objData => {
        try {
            const objects = await this.#viewFile()
            if(objects.length){ 
                /*Si ya existen objetos en el fichero, estos se deben mantener y agregar el nuevo*/
                await fs.promises.writeFile(this.fileRoute,
                    JSON.stringify([...objects, {...objData, id: objects.length + 1}], null, 4),
                    'utf-8')

                return objects.length + 1
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
            const objects = await this.#viewFile()
            let objectWithId = objects.find(item => item.id === id)
            if(objectWithId){
                return objectWithId
            }else{
                return { error : 'Producto no encontrado' }
            }
        } catch (error) {
            throw `${error}`
        }
    } 

    getAll = async () => {
        try {
            const objects = await this.#viewFile()
            if(objects.length){
                return objects
            }else{
                return { error : 'No se encontraron productos' }
            }
        } catch (error) {
            throw `${error}`
        }
    }
        
    deleteById = async id => { 
        try {
            const objects = await this.#viewFile()
            let objectWithId = objects.find(item => item.id === id)
            if(objectWithId){
                let objectsWhitoutIdItem = objects.filter(item => item.id !== id )
                await fs.promises.writeFile(this.fileRoute,
                                            JSON.stringify([...objectsWhitoutIdItem], null, 4))
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
            const objects = await this.#viewFile()
            if(objects.length){
                await fs.promises.writeFile(this.fileRoute, '[]' ,'utf8')
            }
        } catch (error) {
            throw `${error}`
        }
    }
    
    getRandomProduct = async () => {
        try {
            const objects = await this.#viewFile()
            if(objects.length){
                const randomId = Math.ceil(Math.random() * objects.length)
                const object = await this.getById(randomId)
                return object
            }else{
                return { error : 'No se encontraron productos' }
            }
        } catch (error) {
            throw `${error}`
        }
    }

    updateProduct = async objData => {
        try {
            let objects = await this.#viewFile()
            const objectIndex = objects.findIndex(object => object.id === objData.id)
            if(objectIndex !== -1){ 
                objects[objectIndex] = objData
                await fs.promises.writeFile(this.fileRoute, JSON.stringify(objects, null, 4), 'utf-8')

                return { msg : `El producto con el id ${objData.id} fue actualizado con éxito` }
            }else{
                return { error : 'El producto con el id indicado no existe' }
            }
        } catch (error) {
            throw `${error}`
        }          
    }
}

module.exports = productContainer