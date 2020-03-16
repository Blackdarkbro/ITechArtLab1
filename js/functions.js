// orderInfo block
const customer = document.querySelector("#customer");
const created = document.querySelector("#created");
const shipped = document.querySelector("#shipped");
const orderIdElem = document.querySelector("#orderId");

const orderInfoArr = [customer, created, shipped];

// customer information and shipped to block
const infoKey1 = document.querySelector("#key1");
const infoKey2 = document.querySelector("#key2");
const infoKey3 = document.querySelector("#key3");
const infoKey4 = document.querySelector("#key4");
const infoKey5 = document.querySelector("#key5");

const infoKeys = [infoKey1, infoKey2, infoKey3, infoKey4, infoKey5];

const infoValue1 = document.querySelector("#value1");
const infoValue2 = document.querySelector("#value2");
const infoValue3 = document.querySelector("#value3");
const infoValue4 = document.querySelector("#value4");
const infoValue5 = document.querySelector("#value5");

const infoValues = [infoValue1, infoValue2, infoValue3, infoValue4, infoValue5];

// FUNCTIONS

function addAllOrders() {
    const ordersList = document.querySelector("#ordersList");
    const ordersNumbers = document.querySelector("#ordersNumber");

    // show number of orders
    ordersNumbers.textContent = Orders.length;

    // remove old products
    ordersList.innerHTML = "";

    Orders.forEach(elem => {
        addOrder(elem.id);
    })
}

function addOrder(orderId) {
    const ordersList = document.querySelector("#ordersList");
    ordersList.appendChild(createOrder(orderId));
}

function createOrder(orderId) {
    let order;

    Orders.forEach((elem) => {
        if (elem.id == orderId)
            order = elem;
    })

    let valuesArr = [order.id];

    for (const key in order.OrderInfo) {
        valuesArr.push(order.OrderInfo[key]);
    }

    let section = new Order(...valuesArr).compileOrder();
    section.dataset.id = order.id;

    addEventsHandlers(section);

    return section;
}

function addEventsHandlers(element) {
    // change information 
    element.addEventListener("click", (event) => {
        let targetId = event.currentTarget.dataset.id;

        pasteInfoIntoPage(targetId);
        addProducts(targetId);
    });

    // highlith order
    element.addEventListener("mouseover", () => {
        element.classList.add("js-mouseOverOrder");
    });

    element.addEventListener("mouseout", () => {
        element.classList.remove("js-mouseOverOrder");
    });

    // drop products sorting to default state
    element.addEventListener("click", () => {
        const iconsCollection = document.querySelectorAll("#products i");
        const headers = document.querySelectorAll("th");

        headers.forEach(elem => {
            elem.classList.remove("js-activeColumn")
        });

        iconsCollection.forEach(i => {
            i.classList.replace("fa-sort-amount-down-alt", "fa-bars");
            i.classList.replace("fa-sort-amount-up", "fa-bars");
        });
    });
}

function addProducts(orderId) {
    const products = document.querySelector("#products tbody");
    const productsNumber = document.querySelector("#productsNumber")

    products.dataset.id = orderId;

    // remove old products
    const tbody = document.querySelector("#products tbody");
    tbody.innerHTML = "";

    let rows = createAllProducts(orderId);
    products.append(...rows);

    // insert number of products
    productsNumber.textContent = rows.length;
}

function createAllProducts(orderId) {
    let rows = [];

    Orders.forEach(order => {

        if (order.id == orderId) {
            order.products.forEach(product => {

                rows.push(createProduct(order.id, product.id));
            })
        }
    });
    return rows;
}

function createProduct(orderId, productId) {
    let valueArr = [];

    Orders.forEach(order => {

        if (order.id == orderId)
            order.products.forEach(product => {

                if (product.id == productId)
                    for (const key in product) {
                        valueArr.push(product[key])
                    }
            });
    });
    return new TableRow(...valueArr).compileRow();
}

function pasteInfoIntoPage(orderId) {
    const activeTab = document.querySelector(".customer-info").dataset.activeTab;

    orderIdElem.textContent = orderId;
    pasteOrderInfo(orderId)

    pasteShippOrCustomerInfo(orderId, activeTab)


    // paste total price
    let totalPrice = document.querySelector("#totalPrice");
    let sum = 0;

    Orders.forEach(order => {
        if (order.id == orderId) {

            order.products.forEach(product => {
                sum += +product.totalPrice
            });
        }
    });
    totalPrice.textContent = sum;
}

function pasteOrderInfo(orderId) {
    let valueArr = [];

    for (const order of Orders) {
        let obj = order.OrderInfo;

        for (const key in obj) {
            if (key == "status") continue;

            if (order.id == orderId) {
                valueArr.push(obj[key])
            }
        }
    }

    orderInfoArr.forEach((elem, index) => {
        elem.textContent = valueArr[index];
    });
}

function pasteShippOrCustomerInfo(orderId, datasetFlag) {
    let flag;
    let valueArr = [];
    let keyArr = [];

    if (datasetFlag === "shippedTo") flag = "ShipTo";
    else if (datasetFlag === "customerInfo") flag = "CustomerInfo";

    Orders.forEach(order => {

        if (order.id == orderId) {
            let obj = order[flag];

            for (let key in obj) {
                keyArr.push(key);
                valueArr.push(obj[key]);
            }
        }
    });

    infoKeys.forEach((elem, index) => {
        elem.textContent = keyArr[index];
    });
    infoValues.forEach((elem, index) => {
        elem.textContent = valueArr[index];
    });
}