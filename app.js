/* function to get the products */
async function getProducts() {
    let products = []
    if (localStorage.getItem("products")) {
        products = await JSON.parse(localStorage.getItem('products'))
    } else {
        products = await start()
    }

    showProducts(products)

    return products
}

function getCarrito() {
    let carrito
    if (localStorage.getItem("carrito")) {
        carrito = JSON.parse(localStorage.getItem("carrito"))
    } else {
        carrito = []
    }
    return carrito
}

/* Formulario de carga de un nuevo producto */
function createProduct() {
    const main__section = document.getElementById("main__section")

    const form = document.createElement("form")
    form.setAttribute("id", "form")
    form.setAttribute("class", "col-3 ms-2")

    //
    const name__label = document.createElement("label")
    name__label.setAttribute("class", "form-label")
    name__label.setAttribute("for", "product__name")
    name__label.innerText = "Name"

    form.appendChild(name__label)

    const name__input = document.createElement("input")
    name__input.setAttribute("id", "product__name")
    name__input.setAttribute("type", "text")
    name__input.setAttribute("class", "form-control")
    name__input.setAttribute("required", true)

    form.appendChild(name__input)

    //
    const description__label = document.createElement("label")
    description__label.setAttribute("class", "form-label")
    description__label.setAttribute("for", "product__description")
    description__label.innerText = "Description"

    form.appendChild(description__label)

    const description__input = document.createElement("input")
    description__input.setAttribute("id", "product__description")
    description__input.setAttribute("type", "text")
    description__input.setAttribute("class", "form-control")
    description__input.setAttribute("required", true)

    form.appendChild(description__input)

    //
    const cost__label = document.createElement("label")
    cost__label.setAttribute("class", "form-label")
    cost__label.setAttribute("for", "product__cost")
    cost__label.innerText = "Cost"

    form.appendChild(cost__label)

    const cost__input = document.createElement("input")
    cost__input.setAttribute("id", "product__cost")
    cost__input.setAttribute("type", "number")
    cost__input.setAttribute("class", "form-control")
    cost__input.setAttribute("required", true)

    form.appendChild(cost__input)

    //
    const price__label = document.createElement("label")
    price__label.setAttribute("class", "form-label")
    price__label.setAttribute("for", "product__price")
    price__label.innerText = "price"

    form.appendChild(price__label)

    const price__input = document.createElement("input")
    price__input.setAttribute("id", "product__price")
    price__input.setAttribute("type", "number")
    price__input.setAttribute("class", "form-control")
    price__input.setAttribute("required", true)

    form.appendChild(price__input)

    //
    const submit__button = document.createElement("button")
    submit__button.setAttribute("id", "submit__button")
    submit__button.setAttribute("class", "btn btn-primary mt-2")
    submit__button.setAttribute("type", "submit")
    submit__button.innerText = "submit"

    form.appendChild(submit__button)

    const cancel_button = document.createElement("button")
    cancel_button.setAttribute("id", "cancel_button")
    cancel_button.setAttribute("class", "btn btn-danger mt-2")
    cancel_button.onclick = () => {
        main__section.innerHTML = ''
        showProducts(products)
    }
    cancel_button.innerText = 'Cancelar'

    form.appendChild(cancel_button)

    main__section.innerHTML = ''
    main__section.append(form)

    form.addEventListener('submit', (e) => {

        e.preventDefault()

        let form = e.target

        let name
        name = form.children[1].value

        let description
        description = form.children[3].value

        let cost
        cost = parseFloat(form.children[5].value)

        let price
        price = parseFloat(form.children[7].value)

        const new_product = new Product(products.length, name, description, cost, price)

        products.push(new_product)

        saveLocal('products', JSON.stringify(products))
        main__section.innerHTML = ''

        Toastify({

            text: "Producto creado correctamente",

            duration: 9000,

            gravity: 'bottom',

            position: 'right',

            style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)",
            }

        }).showToast()

        showProducts(products)
    })

}


