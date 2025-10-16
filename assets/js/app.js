const contenedor = document.querySelector('.movies-scroll');
const contTelefono = document.getElementById('infoTelefono');
const btnFiltro = document.querySelectorAll('.category-btn');
const modalImg = document.getElementById('modalPoster');
const modalTitulo = document.getElementById('modalTitle');
const modalGeneroAño = document.getElementById('modalCatYear');
const modalDescripcion = document.getElementById('modalDescription');
const modalReparto = document.getElementById('modalCast');
const contModal = document.getElementById('movieModal');
const closeModal = document.getElementById('closeModal');

const searchInput = document.querySelector('.search-input');
const searchBtn = document.getElementById('search-btn');

let peliculas = [];
let peliculasFiltradas = [];
let indiceActual = 0;
let categoriaActual = "todos";

document.addEventListener('DOMContentLoaded', () => {
    fetch("assets/data/peliculas.json")

        .then(response => response.json())

        .then(data => {

            peliculas = data;

            mostrarPeliculas(peliculas);
        })


        .catch(error => {
            console.error("Error al cargar el JSON:", error);
        })
});

function mostrarPeliculas(lista) {
    contenedor.innerHTML = "";

    lista.forEach((pelicula, index) => {

        const item = document.createElement('article');

        item.setAttribute('id', 'movieId');
        item.setAttribute('class', 'movie-card');

        item.innerHTML = `
            <img src="assets/${pelicula.ruta_caratula}" alt="${pelicula.nombre}" class="movie-poster" value="${pelicula.id}">
                <div class="movie-meta">
                    <h2 class="movie-title">${pelicula.nombre}</h2>
                    <span class="movie-year">${pelicula.anio}</span>
                </div>
        `
        item.addEventListener('click', () => {
            indiceActual = index;
            mostrarDetalle(lista[indiceActual])
        })

        contenedor.appendChild(item);
    });

};

btnFiltro.forEach(btn => {
    btn.addEventListener('click', () => {
        const categoriaSelec = btn.getAttribute('data-category');

        if (categoriaSelec === "todos") {
            mostrarPeliculas(peliculas);
        } else {
            const filtradas = peliculas.filter(p => p.categoria.toLowerCase() === categoriaSelec.toLowerCase());
            mostrarPeliculas(filtradas);
        }
    });
});

function mostrarDetalle(pelicula) {
    modalImg.src = `assets/${pelicula.ruta_caratula}`;
    modalImg.alt = `Póster de ${pelicula.nombre}`;
    modalTitulo.textContent = pelicula.nombre;
    modalGeneroAño.textContent = `${pelicula.categoria} · ${pelicula.anio}`;
    modalDescripcion.textContent = pelicula.sinopsis;
    modalReparto.textContent = pelicula.reparto;

    contModal.classList.toggle('show');
}

closeModal.addEventListener('click', () => {
    contModal.classList.remove('show');
})
// Al hacer clic en el botón
searchBtn.addEventListener('click', () => {
    filtrarPeliculas(searchInput.value.trim());
});

// Al presionar Enter en el input
searchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        filtrarPeliculas(searchInput.value.trim());
      }
});

function filtrarPeliculas(termino) {
    if (!termino) {
        mostrarPeliculas(peliculas); // Si está vacío, muestra todo
        return;
    }

    const resultado = peliculas.filter(pelicula =>
        pelicula.nombre.toLowerCase().includes(termino.toLowerCase())
    );

    mostrarPeliculas(resultado);
}