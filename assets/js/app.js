let peliculas = [];
let peliculasFiltradas = [];
let indiceActual = 0;

document.addEventListener('DOMContentLoaded', () => {
    fetch("assets/data/peliculas.json")

        .then(response => response.json())

        .then(data => {

            peliculas = data;

            mostarPeliculas();
            // Aqui iran las futuras funciones a realizar 
        })

        .catch(error => {
            console.error("Error al cargar el JSON:", error);
        })
});