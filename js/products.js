//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
const ORDER_ASC_BY_NAME = "AZ";
const ORDER_BY_PROD_PRICE_DESC = "PriceDesc";
const ORDER_DESC_RELEVANCE = "Relevance";
const ORDER_BY_PROD_PRICE_ASC = "PriceAsc";
var currentProductsArray = [];
var currentSortCriteria = undefined;
var minPrice = undefined;
var maxPrice = undefined;
var currentDisplay = 'List';

function sortProducts(criteria, array) {
    let result = [];
    if (criteria === ORDER_ASC_BY_NAME) {
        result = array.sort(function(a, b) {
            if (a.name < b.name) { return -1; }
            if (a.name > b.name) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_BY_PROD_PRICE_DESC) {
        result = array.sort(function(a, b) {
            let aPrice = parseInt(a.cost);
            let bPrice = parseInt(b.cost);

            if (aPrice < bPrice) { return 1; }
            if (aPrice > bPrice) { return -1; }
            return 0;
        });
    } else if (criteria === ORDER_BY_PROD_PRICE_ASC) {
        result = array.sort(function(a, b) {
            let aPrice = parseInt(a.cost);
            let bPrice = parseInt(b.cost);

            if (aPrice < bPrice) { return -1; }
            if (aPrice > bPrice) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_DESC_RELEVANCE) {
        result = array.sort(function(a, b) {
            let aSoldCount = parseInt(a.soldCount);
            let bSoldCount = parseInt(b.soldCount);

            if (aSoldCount > bSoldCount) { return -1; }
            if (aSoldCount < bSoldCount) { return 1; }
            return 0;
        });
    }

    return result;
};

function showProductsList() {

    let htmlContentToAppendList = "";
    let htmlContentToAppendAlbum = "";

    for (let i = 0; i < currentProductsArray.length; i++) {
        let product = currentProductsArray[i];

        if (((minPrice == undefined) || (minPrice != undefined && parseInt(product.cost) >= minPrice)) &&
            ((maxPrice == undefined) || (maxPrice != undefined && parseInt(product.cost) <= maxPrice))) {
            if (currentDisplay === 'List') {
                htmlContentToAppendList += `
            <div class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">` + product.name + `</h4>
                            <small class="text-muted">` + product.soldCount + ` artículos vendidos</small>
                        </div>
                        <p class="mb-1">` + product.description + `</p><br>
                        <h2> USD ` + product.cost + `<h2>
                    </div>
                </div>
            </div>
            `;
                htmlContentToAppendAlbum = '';
            } else if (currentDisplay === 'Album') {
                htmlContentToAppendAlbum += `<div class="card" style="width: 24rem; margin: 5px">
                                      <img src="${product.imgSrc}" class="bd-placeholder-img card-img-top" width="302" height="225">
                                      <div class="card-body">
                                      <div class="row">
                                      <div class="col col-8">                                                                           
                                      <h4 class="card-text">${product.name}</h4>
                                      </div>
                                      <div class="col col-4">                                      
                                      <small class="card-text text-right">${product.soldCount} articulos vendidos</small>
                                      </div></div>
                                      <h2 class="card-text"> USD ${product.cost}</h2><br>                                                                     
                                      </div>
                                      <div class="card-body">                                                                    
                                      <p class="card-text description"> ${product.description}</p>
                                      </div>
                                      </div>`;
                htmlContentToAppendList = '';

            }
        }
    }


    document.getElementById("prod-list-container").innerHTML = htmlContentToAppendList;
    document.getElementById('album-list-container').innerHTML = htmlContentToAppendAlbum;


};

function displayAlbum() {
    currentDisplay = 'Album';
    showProductsList();
}

function displayList() {
    currentDisplay = 'List';
    showProductsList();
}

function sortAndShowProducts(sortCriteria, productsArray) {
    currentSortCriteria = sortCriteria;

    if (productsArray != undefined) {
        currentProductsArray = productsArray;
    }

    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);

    //Muestro las categorías ordenadas
    showProductsList();
};



//Search Bar


function search() {
    let input = document.getElementById('searchBar');
    let filter = input.value.toLowerCase();
    let listArray = currentProductsArray;

    let filteredArray = listArray.filter(product => {
        return (product.name.toLowerCase().includes(filter)) || (product.description.toLowerCase().includes(filter));
    });

    currentProductsArray = filteredArray;

}

// Display product description in album display







//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e) {
    getJSONData(PRODUCTS_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            sortAndShowProducts(ORDER_ASC_BY_NAME, resultObj.data);
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function() {
        sortAndShowProducts(ORDER_ASC_BY_NAME);
    });

    document.getElementById("sortByPriceDesc").addEventListener("click", function() {
        sortAndShowProducts(ORDER_BY_PROD_PRICE_DESC);
    });

    document.getElementById("sortByRelevance").addEventListener("click", function() {
        sortAndShowProducts(ORDER_DESC_RELEVANCE);
    });


    document.getElementById("sortByPriceAsc").addEventListener("click", function() {
        sortAndShowProducts(ORDER_BY_PROD_PRICE_ASC);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function() {
        document.getElementById("rangeFilterPriceMin").value = "";
        document.getElementById("rangeFilterPriceMax").value = "";

        minPrice = undefined;
        maxPrice = undefined;

        showProductsList();
    });

    document.getElementById("rangeFilterPrice").addEventListener("click", function() {
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minPrice = document.getElementById("rangeFilterPriceMin").value;
        maxPrice = document.getElementById("rangeFilterPriceMax").value;

        if ((minPrice != undefined) && (minPrice != "") && (parseInt(minPrice)) >= 0) {
            minPrice = parseInt(minPrice);
        } else {
            minPrice = undefined;
        }

        if ((maxPrice != undefined) && (maxPrice != "") && (parseInt(maxPrice)) >= 0) {
            maxPrice = parseInt(maxPrice);
        } else {
            maxPrice = undefined;
        }

        showProductsList();
    });

    document.getElementById('searchBar').addEventListener('keypress', function() {
        search();
        showProductsList();
    })

    document.getElementById('list').addEventListener('click', function() {
        displayList();
    })


    document.getElementById('album').addEventListener('click', function() {
        displayAlbum();
    })

});