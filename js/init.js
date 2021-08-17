const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/987.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";


var showSpinner = function() {
    document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function() {
    document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function(url) {
    var result = {};
    showSpinner();
    return fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw Error(response.statusText);
            }
        })
        .then(function(response) {
            result.status = 'ok';
            result.data = response;
            hideSpinner();
            return result;
        })
        .catch(function(error) {
            result.status = 'error';
            result.data = error;
            hideSpinner();
            return result;
        });
};


//Funcionalidades usuario

var cerrarSesion = document.getElementById('cerrarSesion');
var invitado = document.getElementById('invitado');
var nombreNoRecordado = JSON.parse(sessionStorage.getItem('usuario'));
var nombreRecordado = JSON.parse(localStorage.getItem('usuario'));
//var usuarioGoogle = JSON.parse(sessionStorage.getItem('googleName'));



var desconectar = function() {
    localStorage.clear();
    sessionStorage.clear();
};

//Google Access

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function() {
        //usuarioGoogle = null;
    });
};

//probando
function onLoad() {
    gapi.load('auth2', function() {
        gapi.auth2.init();
    });
};


// Saludar invitado

var saludarInvitado = function() {

    if (nombreNoRecordado == null && nombreRecordado == null) {
        window.location.href = 'login.html';

    } else if (nombreRecordado !== '' && nombreNoRecordado == null) {
        invitado.innerHTML = 'Hola ' + nombreRecordado + '!';

    } else if (nombreNoRecordado !== '' && nombreRecordado == null) {
        invitado.innerHTML = 'Hola ' + nombreNoRecordado + '!';

    }
};



//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e) {

    document.body.addEventListener('load', saludarInvitado());



});