const inputOrder = document.getElementById('orderSearchInput');
const findOrderButton = document.getElementById('findOrder');
const refreshOrdersButton = document.getElementById('refreshOrders');

const buttons = document.querySelectorAll('button');
buttons.forEach(elem => {
    elem.addEventListener('click', e => {
        e.preventDefault();
    })
});

// search at orders
findOrderButton.addEventListener('click', e => {
    let text = inputOrder.value.toLowerCase();

    if (text) {
        clearOrders();
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

        foundedId.forEach(id => {
            addOrder(id);
        })
    }
});

refreshOrdersButton.addEventListener('click', e => {
    inputOrder.value = "";
    clearOrders();
    addAllOrders();
});