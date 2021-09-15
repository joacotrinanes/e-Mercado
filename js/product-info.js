var productInfoObj = {};
var imagesArray = [];
var productName = undefined;
var productCost = undefined;
var productCurrency = undefined;
var soldCount = undefined;
var description = undefined;
var category = undefined;
var relatedProducts = [];
var autosArray = [];
var commentsArray = [];
var currentSortCommentsCriteria = 'Fecha';



function showProductInfo() {
    let htmlContentToAppend = `<div id="carouselImages" class="carousel slide bd-placeholder-img card-img-top" data-ride="carousel">
    <div class="carousel-inner" style="margin: auto;">`

    for (let i = 0; i < imagesArray.length; i++) {
        if (i === 0) {
            htmlContentToAppend += `
             <div class="carousel-item active">
             <img class="d-block w-100" src="${imagesArray[i]}" alt="First slide">
             </div>`
        } else {
            htmlContentToAppend += ` <div class="carousel-item">
             <img class="d-block w-100" src="${imagesArray[i]}" alt="Second slide">
           </div>`
        }
    }

    htmlContentToAppend += `
    </div>
    <a class="carousel-control-prev" href="#carouselImages" role="button" data-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="sr-only">Previous</span>
    </a>
    <a class="carousel-control-next" href="#carouselImages" role="button" data-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="sr-only">Next</span>
    </a>
    </div>
    <div class="card-body">
    <div class="row">
      <div class="col col-8"><h2 style="font-family: 'Roboto Mono', monospace; font-weight: bolder;"> ${productCurrency} ${productCost}</h2></div>
      <div class="col col-4"><h4 style="font-family: 'Lobster', cursive;">${soldCount} artículos vendidos</h4></div>
    </div>
    <div class="row" style="padding: 45px;">
       <p style="font-family: 'Dosis', sans-serif; color: black; font-weight: bold;">${description}</p> 
    </div>
    <div class="row">
    <div class="col col-6"><small style="font-weight: bold;">Categoría: ${category}</small>
    </div>
    </div>`

    document.getElementById('info').innerHTML = htmlContentToAppend;
}

function showProductName() {
    let htmlContentToAppend = `
    <img src="img/Chevrolet-Logo.png" height="80" width="200">
    <h1 style="font-family: 'IBM Plex Sans Arabic', sans-serif;"> ${productName}</h1>`
    document.getElementById('OnixNombre').innerHTML = htmlContentToAppend;
}

function showRelatedProducts() {
    let htmlContentToAppend = "";
    for (auto of relatedProducts) {
        htmlContentToAppend += `
        <a href="products.html" class="linkRelatedProducts">
    <div class="card" style="width: 18rem; margin: 5px">
    <img class="bd-placeholder-img card-img-top" src="${auto.imgSrc}">
    <div class="card-body">
    <h5 style="font-weight: bold;">${auto.name}</h5>
    </div> 
    </div>
    </a>`
    }
    document.getElementById('relatedProducts').innerHTML = htmlContentToAppend;
}

function relatedProductsQuery() {
    for (let i = 0; i < autosArray.length; i++) {
        let auto = autosArray[i];
        for (let j = 0; j < relatedProducts.length; j++) {
            if (relatedProducts[j] == i) {
                relatedProducts[j] = auto;
            }
        }


    }
}

//Comments

function sortCommentsArrayByDate() {
    commentsArray.sort((a, b) => {
        return new Date(b.dateTime) - new Date(a.dateTime);
    })
    currentSortCommentsCriteria = 'Fecha';
}

function sortCommentsArrayByRating() {
    commentsArray.sort((a, b) => {
        return b.score - a.score;
    })
    currentSortCommentsCriteria = 'Rating';
}

function sortCommentsArrayByRatingAsc() {
    commentsArray.sort((a, b) => {
        return a.score - b.score;
    })
    currentSortCommentsCriteria = 'RatingAsc';

}


function showComments() {
    let htmlContentToAppend = "";
    for (comment of commentsArray) {
        let score = comment.score;
        let estrellas = "";
        for (let i = 1; i <= 5; i++) {
            if (i <= score) {
                estrellas += `<i class="fas fa-star"></i>`;
            } else {
                estrellas += `<i class="far fa-star"></i>`;
            }
        }
        let fechaSinHora = comment.dateTime.split(' ')[0].split('-')[2] + '/' + comment.dateTime.split(' ')[0].split('-')[1] + '/' + comment.dateTime.split(' ')[0].split('-')[0];
        let horaSinFecha = comment.dateTime.split(' ')[1];
        htmlContentToAppend += `
      <div class="list-group-item list-group-item-action">
      <div class="row">
      <div class="col-6">
      <span class="starRating">${estrellas} </span><br>
      <span class="userComment">${comment.user}</span>      
      </div>
      <div class="col-2">
      </div>
      <div class="col-4" style="padding-right: 10px; text-align:right;">
      <small style="font-weight: bold;">${fechaSinHora}</small><br>
      <small>${horaSinFecha}</small>
      </div>
      </div><br>
      <div class="row">
      <p style="margin: 10px;">${comment.description}</p>
      </div>
      </div>`
    }
    document.getElementById('commentsContainer').innerHTML = htmlContentToAppend;
}

