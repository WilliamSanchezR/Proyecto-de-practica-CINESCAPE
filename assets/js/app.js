const contenedor = document.querySelector('.movies-scroll');

let peliculas = [];
let peliculasFiltradas = [];
let indiceActual = 0;

document.addEventListener('DOMContentLoaded', () => {
    fetch("/assets/data/peliculas.json")

        .then(response => response.json())

        .then(data => {

            peliculas = data;

            mostrarPeliculas(); 
        })
    

        .catch(error => {
            console.error("Error al cargar el JSON:", error);
        })
});

function mostrarPeliculas(){
    contenedor.innerHTML = "";

    peliculas.forEach(pelicula =>{
        const item =document.createElement('article');
        item.classList.add('movie-card');

        item.innerHTML = `
            <img src="assets/${pelicula.ruta_caratula}" alt="${pelicula.nombre}" class="movie-poster">
            <div class="movie-meta">
                <h2 class="movie-title">${pelicula.nombre}</h2>
                <span class="movie-year">${pelicula.anio}</span>
            </div>
        `;

        item.addEventListener('click', () => mostrarDetalle(pelicula));
        contenedor.appendChild(item);

    })
}
function mostrarDetalle(pelicula) {
    const detalle = document.createElement('section');
    detalle.classList.add('detalle-pelicula');

    detalle.innerHTML = `
        <div class="detalle-content">
            <button class="cerrar-detalle">✖</button>
            <img src="assets/${pelicula.ruta_caratula}" alt="${pelicula.nombre}" class="detalle-poster">
            <div class="detalle-info">
                <h2>${pelicula.nombre}</h2>
                <p><strong>Año:</strong> ${pelicula.anio}</p>
                <p><strong>Género:</strong> ${pelicula.genero}</p>
                <p><strong>Descripción:</strong> ${pelicula.descripcion}</p>
            </div>
        </div>
    `;

    document.body.appendChild(detalle);

    detalle.querySelector('.cerrar-detalle').addEventListener('click', () =>{
        detalle.remove();
    });

}

fetch("/assets/data/peliculas.json")

.then (response => response.json())

.then(data =>{
    console.log("los datos se obtuvieron de manera correcta")

    data.forEach(pelicula => {

    const item = document.createElement('article');

    item.setAttribute('id','movieId');
    item.setAttribute('class','movie-card');

        item.innerHTML = `
            <img src="assets/${pelicula.ruta_caratula}" alt="${pelicula.nombre}" class="movie-poster">
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
