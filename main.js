const listaDeProductos = document.getElementById('listaDeProductos');
const listaDelCarrito = document.getElementById('listaDelCarrito');
const totalSpan = document.getElementById('total');
const botonVaciarCarrito = document.getElementById('botonVaciarCarrito');

botonVaciarCarrito.addEventListener('click', vaciarCarrito);

function agregarAlCarrito(event) {
    const boton = event.target;
    const producto = productos.find(p => p.id === parseInt(boton.dataset.id));
    
    const itemDelCarrito = {
        id: producto.id,
        nombre: producto.nombre,
        precio: producto.precio,
        imagen: producto.imagen,
        cantidad: 1
    };

    agregarElementoDelCarritoAlDOM(itemDelCarrito);
    guardarElementoDelCarrito(itemDelCarrito);
    actualizarTotal();
}

function manejarAccionDelCarrito(event) {
    if (event.target.classList.contains('botonEliminar')) {
        const itemDelCarritoId = event.target.parentElement.dataset.id;
        eliminarElementoDelCarrito(itemDelCarritoId);
        event.target.parentElement.remove();
        actualizarTotal();
    }
}

function agregarElementoDelCarritoAlDOM(itemDelCarrito) {
    const li = document.createElement('li');
    li.dataset.id = itemDelCarrito.id;
    li.innerHTML = `
        ${itemDelCarrito.nombre} - €${itemDelCarrito.precio.toFixed(2)}
        <button class="botonEliminar">Eliminar</button>
    `;
    listaDelCarrito.appendChild(li);
    li.querySelector('.botonEliminar').addEventListener('click', manejarAccionDelCarrito);
}

function guardarElementoDelCarrito(itemDelCarrito) {
    let carrito = obtenerCarritoDelStorage();
    carrito.push(itemDelCarrito);
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function obtenerCarritoDelStorage() {
    return localStorage.getItem('carrito') ? JSON.parse(localStorage.getItem('carrito')) : [];
}

function eliminarElementoDelCarrito(itemDelCarritoId) {
    let carrito = obtenerCarritoDelStorage();
    carrito = carrito.filter(item => item.id !== parseInt(itemDelCarritoId));
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function actualizarTotal() {
    const carrito = obtenerCarritoDelStorage();
    const total = carrito.reduce((acc, item) => acc + item.precio, 0);
    totalSpan.textContent = total.toFixed(2);
}

function vaciarCarrito() {
    localStorage.removeItem('carrito');
    listaDelCarrito.innerHTML = '';
    actualizarTotal();
}

document.addEventListener('DOMContentLoaded', () => {
    productos.forEach(producto => {
        const div = document.createElement('div');
        div.classList.add('tarjeta-producto');
        div.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p>Precio: €${producto.precio}</p>
            <button class="botonAgregarAlCarrito" data-id="${producto.id}">Agregar al Carrito</button>
        `;
        listaDeProductos.appendChild(div);
    });

    document.querySelectorAll('.botonAgregarAlCarrito').forEach(boton => {
        boton.addEventListener('click', agregarAlCarrito);
    });

    const carrito = obtenerCarritoDelStorage();
    carrito.forEach(agregarElementoDelCarritoAlDOM);
    actualizarTotal();
});







