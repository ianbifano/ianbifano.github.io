class Venta {
    id;
    cliente;
    fecha;
    medioPago;
    items;

    constructor (id, cliente, fecha, medioPago, items, total) {
        this.id = id
        this.cliente = cliente
        this.fecha = fecha
        this.medioPago = medioPago
        this.items = items
        this.total = total
    }
}