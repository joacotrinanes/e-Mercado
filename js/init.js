const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/987.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";
const CART_INFO_2_URL = "https://japdevdep.github.io/ecommerce-api/cart/654.json";
const CART_CURRENCY_RATES_URL = "http://data.fixer.io/api/latest?access_key=b99ae1914356422168da930b3162a0f3";
const COUNTRIES_LIST_URL = "https://api.dhsprogram.com/rest/dhs/countries";

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
var datosNoRecordados = JSON.parse(sessionStorage.getItem('datosUsuario'));
var datosRecordados = JSON.parse(localStorage.getItem('datosUsuario'));



//Data Input in login
var userData = {};

const getInputDataInLogin = () => {
    if (datosNoRecordados !== null) {
        userData = datosNoRecordados;
    } else {
        userData = datosRecordados;
    }
}


var desconectar = function() {
    localStorage.clear();
    sessionStorage.clear();
    signOut();


};

//Google Access



function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.disconnect().then(function() {
        console.log('User signed out.');
    });
};

// Initializing oAuth client on this page
function onLoad() {
    gapi.load('auth2', function() {
        gapi.auth2.init();
    });

};



// Saludar invitado

var saludarInvitado = function() {

    if (userData == undefined) {
        window.location.href = 'login.html';

    } else {
        invitado.innerHTML = ' <i class="fa fa-user" aria-hidden="true"></i> Hola ' + userData.usuario + '!';

    }
};





//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e) {

    getInputDataInLogin();
    saludarInvitado();



});