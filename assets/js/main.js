const btnMenu = document.getElementById('menu-btn');
const menu = document.getElementById('menu');

btnMenu.addEventListener('click', () => {
    menu.classList.toggle('abierto');
});