//Primera entrega de Proyecto Final: Objetos, Arrays, Metodo de busqueda y filtrado
let costoTotal = 0;


// Clase constructora para productos:
class Producto {
	constructor(id, nombre, precio, cantidad) {
		this.id = id;
		this.nombre = nombre;
		this.precio = precio;
		this.cantidad = cantidad;
	}
}

// Productos disponibles:
const eucalipto = new Producto(1, `Miel de Eucalipto`, 100, 0);
const algarrobo = new Producto(2, `Miel de Algarrobo`, 150, 0);
const citrus = new Producto(3, `Miel de Citrus`, 200, 0);
const girasol = new Producto(4, `Miel de Girasol`, 250, 0);

// Agregar productos al Array de Productos DISPONIBLES
const arrayProductos = [];
arrayProductos.push(eucalipto);
arrayProductos.push(algarrobo);
arrayProductos.push(citrus);
arrayProductos.push(girasol);

// Array de productos del carro
const arrayCarro = [];

// Funcion para calcular el costo total al usuario:
function costoTotalFuncion() {
	costoTotal = arrayCarro.reduce(
		(acumulador, elemento) => acumulador + elemento.precio * elemento.cantidad,
		0
	);
}

// Funcion para calcular el monto de las cuotas
function calcularCuotas() {
	let cantidadCuotas = Number(prompt(`¿En cuantas cuotas desea realizar la compra de $${costoTotal}? (3, 6 o 12 cuotas)`));
	if (!(cantidadCuotas == 3 || cantidadCuotas == 6 || cantidadCuotas == 12)) {
		alert(`Ingrese una cantidad de cuotas valida.`);
		calcularCuotas2();
	} else {
		let costoCuota = costoTotal / cantidadCuotas;
		let total = document.getElementById(`total`);

		total.innerHTML = `<p>Total: $${costoTotal}</p>
						<p>Tu compra sera en ${cantidadCuotas} cuotas de $${costoCuota.toFixed(2)}</p>`;
	}
}

// DOM
// Mostrar grilla de productos en el HTML:
function mostrarProductos() {
	let gridProductos = document.getElementById(`grid-productos`);
	// Tomo como padre ese div, ahora genero a partir del arrayProductos una grid completa de productos.
	for (const producto of arrayProductos) {
		let containerCard = document.createElement(`div`);
		containerCard.className = `col`;
		containerCard.innerHTML = `<div class="card align-items-center">
									<h4 class="card-title">${producto.nombre}</h4>
									<img class="card-img-top" src="img/${producto.id}.webp" alt="Imagen de ${producto.nombre}">
									<h6>$${producto.precio}</h6>
									<a id="${producto.id}" class="btn btn-primary btnAgregarCarro">Agregar al carro</a>
									<div>`;
		gridProductos.appendChild(containerCard);
	}
	// Agrego el event listener a cada boton (que tienen id unico), para pushear el producto comprado al arrayCarro

	const cardBtn = document.querySelectorAll(".btnAgregarCarro");
	cardBtn.forEach((boton) => boton.addEventListener("click", agregarCarro));
	cardBtn.forEach((boton) => boton.addEventListener("click", mostrarCarro));
}

// Funcion para agregar al array del carro los productos elegidos por el usuario
function agregarCarro() {
	let identificador = Number(event.target.id);
	if (!(arrayCarro.some((element) => element.id == identificador))){
		arrayCarro.push(arrayProductos.find((element) => element.id == identificador));
		arrayCarro.find((element) => element.id == identificador).cantidad = 1;
	} else {
		arrayCarro.find((element)=> element.id == identificador).cantidad += 1;
	}

	costoTotalFuncion();
}

// Funcion para mostrar en HTML el carro de compras 
function mostrarCarro() {
	let containerList = document.getElementById(`lista-carro`);
	containerList.innerHTML = ``;
	for (const producto of arrayCarro) {
		let itemCarro = document.createElement(`div`);

		itemCarro.className = `d-flex flex-row justify-content-between`;
		itemCarro.innerHTML = `<p>${producto.nombre}</p><p>$${producto.precio} c/u</p><p>Cantidad: ${producto.cantidad}</p><br>`;

		containerList.appendChild(itemCarro);
	}
	let total = document.createElement(`div`);
	total.setAttribute("id", `total`);
	total.className = `d-flex flex-column`
	total.innerHTML = `<p>Total: $${costoTotal}</p>
						<a id="comprarBtn" class="btn btn-success">Comprar ahora!</a>`;
	
	containerList.appendChild(total);

	
	const comprarBtn = document.querySelector("#comprarBtn");
	comprarBtn.addEventListener('click', calcularCuotas);
}

window.onload = mostrarProductos();