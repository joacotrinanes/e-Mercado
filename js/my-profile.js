let datosUsuario = {};


/* Input variables*/
let nameProfile = document.getElementById('nombrePerfil');
let lastNames = document.getElementById('apellidosPerfil');
let age = document.getElementById('edad');
let email = document.getElementById('emailPerfil');
let telephone = document.getElementById('telefono');
let image = document.getElementById('imgPerfil');
//let imgInBase64 = getBase64Image(image);

/*LocalStorage variables*/
let savedName = JSON.parse(localStorage.getItem('name'));
let savedLastNames = JSON.parse(localStorage.getItem('lastNames'));
let savedAge = parseInt(JSON.parse(localStorage.getItem('age')));
let savedEmail = JSON.parse(localStorage.getItem('email'));
let savedTelephone = JSON.parse(localStorage.getItem('telephone'));
let savedImage = localStorage.getItem('image');

const verificar = () => {
    if (savedName !== null) {
        nameProfile.value = savedName;
        lastNames.value = savedLastNames;
        age.value = savedAge;
        email.value = savedEmail;
        telephone.value = savedTelephone;
        image.src = "data:image/png;base64," + savedImage;

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
        datosUsuario.image = getBase64Image(image);

        localStorage.setItem('name', JSON.stringify(datosUsuario.name));
        localStorage.setItem('lastNames', JSON.stringify(datosUsuario.lastNames));
        localStorage.setItem('age', JSON.stringify(datosUsuario.age));
        localStorage.setItem('email', JSON.stringify(datosUsuario.email));
        localStorage.setItem('telephone', JSON.stringify(datosUsuario.telephone));
        localStorage.setItem('image', getBase64Image(image));

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
function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('imgPerfil').setAttribute('src', e.target.result);
        };
        reader.readAsDataURL(input.files[0]);
    }
}

/*While image has not been set*/

const setDefaultImage = () => {
    let image = document.getElementById('imgPerfil');
    if (image.getAttribute('src') === '') {
        image.setAttribute('src', 'https://cdn-icons-png.flaticon.com/512/149/149071.png')
    }
}

/*Transformations to save image in LocalStorage */
const getBase64Image = (img) => {

    var canvas = document.createElement("canvas");



    if (img.width > 200) {
        canvas.width = img.width * 2.5;
        canvas.height = img.height * 2.5;

    } else {
        canvas.width = img.width * 1.5;
        canvas.height = img.height * 1.5;
    }



    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL("image/png");

    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}




//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e) {
    setDefaultImage();
    verificar();

    document.getElementById('saveChanges').addEventListener('click', () => {
        guardarCambios();
    })
});