function promedioRatings() {
    let sumatoria = 0;
    for (comment of commentsArray) {
        sumatoria += comment.score;
    }
    let promedio = (sumatoria / commentsArray.length).toFixed(2);
    let estrellas = `
    <div class="col-3"></div>
    <div class="col-1">
    <h3>${promedio}</h3>
    </div> 
    <div class="col-4" style="padding: 0%;">`;
    for (let i = 1; i <= 5; i++) {
        if (i <= promedio) {
            estrellas += `<i class="fas fa-star"></i>`;
        } else {
            estrellas += `<i class="far fa-star"></i>`;
        }
    }

    estrellas += `</div>`
    let promedioNumero = `
    <small>de promedio en ${commentsArray.length} respuestas</small>`;

    document.getElementById('promedioRating').innerHTML = estrellas;
    document.getElementById('promedioRatingNumero').innerHTML = promedioNumero;

}

//Add comment


function nombreUsuarioOpinion() {
    let nombreUsuario = document.getElementById('mostrarNombreUsuario');
    let nombreNoRecordado = JSON.parse(sessionStorage.getItem('usuario'));
    let nombreRecordado = JSON.parse(localStorage.getItem('usuario'));
    let nombreGoogle = JSON.parse(sessionStorage.getItem('usuarioGoogle'));

    if (nombreRecordado !== '' && nombreNoRecordado == null && nombreGoogle == null) {
        nombreUsuario.innerHTML = nombreRecordado;

    } else if (nombreNoRecordado !== '' && nombreRecordado == null && nombreGoogle == null) {
        nombreUsuario.innerHTML = nombreNoRecordado;

    } else if (nombreGoogle !== '' && nombreRecordado == null && nombreNoRecordado == null) {
        nombreUsuario.innerHTML = nombreGoogle;

    }

}

function formatearFecha(newDate) {
    let year = newDate.getFullYear();

    let month = "";
    if ((newDate.getMonth() + 1) < 10) {
        month = '0' + (newDate.getMonth() + 1);
    } else {
        month = newDate.getMonth() + 1;
    }

    let day = newDate.getDate();

    let hours = "";
    if (newDate.getHours() < 10) {
        hours = '0' + newDate.getHours();
    } else {
        hours = newDate.getHours();
    }

    let minutes = "";
    if (newDate.getMinutes() < 10) {
        minutes = '0' + newDate.getMinutes();
    } else {
        minutes = newDate.getMinutes();
    }
    let seconds = "";
    if (newDate.getSeconds() < 10) {
        seconds = '0' + newDate.getSeconds();
    } else {
        seconds = newDate.getSeconds();
    }
    return year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
}

function compartirOpinion() {
    let descripcionOpinion = document.getElementById('descripcionOpinion').value;
    let score = document.getElementById('valor').innerHTML;
    let usuario = document.getElementById('mostrarNombreUsuario').innerHTML;
    let nuevaOpinion = {};
    let currentDateTime = new Date();
    let dateTime = formatearFecha(currentDateTime);

    if (descripcionOpinion === "") {
        document.getElementById('descripcionOpinion').style.borderColor = "red";
        score = score;
        console.log(score);


    } else if (score === "") {

        score = 0;
        nuevaOpinion.dateTime = dateTime;
        nuevaOpinion.description = descripcionOpinion;
        nuevaOpinion.score = parseInt(score);
        nuevaOpinion.user = usuario;

        commentsArray.push(nuevaOpinion);
        document.getElementById('descripcionOpinion').style.borderColor = "lightgray";

    } else if (descripcionOpinion !== "") {

        nuevaOpinion.dateTime = dateTime;
        nuevaOpinion.description = descripcionOpinion;
        nuevaOpinion.score = parseInt(score);
        nuevaOpinion.user = usuario;

        commentsArray.push(nuevaOpinion);
        document.getElementById('descripcionOpinion').style.borderColor = "lightgray";
    }



}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e) {
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj) {
        if (resultObj.status === 'ok') {

            productInfoObj = resultObj.data;
            imagesArray = productInfoObj.images;
            productName = productInfoObj.name;
            productCost = productInfoObj.cost;
            productCurrency = productInfoObj.currency;
            soldCount = productInfoObj.soldCount;
            description = productInfoObj.description;
            category = productInfoObj.category;
            relatedProducts = productInfoObj.relatedProducts;

            showProductName();
            showProductInfo();

        }
    })
    getJSONData(PRODUCTS_URL).then(function(resultObj) {
        if (resultObj.status === 'ok') {
            autosArray = resultObj.data;
            relatedProductsQuery();
            showProductInfo();
            showRelatedProducts();



        }

    })

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj) {
        if (resultObj.status === 'ok') {
            commentsArray = resultObj.data;
            sortCommentsArrayByDate();
            showComments();
            promedioRatings();
            nombreUsuarioOpinion();

        }

    })

    document.getElementById('publicarOpinion').addEventListener('click', function() {
        compartirOpinion();

        if (currentSortCommentsCriteria === 'Fecha') {
            sortCommentsArrayByDate();
        } else if (currentSortCommentsCriteria === 'Rating') {
            sortCommentsArrayByRating();
        } else if (currentSortCommentsCriteria === 'RatingAsc') {
            sortCommentsArrayByRatingAsc();
        }
        showComments();
        promedioRatings();
        document.getElementById('descripcionOpinion').value = "";

    })

    document.getElementById('sortByDate').addEventListener('click', () => {
        sortCommentsArrayByDate();
        showComments();
    })


    document.getElementById('sortByRating').addEventListener('click', () => {
        sortCommentsArrayByRating();
        showComments();
    })

    document.getElementById('sortByRatingAsc').addEventListener('click', () => {
        sortCommentsArrayByRatingAsc();
        showComments();
    })


});