function createItem(product) {
    const main__section = document.getElementById("main__section")
    main__section.innerHTML = ''

    const title = document.createElement("h4")
    title.setAttribute("class", "ms-2")
    title.innerText = "NUEVO ITEM"
    main__section.appendChild(title)

    const form = document.createElement("form")
    form.setAttribute("id", "form")
    form.setAttribute("class", "col-3 ms-2")
    //
    const description__label = document.createElement("label")
    description__label.setAttribute("class", "form-label")
    description__label.setAttribute("for", "product__description")
    description__label.innerText = "Description"

    form.appendChild(description__label)

    const description__input = document.createElement("input")
    description__input.setAttribute("id", "item__description")
    description__input.setAttribute("type", "text")
    description__input.setAttribute("class", "form-control")
    description__input.setAttribute("required", true)

    form.appendChild(description__input)

    //
    const code__label = document.createElement("label")
    code__label.setAttribute("class", "form-label")
    code__label.setAttribute("for", "item__code")
    code__label.innerText = "Codigo"

    form.appendChild(code__label)

    const code__input = document.createElement("input")
    code__input.setAttribute("id", "product__code")
    code__input.setAttribute("type", "text")
    code__input.setAttribute("class", "form-control")
    code__input.setAttribute("required", true)

    form.appendChild(code__input)

    //
    const submit__button = document.createElement("button")
    submit__button.setAttribute("id", "submit__button")
    submit__button.setAttribute("class", "btn btn-primary mt-2")
    submit__button.setAttribute("type", "submit")
    submit__button.innerText = "submit"

    form.appendChild(submit__button)

    const cancel_button = document.createElement("button")
    cancel_button.setAttribute("id", "cancel_button")
    cancel_button.setAttribute("class", "btn btn-danger mt-2")
    cancel_button.onclick = () => {
        main__section.innerHTML = ''
        showProducts(products)
    }
    cancel_button.innerText = 'Cancelar'

    form.appendChild(cancel_button)

    main__section.append(form)

    form.addEventListener('submit', (e) => {

        e.preventDefault()

        let form = e.target

        let description
        description = form.children[1].value

        let code
        code = form.children[3].value

        const new_item = new Item(product.id, (product.items.length), code, description)
        product.items.push(new_item)

        saveLocal('products', JSON.stringify(products))

        main__section.innerHTML = ''
        ++product.stock

        Toastify({

            text: "Item creado correctamente",

            duration: 9000,

            gravity: 'bottom',

            position: 'right',

            style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)",
            }

        }).showToast()

        console.log(products)
        showProducts(products)
    })
}

/* Guarda un item en el local storage */
const saveLocal = (key, value) => { localStorage.setItem(key, value) }

/* Inicia una precarga de datos para probar la aplicacion */
async function start() {
    let products = []

    await fetch("/json/products.json")
        .then((response) => {
                return response.json()
        })
        .then((result) => {
            products = result
            products.forEach((product) => {
                product.stock = product.items.length
            })
        })

    saveLocal("products", JSON.stringify(products))
    products = getProducts()
    return products
}

