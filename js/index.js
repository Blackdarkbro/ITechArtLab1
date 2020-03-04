showDefaultInfo();
highlightActiveOrder();

function showDefaultInfo() {

    if (Orders.length) {
        addAllOrders();
        pasteInfoIntoPage(Orders[0].id);
        addProducts(Orders[0].id);
    } else {
        const ordersList = document.querySelector("#ordersList");
        ordersList.textContent = "NO ORDERS"
    }
}

function highlightActiveOrder() {
    const documentOrders = document.querySelectorAll('.order');
    const ordersList = document.querySelector("#ordersList");

    documentOrders[0].classList.add("js-activeOrder");

    ordersList.addEventListener('click', (event) => {
        let target = event.target.closest(".order");

        if (!target) return;
        if (!ordersList.contains(target)) return;

        documentOrders.forEach(element => {
            element.classList.remove("js-activeOrder");
        });
        target.classList.add("js-activeOrder");
    });
}