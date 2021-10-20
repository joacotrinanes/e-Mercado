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
            document.getElementById('imgPerfil')
                .setAttribute('src', e.target.result)
                .width(150)
                .height(200);
        };
        reader.readAsDataURL(input.files[0]);
    }
}

/*While image has not been set*/

const setDefaultImage = () => {
    let image = document.getElementById('imgPerfil');
    if (image.getAttribute('src') === '') {
        image.setAttribute('src', 'https://lh3.googleusercontent.com/proxy/_ANnvQRzBG0Nf5F6xPyeoEDxWW7Otnz2h1Ahr7HCmYyP3TJ0juDEIDd177j_fBXwbHSUlC_f14GeHYEMB9_5eej9uPGSMasEiF5PxDPFUcJJrVP4')
    }
}

/*Transformations to save image in LocalStorage */
const getBase64Image = (img) => {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

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