/* Carga la tabla de productos en la seccion principal */
function showProducts(products) {
    if (!document.getElementById("table__article")) {
        const main__section = document.getElementById("main__section")

        const table__article = document.createElement("article")
        table__article.setAttribute("id", "table__article")
        table__article.setAttribute("class", "col-8 ms-2")
        main__section.appendChild(table__article)
    }

    const table__article = document.getElementById("table__article")
    table__article.innerHTML = ''

    const title = document.createElement("h4")
    title.innerText = "PRODUCTS"

    table__article.appendChild(title)

    const div__button = document.createElement("div")
    div__button.setAttribute("class", "d-flex flex-row-reverse mb-1")

    const button = document.createElement("button")
    button.setAttribute("class", "btn btn-success")
    button.setAttribute("onClick", "createProduct()")
    button.innerText = "Agregar"

    div__button.appendChild(button)

    table__article.appendChild(div__button)

    if (products.length != 0) {
        const table__products = document.createElement("table")
        table__products.setAttribute("class", "table table-striped table-hover")

        const thead = document.createElement("thead")
        const th_id = document.createElement("th")
        th_id.innerText = "ID"
        thead.appendChild(th_id)

        const th_name = document.createElement("th")
        th_name.innerText = "Nombre"
        thead.appendChild(th_name)

        const th_desc = document.createElement("th")
        th_desc.innerText = "Descripcion"
        thead.appendChild(th_desc)

        const th_cost = document.createElement("th")
        th_cost.innerText = "Costo"
        thead.appendChild(th_cost)

        const th_price = document.createElement("th")
        th_price.innerText = "Precio"
        thead.appendChild(th_price)

        const th_margin = document.createElement("th")
        th_margin.innerText = "margin"
        thead.appendChild(th_margin)

        const th_stock = document.createElement("th")
        th_stock.innerText = "stock"
        thead.appendChild(th_stock)

        const th_actions = document.createElement("th")
        th_actions.innerText = "Acciones"
        thead.appendChild(th_actions)

        table__products.appendChild(thead)
        table__article.appendChild(table__products)

        /////
        const tbody = document.createElement("tbody")
        products.forEach((element) => {
            let tr = document.createElement("tr")

            let td_id = document.createElement("td")
            td_id.innerText = element.id
            tr.appendChild(td_id)

            let td_name = document.createElement("td")
            td_name.innerText = element.name
            tr.appendChild(td_name)

            let td_description = document.createElement("td")
            td_description.innerText = element.description
            tr.appendChild(td_description)

            let td_cost = document.createElement("td")
            td_cost.innerText = element.cost
            tr.appendChild(td_cost)

            let td_price = document.createElement("td")
            td_price.innerText = element.price
            tr.appendChild(td_price)

            let td_margin = document.createElement("td")
            td_margin.innerText = element.margin
            tr.appendChild(td_margin)

            let td_stock = document.createElement("td")
            td_stock.innerText = element.stock

            if (element.stock == 0) {
                tr.setAttribute("class", "table-danger")
            } else if (element.stock < 3) {
                tr.setAttribute("class", "table-warning")
            }

            tr.appendChild(td_stock)

            if (element.items.some(element => element.sold == false)) {

                let td_button = document.createElement("td")
                let button = document.createElement("button")
                button.setAttribute("class", "btn btn-info")
                button.setAttribute("onclick", "showItems(products[" + element.id + "])")
                button.innerText = "Ver Items"
                td_button.appendChild(button)
                let button2 = document.createElement("button")
                button2.setAttribute("class", "btn btn-success")
                button2.setAttribute("onclick", "createItem(products[" + element.id + "])")
                button2.innerText = "Nuevo Item"
                td_button.appendChild(button2)
                tr.appendChild(td_button)
                tbody.appendChild(tr)
            } else {
                let td_button = document.createElement("td")
                let button = document.createElement("button")
                button.setAttribute("class", "btn btn-warning")
                button.setAttribute("disabled", true)
                button.onclick = () => {
                    showItems(products[element.id])
                }
                button.innerText = "Sin stock"
                td_button.appendChild(button)
                let button2 = document.createElement("button")
                button2.setAttribute("class", "btn btn-success")
                button2.setAttribute("onclick", "createItem(products[" + element.id + "])")
                button2.innerText = "Nuevo Item"
                td_button.appendChild(button2)
                tr.appendChild(td_button)
                tbody.appendChild(tr)
            }
        })

        table__products.appendChild(tbody)
    } else {
        table__article.innerHTML = "No posee productos"
    }

    if (carrito.length > 0) {
        showCarrito(carrito, products)
    } else if (carrito.length == 0) {
        const main__section = document.getElementById('main__section')
        if (document.getElementById("carrito__article")) {
            const carrito__article = document.getElementById("carrito__article")
            main__section.removeChild(carrito__article)
        }
    }
}

function showItems(product) {

    if (document.getElementById("carrito__article")) {
        const carrito__article = document.getElementById("carrito__article")
        main__section.removeChild(carrito__article)
    }

    const table__article = document.getElementById("table__article")
    table__article.innerHTML = ''

    const title = document.createElement("h4")
    title.innerText = "ITEMS"

    table__article.appendChild(title)

    if (product.items.length != 0) {
        const table__items = document.createElement("table")
        table__items.setAttribute("class", "table table-striped table-hover")

        const thead = document.createElement("thead")

        const th_id = document.createElement("th")
        th_id.innerText = "ID"
        thead.appendChild(th_id)

        const th_name = document.createElement("th")
        th_name.innerText = "name"
        thead.appendChild(th_name)

        const th_description = document.createElement("th")
        th_description.innerText = "Description"
        thead.appendChild(th_description)

        const th_price = document.createElement("th")
        th_price.innerText = "Price"
        thead.appendChild(th_price)

        const th_code = document.createElement("th")
        th_code.innerText = "Code"
        thead.appendChild(th_code)

        const th_actions = document.createElement("th")
        th_actions.innerText = "Actions"
        thead.appendChild(th_actions)

        table__items.appendChild(thead)

        const tbody = document.createElement("tbody")

        product.items.forEach((element) => {
            if (!element.sold) {
                const tr = document.createElement("tr")

                const td_id = document.createElement("td")
                td_id.innerText = element.id
                tr.appendChild(td_id)

                const td_name = document.createElement("td")
                td_name.innerText = product.name
                tr.appendChild(td_name)

                const td_description = document.createElement("td")
                td_description.innerText = element.detail
                tr.appendChild(td_description)

                const td_price = document.createElement("td")
                td_price.innerText = product.price
                tr.appendChild(td_price)

                const td_code = document.createElement("td")
                td_code.innerText = element.code
                tr.appendChild(td_code)

                const td_button = document.createElement("td")
                const button = document.createElement("button")
                button.setAttribute("class", "btn btn-success")
                button.setAttribute("onclick", "addToCarrito(products[" + product.id + "].items[" + element.id + "])")
                button.innerText = "Agregar al carrito"
                td_button.appendChild(button)
                tr.appendChild(td_button)

                tbody.appendChild(tr)
            }
        })
        table__items.appendChild(tbody)

        table__article.appendChild(table__items)

        const cancel_button = document.createElement("button")
        cancel_button.setAttribute("id", "cancel_button")
        cancel_button.setAttribute("class", "btn btn-danger")
        cancel_button.setAttribute("onclick","showProducts(products)")
        cancel_button.innerText = 'Cancelar'

        table__article.appendChild(cancel_button)

        main__section.appendChild(table__article)

    } else {
        table__article.innerHTML = "No posee productos cargados"
    }

    showCarrito(carrito, products)
}

