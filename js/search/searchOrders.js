const inputOrder = document.querySelector("#orderSearchInput");
const findOrderButton = document.querySelector("#findOrder");
const refreshOrdersButton = document.querySelector("#refreshOrders");

const buttons = document.querySelectorAll("button");
buttons.forEach(elem => {
    elem.addEventListener('click', e => {
        e.preventDefault();
    })
});

refreshOrdersButton.addEventListener("click", e => {
    inputOrder.value = "";
    addAllOrders();
});

// search at orders
findOrderButton.addEventListener("click", e => {
    let text = inputOrder.value.toLowerCase();

    if (text) {
        findOrders(text);
    }
});

function findOrders(text) {
    const ordersList = document.querySelector("#ordersList");
    const ordersNumbers = document.querySelector("#ordersNumber");

    let foundedId = new Set();

    Orders.forEach(order => {
        let orderId = order.id.toString();

        // for order id
        if (("order " + orderId).includes(text)) {
            foundedId.add(order.id);
        }

        // for other parameters
        for (const key in order.OrderInfo) {
            let info = order.OrderInfo[key].toLowerCase();

            if (info.includes(text)) {
                foundedId.add(order.id);
            }
        }
    });

    ordersList.innerHTML = "";
    ordersNumbers.textContent = foundedId.size;

    if (foundedId.size) {
        foundedId.forEach(id => {
            addOrder(id);
        });
    } else {
        ordersList.textContent = "No such orders";
    }

}