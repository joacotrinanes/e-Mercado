let datosUsuario = {};


/* Input variables*/
let nameProfile = document.getElementById('nombrePerfil');
let lastNames = document.getElementById('apellidosPerfil');
let age = document.getElementById('edad');
let email = document.getElementById('emailPerfil');
let telephone = document.getElementById('telefono');

/*LocalStorage variables*/
let savedName = JSON.parse(localStorage.getItem('name'));
let savedLastNames = JSON.parse(localStorage.getItem('lastNames'));
let savedAge = parseInt(JSON.parse(localStorage.getItem('age')));
let savedEmail = JSON.parse(localStorage.getItem('email'));
let savedTelephone = JSON.parse(localStorage.getItem('telephone'));

const verificar = () => {
    if (savedName !== null) {
        nameProfile.value = savedName;
        lastNames.value = savedLastNames;
        age.value = savedAge;
        email.value = savedEmail;
        telephone.value = savedTelephone;
    }
}


const guardarCambios = () => {
    if (nameProfile.value.trim() === '' || lastNames.value.trim() === '' || age.value.trim() === '' || email.value.trim() === '' ||
        telephone.value.trim() === '') {
        return swal({
            title: "Completar todos los datos",
            text: "Completar todos los campos de su perfil",
            icon: 'error',
            button: 'Ok'
        });
    } else if (parseInt(age.value) < 18) {
        return swal({
            title: "Tiene que ser mayor de edad para registrarse",
            icon: 'error',
            button: 'Ok'
        });
    } else {
        datosUsuario.name = nameProfile.value;
        datosUsuario.lastNames = lastNames.value;
        datosUsuario.age = age.value;
        datosUsuario.email = email.value;
        datosUsuario.telephone = telephone.value;

        localStorage.setItem('name', JSON.stringify(datosUsuario.name));
        localStorage.setItem('lastNames', JSON.stringify(datosUsuario.lastNames));
        localStorage.setItem('age', JSON.stringify(datosUsuario.age));
        localStorage.setItem('email', JSON.stringify(datosUsuario.email));
        localStorage.setItem('telephone', JSON.stringify(datosUsuario.telephone));

        return swal({
            title: "Cambios guardados",
            icon: 'success',
            button: 'Ok'
        }).then(() => {
            window.location.href = 'index.html';
        });

    }
}




//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e) {

    verificar();

    document.getElementById('saveChanges').addEventListener('click', () => {
        guardarCambios();
    })
});