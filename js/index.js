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

// light Tabs
customerTab.addEventListener('click', e => {
    let info = document.querySelector(".customer-info");
    info.dataset.activeTab = "customerInfo";

    lighTab(e.currentTarget.id);

    pasteShippOrCustomerInfo(orderIdElem.textContent, "customerInfo")
});

shippingTab.addEventListener('click', e => {
    const info = document.querySelector(".customer-info");
    info.dataset.activeTab = "shippedTo";

    lighTab(e.currentTarget.id);

    pasteShippOrCustomerInfo(orderIdElem.textContent, "shippedTo")
});

function lighTab(activeId) {
    let shipDiv = document.querySelector("#shippingTab");
    let shipIcon = document.querySelector("#shippingTab i");

    let customerDiv = document.querySelector("#customerTab");
    let customerIcon = document.querySelector("#customerTab i");

    switch (activeId) {
        case "shippingTab":
            shipDiv.classList.add("js-active-tab-underline");
            shipIcon.classList.add("js-active-tab-icon");

            customerDiv.classList.remove("js-active-tab-underline");
            customerIcon.classList.remove("js-active-tab-icon");
            break;
        case "customerTab":
            customerDiv.classList.add("js-active-tab-underline");
            customerIcon.classList.add("js-active-tab-icon");

            shipDiv.classList.remove("js-active-tab-underline");
            shipIcon.classList.remove("js-active-tab-icon");
            break;

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