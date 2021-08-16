/* Variables */
var usuario = document.getElementById('userNameInput');
var contraseña = document.getElementById('passwordInput');
var errorUsuario = document.getElementById('errorUsuario');
var errorContraseña = document.getElementById('errorContraseña');
var recordar = false;
var datos = {};

// Google Access
var googleName = null;

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    /*console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.*/
    googleName = profile.getName();
    window.location.href = 'index.html';
};



/* Control de usuario y contraseña*/

function verificar() {

    if (usuario.value.trim() === '' && contraseña.value.trim() === '') {
        errorUsuario.innerHTML = 'Por favor ingrese un usuario';
        errorContraseña.innerHTML = 'Por favor ingrese una contraseña';

    } else if (contraseña.value.trim() === '') {
        errorContraseña.innerHTML = 'Por favor ingrese una contraseña';

    } else if (usuario.value.trim() === '') {
        errorUsuario.innerHTML = 'Por favor ingrese un usuario';



    } else {
        // location.href, remember me or not
        if (recordar === true) {
            datos.usuario = usuario.value;
            datos.contraseña = contraseña.value;
            datos.estado = 'conectado';

            localStorage.setItem('usuario', JSON.stringify(datos.usuario));
            localStorage.setItem('contraseña', JSON.stringify(datos.contraseña));
            localStorage.setItem('estado', JSON.stringify(datos.estado));
            window.location.href = 'index.html';

        } else {
            datos.usuario = usuario.value;
            datos.contraseña = contraseña.value;
            datos.estado = 'conectado';

            sessionStorage.setItem('usuario', JSON.stringify(datos.usuario));
            sessionStorage.setItem('contraseña', JSON.stringify(contraseña.value));
            sessionStorage.setItem('estado', JSON.stringify(datos.estado));
            window.location.href = 'index.html';
        }
    }

};

/* Remember me or not */

function recordarUsuario() {

    if (usuario.value.trim() !== '' && contraseña.value.trim() !== '') {
        recordar = true;
    }

};


// Si continua conectado

var conectado = function() {
    let estado = JSON.parse(localStorage.getItem('estado'));
    if (estado === 'conectado') {
        window.location.href = 'index.html';
    }

};



//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e) {

    document.getElementById('ingresar').addEventListener('click', function() {
        verificar();
    });


    document.getElementById('recordarme').addEventListener('click', function() {
        recordarUsuario();
    });


    conectado();




});