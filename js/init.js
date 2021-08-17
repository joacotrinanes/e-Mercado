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

var googleUserName = null;

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function() {
        console.log('User signed out.');
    });
};

// Initializing oAuth client on this page
function onLoad() {
    gapi.load('auth2', function() {
        gapi.auth2.init({
            client_id: "1059580869201-j9pfil75rvqab3e3s0c1ikbcpb3nlcmt.apps.googleusercontent.com"
        });
        if (auth2.isSignedIn.get()) {
            var profile = auth2.currentUser.get().getBasicProfile();
            googleUserName = profile.getGivenName();
        }
    });
};

function onSignIn(googleUser) {

    var profile = googleUser.getBasicProfile();

    /*console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.*/
    //sessionStorage.setItem('googleName', JSON.stringify(profile.getName()));
    googleUserName = profile.getName();

};




// Saludar invitado

var saludarInvitado = function() {

    if (nombreNoRecordado == null && nombreRecordado == null && googleUserName == null) {
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


    document.body.addEventListener('load', onLoad());


    document.body.addEventListener('load', onSignIn());

    // document.body.addEventListener('load', saludarInvitado());


});