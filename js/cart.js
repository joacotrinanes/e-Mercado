var cartInfoArticles = [];
var quantityProductCart = [];
var currencyCurrentDisplay = true;
var currencyRatesUpdated = {};
var subTotalAmount = 0;
var delivery = {};
var deliveryOptionChecked = undefined;
var totalCost = 0;
var countriesArray = [];
var compraExitosa = '';


/*Real time USD rate */
var rateUSD = undefined;



const changeCurrencyDisplay = (array) => {
    array.forEach(i => {
        if (i.currency === 'USD') {
            i.currency = 'US$';
        } else if (i.currency === 'UYU') {
            i.currency = '$';
        }
    })
};

const getQuantitiesProducts = () => {
    cartInfoArticles.forEach(i => {
        quantityProductCart.push(i.count);
    })
}

const updateQuantityProd = () => {
    let values = document.getElementsByName('quantity');
    let i = 0;
    values.forEach(() => {
        quantityProductCart[i] = values[i].value;
        i++;
    })
    showCartItems();
}

const cartItemsQuantity = () => {
    let counter = 0;
    cartInfoArticles.forEach(() => {
        counter++;
    })
    document.getElementById('numberItems').innerHTML = `Artículos: <strong>${counter}</strong>`;
}


const showCartItems = () => {


    let htmlContentToAppend = "";
    let j = 0;
    cartInfoArticles.forEach(i => {
        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
        <div class="row">
        <div class="col-4">
        <div class="container h-100 w-100">
        <img src="${i.src}" class="h-100 w-100"></div>
        </div>
        <div class="col-8">
        <div class="row justify-content-left">
        <div class="col-8">
        <h4>${i.name}<h4>
        </div>
        <div class="col-4" style="text-align: right;">
        <span class="subtotalItem" style="font-weight: bold;">${i.currency} ${quantityProductCart[j] * i.unitCost}</span>
        </div>
        </div>
        <div class="row justify-content-left">
        <small>Cantidad de articulos:  <input name="quantity" type="number" min="1" value="${quantityProductCart[j]}" onchange="updateQuantityProd(); subTotalList(); showDeliveryCost(); showTotalCost();" style="width: 40px; border-color: transparent"></small>
        </div>
        <div class="row">
        <small>Precio Unitario: <span style="font-weight: bold">${i.currency} ${i.unitCost}</span></small>
        </div>   
        </div>
        </div>
        </div>
        </div>
        </div>
        `;
        j++;
    });
    document.getElementById('cartInfo').innerHTML = htmlContentToAppend;
};


/*Currency Display*/
const peso = () => {
    currencyCurrentDisplay = true;
    subTotalList();
}

const dolar = () => {
    currencyCurrentDisplay = false;
    subTotalList();
}


/*SubTotal List*/
const subTotalList = () => {
    let htmlContentToAppend = '';
    let j = 0;
    subTotalAmount = 0;
    cartInfoArticles.forEach(i => {
        let itemCost = i.unitCost * quantityProductCart[j];
        if (currencyCurrentDisplay === true) {

            if (i.currency === '$') {
                htmlContentToAppend += `
            <li>
            <small>${i.name}: <strong>$
            <span class="subTotalItems">${itemCost}</span>
            </strong></small>
            </li>`;
                j++;
                subTotalAmount += itemCost;
            } else {
                htmlContentToAppend += `
                <li>
                <small>${i.name}: <strong>$  
                <span class="subTotalItems">${itemCost * rateUSD}</span>
                </strong></small>
                </li>`;
                j++;
                subTotalAmount += itemCost * rateUSD;
            }

        } else {

            if (i.currency === 'US$') {
                htmlContentToAppend += `
                <li>
                <small>${i.name}: <strong>US$ 
                <span class="subTotalItems">${itemCost}</span>
                </strong></small>
                </li>`;
                j++;
                subTotalAmount += itemCost;
            } else {
                htmlContentToAppend += `
                <li>
                <small>${i.name}: <strong>US$  
                <span class="subTotalItems">${(itemCost / rateUSD).toFixed(2)}</span>
                </strong></small>
                </li>`;
                j++;
                subTotalAmount += (itemCost / rateUSD);
            }
        }

    })

    document.getElementById('subTotalList').innerHTML = htmlContentToAppend;

    if (currencyCurrentDisplay === true) {
        document.getElementById('subTotalAmount').innerHTML = '$ ' + subTotalAmount;
    } else {
        document.getElementById('subTotalAmount').innerHTML = 'US$ ' + subTotalAmount.toFixed(2);
    }

}

/* Show Updated Exchange Rate*/

const showUpdatedExchangeRate = () => {
    document.getElementById('cotizacion').innerHTML = 'Cotización USD = $' + rateUSD;
}

/*Type of delivery*/

const getTypeDelivery = () => {
    let deliveyOptions = document.getElementsByName('tiposEnvio');


    deliveyOptions.forEach(i => {
        if (i.checked) {
            deliveryOptionChecked = i.value;
        }
    })
    if (deliveryOptionChecked === '1') {
        delivery.percentageCharge = 0.15;
        delivery.deliveryType = 'Premium';
    } else if (deliveryOptionChecked === '2') {
        delivery.percentageCharge = 0.07;
        delivery.deliveryType = 'Express';
    } else if (deliveryOptionChecked === '3') {
        delivery.percentageCharge = 0.05;
        delivery.deliveryType = 'Standard'
    }
    return delivery;
}

const showDeliveryCost = () => {
    let htmlContentToAppend = '';
    if (deliveryOptionChecked !== undefined) {
        if (currencyCurrentDisplay === true) {
            htmlContentToAppend = `
            <li><small>${delivery.deliveryType}: <strong>$ ${(delivery.percentageCharge * subTotalAmount).toFixed(0)}</strong></small></li>
            `;
            document.getElementById('totalDeliveryCost').innerHTML = `$ ${(delivery.percentageCharge * subTotalAmount).toFixed(0)}`
        } else {
            htmlContentToAppend = `
            <li><small>${delivery.deliveryType}: <strong>US$ ${(delivery.percentageCharge * subTotalAmount).toFixed(2)}</strong></small></li>
            `;
            document.getElementById('totalDeliveryCost').innerHTML = `US$ ${(delivery.percentageCharge * subTotalAmount).toFixed(2)}`
        }

        document.getElementById('envio').innerHTML = htmlContentToAppend;
    } else {
        if (currencyCurrentDisplay === true) {
            document.getElementById('totalDeliveryCost').innerHTML = '$ 0';
        } else {
            document.getElementById('totalDeliveryCost').innerHTML = 'US$ 0';
        }

    }


}

/*Total Cost*/
const getTotalCost = () => {
    if (deliveryOptionChecked !== undefined) {
        totalCost = subTotalAmount * (1 + delivery.percentageCharge);
    } else {
        totalCost = subTotalAmount;
    }
}

const showTotalCost = () => {
    getTotalCost();
    htmlContentToAppend = '';
    if (currencyCurrentDisplay === true) {
        htmlContentToAppend = `$ ${(totalCost).toFixed(0)}`;
    } else {
        htmlContentToAppend = `US$ ${(totalCost).toFixed(2)}`;
    }
    document.getElementById('totalCost').innerHTML = htmlContentToAppend;
}

/*Country Select*/

const showCountriesList = () => {
    htmlContentToAppend = '<option id="default" value="none" disabled selected>Elija su país</option>';
    countriesArray.forEach(i => {
        htmlContentToAppend += `
        <option id="${i.UNAIDS_CountryCode}">${i.CountryName}</option>`
    })
    document.getElementById('paises').innerHTML = htmlContentToAppend;
}

/*On Purchase */
var calle = document.getElementById('calle');
var numeroCalle = document.getElementById('numeroCalle');
var esquina = document.getElementById('esquina');
var pais = document.getElementsByName('opcionesPaises')[0];

const validatePurchase = () => {
    if ((calle.value.trim() === '' || numeroCalle.value.trim() === '' || esquina.value.trim() === '' || pais.value === 'none') && deliveryOptionChecked === undefined) {
        return swal({
            title: "Completar todos los datos",
            text: "Completar todos los campos de su dirección y \n seleccione tipo de envío",
            icon: 'error',
            button: 'Ok'
        });
    } else if (calle.value.trim() === '' || numeroCalle.value.trim() === '' || esquina.value.trim() === '' || pais.value === 'none') {
        return swal({
            title: "Completar todos los datos de su dirección",
            icon: 'error',
            button: 'Ok'
        });
    } else if (deliveryOptionChecked === undefined) {
        return swal({
            title: "Seleccionar tipo de envío",
            icon: 'error',
            button: 'Ok'
        });
    } else {
        return swal({
                title: "¿Confirmar compra?",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
            .then((willDelete) => {
                if (willDelete) {
                    swal(compraExitosa, {
                        icon: "success",
                        dangerMode: true
                    }).then((willDelete) => {
                        if (willDelete) {
                            window.location.href = 'index.html';
                        }
                    });

                } else {
                    swal("Compra cancelada", { icon: "warning" });
                }
            });
    }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e) {

    getJSONData(CART_CURRENCY_RATES_URL).then((currencyRatesObj) => {
        if (currencyRatesObj.status === 'ok') {
            currencyRatesUpdated = currencyRatesObj.data;
            rateUSD = (currencyRatesUpdated.rates.UYU / currencyRatesUpdated.rates.USD).toFixed(2);

        }
    });

    getJSONData(CART_INFO_2_URL).then((cartInfoObj) => {
        if (cartInfoObj.status === 'ok') {
            cartInfoObj = cartInfoObj.data;
            cartInfoArticles = cartInfoObj.articles;

            changeCurrencyDisplay(cartInfoArticles);
            getQuantitiesProducts();
            showCartItems();
            subTotalList();
            cartItemsQuantity();
            showUpdatedExchangeRate();
            showDeliveryCost();
            showTotalCost();
        }
    });

    getJSONData('./countries.json').then((countriesResObj) => {
        if (countriesResObj.status === 'ok') {
            countriesArray = countriesResObj.data.Data;
            showCountriesList();

        }

    })

    getJSONData(CART_BUY_URL).then((resultObj) => {
        if (resultObj.status === 'ok') {
            compraExitosa = resultObj.data.msg;
        }
    })

    document.getElementById('peso').addEventListener('click', () => {
        peso();
        showDeliveryCost();
        showTotalCost();
    });

    document.getElementById('dolar').addEventListener('click', () => {
        dolar();
        showDeliveryCost();
        showTotalCost();
    });

    document.getElementsByName('tiposEnvio').forEach(tipo => {
        tipo.addEventListener('change', () => {
            getTypeDelivery();
            showDeliveryCost();
            showTotalCost();
        })
    });

    document.getElementById('comprar').addEventListener('click', () => {
        validatePurchase();

    })


});