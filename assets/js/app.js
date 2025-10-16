const contenedor = document.querySelector('.movies-scroll');

let peliculas = [];
let peliculasFiltradas = [];
let indiceActual = 0;

document.addEventListener('DOMContentLoaded', () => {
    fetch("/assets/data/peliculas.json")

        .then(response => response.json())

        .then(data => {

            peliculas = data;

            // mostrarPeliculas();
            // Aqui iran las futuras funciones a realizar 
        })
    

        .catch(error => {
            console.error("Error al cargar el JSON:", error);
        })
});


fetch("/assets/data/peliculas.json")

.then (response => response.json())

.then(data =>{
    console.log("los datos se obtuvieron de manera correcta")

    data.forEach(pelicula => {

    const item = document.createElement('article');

    item.setAttribute('id','movieId');
    item.setAttribute('class','movie-card');

        item.innerHTML = `
            <img src="assets/${pelicula.ruta_caratula}" alt="${pelicula.nombre}" class="movie-poster" value="${pelicula.id}">
                <div class="movie-meta">
                    <h2 class="movie-title">${pelicula.nombre}</h2>
                    <span class="movie-year">${pelicula.anio}</span>
                </div>
        `

        contenedor.appendChild(item);
        });
})

.catch(error => {
    console.error("Hubo un error en la obtencion de los datos: ",error);
});
