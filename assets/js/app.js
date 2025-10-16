const contenedor = document.querySelector('.movies-scroll');
const btnFiltro = document.querySelectorAll('.category-btn');

let peliculas = [];
let peliculasFiltradas = [];
let indiceActual = 0;

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

    lista.forEach(pelicula => {

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
