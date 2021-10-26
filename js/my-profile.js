/* Input variables*/
let nameProfile = document.getElementById('nombrePerfil');
let lastNames = document.getElementById('apellidosPerfil');
let age = document.getElementById('edad');
let email = document.getElementById('emailPerfil');
let telephone = document.getElementById('telefono');
let image = document.getElementById('imgPerfil');
let file = document.getElementById('establecerImagenPerfil');


//Get username and password provided in login
let datosUsuario = {};
let recordar = JSON.parse(localStorage.getItem('recordar'));
let datosContactoUsuarioGuardados = JSON.parse(localStorage.getItem('datosContactoUsuario'));


const getUserLoginInfo = () => {
    if (recordar == true) {
        datosUsuario.usuario = JSON.parse(localStorage.getItem('datosUsuario'));
        if (datosContactoUsuarioGuardados != undefined) {
            datosUsuario.datosContacto = datosContactoUsuarioGuardados;

        }
    } else {
        datosUsuario.usuario = JSON.parse(sessionStorage.getItem('datosUsuario'));
        if (datosContactoUsuarioGuardados != undefined) {
            datosUsuario.datosContacto = datosContactoUsuarioGuardados;

        }
    }
}

const verificar = () => {
    if (datosContactoUsuarioGuardados == undefined) {

        nameProfile.value = '';
        lastNames.value = '';
        age.value = '';
        email.value = '';
        telephone.value = '';
        image.setAttribute('src', 'https://cdn-icons-png.flaticon.com/512/149/149071.png');

    } else {

        nameProfile.value = datosUsuario.datosContacto.name;
        lastNames.value = datosUsuario.datosContacto.lastNames;
        age.value = datosUsuario.datosContacto.age;
        email.value = datosUsuario.datosContacto.email;
        telephone.value = datosUsuario.datosContacto.telephone;
        image.src = datosUsuario.datosContacto.image;


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

        datosUsuario.datosContacto = {
            "name": nameProfile.value,
            'lastNames': lastNames.value,
            'age': age.value,
            'email': email.value,
            'telephone': telephone.value,
            'image': image.src
        }


        localStorage.setItem('datosContactoUsuario', JSON.stringify(datosUsuario.datosContacto));
        localStorage.setItem('userCompleteInformation', JSON.stringify(datosUsuario));

        return swal({
            title: "Cambios guardados",
            icon: 'success',
            button: 'Ok'
        }).then(() => {
            window.location.href = 'index.html';
        });

    }
}

/*Read image as URL*/
const previewFile = () => {
    let reader = new FileReader();

    reader.onloadend = function() {
        image.src = reader.result;
    }

    if (file.files[0]) {
        reader.readAsDataURL(file.files[0]);
    } else {
        image.src = 'https://cdn-icons-png.flaticon.com/512/149/149071.png';
    }


}



//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e) {

    getUserLoginInfo();
    verificar();

    document.getElementById('saveChanges').addEventListener('click', () => {
        guardarCambios();
    })
});