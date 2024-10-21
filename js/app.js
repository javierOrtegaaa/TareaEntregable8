// Variables
let carrito = [];
const carritoDOM = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');

// Listeners
cargarEventListeners();

function cargarEventListeners() {
    // Agregar curso al carrito
    listaCursos.addEventListener('click', agregarCurso);

    // Eliminar curso del carrito
    carritoDOM.addEventListener('click', borrarCurso);

    // Vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
}

// Funciones
function agregarCurso(e) {
    e.preventDefault();
    
    if (e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}

// Leer datos del curso seleccionado
function leerDatosCurso(curso) {
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        nombre: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.u-pull-right').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    };

    // Verificar si el curso ya está en el carrito
    const existe = carrito.some(curso => curso.id === infoCurso.id);
    if (existe) {
        // Actualizar la cantidad
        const cursos = carrito.map(curso => {
            if (curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso;
            } else {
                return curso;
            }
        });
        carrito = [...cursos];
    } else {
        // Agregar el curso al carrito
        carrito = [...carrito, infoCurso];
    }

    // Mostrar el carrito en el HTML
    carritoHTML();
}

// Mostrar carrito en el HTML
function carritoHTML() {
    // Limpiar el HTML previo
    limpiarCarrito();

    // Recorrer el carrito y generar el HTML
    carrito.forEach(curso => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${curso.imagen}" width="100"></td>
            <td>${curso.nombre}</td>
            <td>${curso.precio}</td>
            <td>${curso.cantidad}</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
            </td>
        `;

        // Agregar el HTML del carrito en el tbody
        carritoDOM.appendChild(row);
    });
}

// Eliminar curso del carrito
function borrarCurso(e) {
    e.preventDefault();

    if (e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id');

        // Eliminar del array de carrito por el data-id
        carrito = carrito.filter(curso => curso.id !== cursoId);

        // Volver a pintar el carrito
        carritoHTML();
    }
}

// Vaciar el carrito
function vaciarCarrito() {
    carrito = []; // Resetear el array del carrito

    // Limpiar el HTML
    limpiarCarrito();
}

// Limpiar el tbody
function limpiarCarrito() {
    while (carritoDOM.firstChild) {
        carritoDOM.removeChild(carritoDOM.firstChild);
    }
}
