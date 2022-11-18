const socket = io.connect()

/* ---------------------------- products section ---------------------------- */
const addProductForm = document.getElementById('addProductForm')

addProductForm.addEventListener('submit', evt => {
    evt.preventDefault()
    const product = {
        title: addProductForm[0].value,
        price: addProductForm[1].value,
        thumbnail: addProductForm[2].value
    }
    socket.emit('update-product', product)
    addProductForm.reset()
})

socket.on('view-products', products => {
    makeHtmlTable(products).then(html => document.getElementById('product-list').innerHTML = html)
})

async function makeHtmlTable(products) {
    const res = await fetch('templates/viewProducts.hbs')
    let template = await res.text()
    template = Handlebars.compile(template)
    const html = template({ products })
    return html
}

/* ---------------------------- messages section ---------------------------- */

const inputUsername = document.getElementById('inputUsername')
const inputMessage = document.getElementById('inputMessage')
const btnSend = document.getElementById('btnSend')
const addMessageForm = document.getElementById('addMessageForm')

addMessageForm.addEventListener('submit', evt => {
    evt.preventDefault()

    const msg = { autor: inputUsername.value, msg: inputMessage.value }
    socket.emit('new-message', msg)
    addMessageForm.reset()
    inputMessage.focus()
    inputUsername.value = ""
})

socket.on('view-messages', messages => {
    makeHtmlList(messages).then(html => document.getElementById('message-list').innerHTML = html)
})

async function makeHtmlList(messages) {
    const res = await fetch('templates/viewMessages.hbs')
    let template = await res.text()
    template = Handlebars.compile(template)
    const html = template({ messages })
    return html
}

inputUsername.addEventListener('input', () => {
    const existEmail = inputUsername.value.length
    const hayTexto = inputMessage.value.length
    inputMessage.disabled = !existEmail
    btnSend.disabled = !existEmail || !hayTexto
})

inputMessage.addEventListener('input', () => {
    const hayTexto = inputMessage.value.length
    btnSend.disabled = !hayTexto
})
