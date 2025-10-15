const form = document.getElementById('form-login');
const emailInput = document.getElementById('email');
const passInput = document.getElementById('password');
const errorMsg = document.getElementById('error-msg');

function validarEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

form.addEventListener('submit', function (e) {
    e.preventDefault();

    const email = emailInput.value.trim();
    const password = passInput.value.trim();

    if (!email) {
        mostrarError('Por favor ingresa tu correo electrónico.');
        return;
    }
    if (!validarEmail(email)) {
        mostrarError('Ingresa un correo válido (ej: usuario@correo.com).');
        return;
    }
    if (!password) {
        mostrarError('Por favor ingresa tu clave.');
        return;
    }
    if (password.length < 4) {
        mostrarError('La clave debe tener al menos 4 caracteres.');
        return;
    }

    ocultarError();
    window.location.href = 'dashboard.html';
});

function mostrarError(text) {
    errorMsg.textContent = text;
    errorMsg.style.display = 'block';
    errorMsg.setAttribute('aria-hidden', 'false');
    errorMsg.focus && errorMsg.focus();
}

function ocultarError() {
    errorMsg.textContent = '';
    errorMsg.style.display = 'none';
    errorMsg.setAttribute('aria-hidden', 'true');
}