/* Agrega  un iterm al carrito */
function addToCarrito(item) {
    item.sold = true
    --products[item.product_id].stock
    carrito.push(item)

    Toastify({

        text: "Se agrego el Item al carrito",

        duration: 9000,

        gravity: 'bottom',

        position: 'right',

        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
        }

    }).showToast()

    saveLocal("carrito", JSON.stringify(carrito))
    saveLocal("products", JSON.stringify(products))
    showProducts(products)
}

/* Muestra la tabla del carrito de compras */
function showCarrito(carrito, products) {

    if (carrito.length > 0) {
        if (!document.getElementById('carrito__article')) {
            const main__section = document.getElementById('main__section')
            html = "<article id='carrito__article' class='col-3'>"
            main__section.innerHTML += html
        }


        const carrito__article = document.getElementById('carrito__article')
        carrito__article.innerHTML = ''
        const title = document.createElement("h4")
        title.setAttribute("class", "mt-5")
        title.innerText = "CARRITO"
        carrito__article.appendChild(title)

        const carrito__table = document.createElement("table")
        carrito__table.setAttribute("class", "table table-striped table-hover")
        carrito__table.setAttribute("id", "carrito__table")

        const thead = document.createElement("thead")

        const th_product = document.createElement("th")
        th_product.innerText = "Producto"
        thead.appendChild(th_product)

        const th_code = document.createElement("th")
        th_code.innerText = "code"
        thead.appendChild(th_code)

        const th_price = document.createElement("th")
        th_price.innerText = "price"
        thead.appendChild(th_price)

        const th_acciones = document.createElement("th")
        th_acciones.innerText = "acciones"
        thead.appendChild(th_acciones)

        carrito__table.appendChild(thead)

        const tbody = document.createElement("tbody")
        let total = 0
        carrito.forEach((item) => {
            total = total + products[item.product_id].price

            const tr = document.createElement("tr")

            const td_product = document.createElement("td")
            td_product.innerText = products[item.product_id].name
            tr.appendChild(td_product)

            const td_code = document.createElement("td")
            td_code.innerText = item.code
            tr.appendChild(td_code)

            const td_price = document.createElement("td")
            td_price.innerText = products[item.product_id].price
            tr.appendChild(td_price)

            const td_button = document.createElement("td")
            const button = document.createElement("button")
            button.setAttribute("class", "btn btn-danger")
            button.setAttribute("onclick", "deleteFromCarrito(" + carrito.indexOf(item) + ")")
            button.innerText = "Eliminar"
            td_button.appendChild(button)
            tr.appendChild(td_button)

            tbody.appendChild(tr)
        })

        const tr_total = document.createElement("tr")
        const td_label = document.createElement("td")
        td_label.innerText = "TOTAL"
        tr_total.appendChild(td_label)

        const td_total = document.createElement("td")
        td_total.setAttribute("colspan", "3")
        td_total.innerHTML = total

        tr_total.appendChild(td_total)
        tbody.appendChild(tr_total)
        carrito__table.appendChild(tbody)

        carrito__article.appendChild(carrito__table)


    }
}

function deleteFromCarrito(item) {
    products[carrito[item].product_id].items[carrito[item].id].sold = false
    ++products[carrito[item].product_id].stock
    delete carrito[item]

    const aux = carrito.filter((e) => e.id !== item.id)
    carrito = aux

    Toastify({

        text: "Se quito el Item del carrito",

        duration: 9000,

        gravity: 'bottom',

        position: 'right',

        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
        }

    }).showToast()



    saveLocal("carrito", JSON.stringify(carrito))
    saveLocal("products", JSON.stringify(products))
    showProducts(products)
}

/*  */
/*  */
/*  */
/* APLICACION */

let carrito = []

let products = []

carrito = getCarrito()

getProducts().then((res) => {
        products = res
})

