// orderInfo block
const customer = document.getElementById('customer');
const created = document.getElementById('created');
const shipped = document.getElementById('shipped');
const orderIdElem = document.getElementById('orderId');

const orderInfoArr = [customer, created, shipped];

// shippedTo block
const name = document.getElementById('name');
const address = document.getElementById('address');
const zip = document.getElementById('zip');
const region = document.getElementById('region');
const country = document.getElementById('country');

const shipToArr = [name, address, zip, region, country];

// customerInfo block
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const customerAddress = document.getElementById('customerAddress');
const phone = document.getElementById('phone');
const email = document.getElementById('email');

const customerInfoArr = [firstName, lastName, customerAddress, phone, email];

function addAllOrders() {
    Orders.forEach(elem => {
        addOrder(elem.id);
    })
}

function clearOrders() {
    const orders = document.querySelectorAll('.order');
    orders.forEach(order => {
        order.remove();
    })
}

function addOrder(orderId) {
    const ordersList = document.querySelector('#ordersList');
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

    // change information 
    section.addEventListener('click', (event) => {
        let targetId = event.currentTarget.dataset.id;

        pasteInfoIntoPage(targetId);
        addProducts(targetId);
    });

    return section;
}

function addProducts(orderId) {
    const products = document.querySelector('#products tbody');
    const productsNumber = document.getElementById('productsNumber')

    products.dataset.id = orderId;

    // remove old products
    const trCollection = document.querySelectorAll('#products tbody tr');
    trCollection.forEach(tr => {
        tr.remove();
    });

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
    pasteInfoIntoBlock(orderId, 'id', orderIdElem)
    pasteInfoIntoBlock(orderId, 'OrderInfo', ...orderInfoArr);

    // if we on first page
    if (name) {
        pasteInfoIntoBlock(orderId, 'ShipTo', ...shipToArr)
    }

    // if we on second page
    if (firstName) {
        pasteInfoIntoBlock(orderId, 'CustomerInfo', ...customerInfoArr)
    }

    // paste total price
    let totalPrice = document.getElementById('totalPrice');
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

    elements.forEach(elem => {
        elem.textContent = valueArr[elements.indexOf(elem)];
    });
}