// orderInfo block
const customer = document.querySelector("#customer");
const created = document.querySelector("#created");
const shipped = document.querySelector("#shipped");
const orderIdElem = document.querySelector("#orderId");

const orderInfoArr = [customer, created, shipped];

// shippedTo block
const name = document.querySelector("#name");
const address = document.querySelector("#address");
const zip = document.querySelector("#zip");
const region = document.querySelector("#region");
const country = document.querySelector("#country");

const shipToArr = [name, address, zip, region, country];

// customerInfo block
const firstName = document.querySelector("#firstName");
const lastName = document.querySelector("#lastName");
const customerAddress = document.querySelector("#customerAddress");
const phone = document.querySelector("#phone");
const email = document.querySelector("#email");

const customerInfoArr = [firstName, lastName, customerAddress, phone, email];

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
    pasteInfoIntoBlock(orderId, "id", orderIdElem)
    pasteInfoIntoBlock(orderId, "OrderInfo", ...orderInfoArr);

    // if we on first page
    if (name) {
        pasteInfoIntoBlock(orderId, "ShipTo", ...shipToArr)
    }

    // if we on second page
    if (firstName) {
        pasteInfoIntoBlock(orderId, "CustomerInfo", ...customerInfoArr)
    }

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

function pasteInfoIntoBlock(orderId, dataObject, ...elements) {
    let valueArr = [];

    for (const order of Orders) {
        for (const key in order[dataObject]) {
            if (key == "status") continue;

            let obj = order[dataObject];

            if (order.id == orderId) {
                valueArr.push(obj[key])
            }
        }
    }

    elements.forEach((elem, index) => {
        elem.textContent = valueArr[index];
    });
}