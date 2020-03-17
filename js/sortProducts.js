const products = document.querySelector("#products");

products.addEventListener("click", (event) => {
    let th = event.target;
    if (th.tagName != "TH") return;

    const iconsCollection = document.querySelectorAll("#products i");
    const thead = document.querySelector("#products thead");
    const headers = document.querySelectorAll("th");
    const tbody = document.querySelector("tbody");

    let sortKind = changeSort(thead);

    let productsData = getProductsData(tbody.dataset.id);
    let sortedProductsData = sortProductsData(th.cellIndex, sortKind, productsData);

    highlightTarget(headers, th);
    replaceIcon(iconsCollection, sortKind);
    renderSordProducts(sortedProductsData, tbody, tbody.dataset.id);
});

function replaceIcon(collection, sortKind) {
    collection.forEach(i => {
        if (sortKind === "asc") {
            i.classList.replace("fa-bars", "fa-sort-amount-down-alt");
        } else if (sortKind === "desc") {
            i.classList.replace("fa-sort-amount-down-alt", "fa-sort-amount-up");
        } else if (sortKind === "default") {
            i.classList.replace("fa-sort-amount-up", "fa-bars");
        }
    });
}

function highlightTarget(headers, target) {
    headers.forEach(elem => {
        elem.classList.remove("js-activeColumn")
    });
    target.classList.add("js-activeColumn");
}

function changeSort(thead) {
    let sortKind = "";

    if (thead.dataset.sortKind === "asc") {
        thead.dataset.sortKind = "desc";
        sortKind = "asc";
    } else if (thead.dataset.sortKind === "desc") {
        thead.dataset.sortKind = "default";
        sortKind = "desc";
    } else if (thead.dataset.sortKind === "default") {
        thead.dataset.sortKind = "asc";
        sortKind = "default";
    }

    return sortKind;
}

// functions to sort products
function renderSordProducts(sortedProductsData, parent, orderId) {
    parent.innerHTML = "";

    sortedProductsData.forEach(product => {
        parent.appendChild(createProduct(orderId, product.id));
    })
}

function sortProductsData(colNum, sortKind, data) {
    let sortedProdcts = data;

    keysStore = {
        "0": "name",
        "1": "price",
        "2": "quantity",
        "3": "totalPrice"
    }

    sortedProdcts.sort((productA, productB) => {
        let a = productA[keysStore[colNum]];
        let b = productB[keysStore[colNum]];

        if (colNum == 0) {
            switch (sortKind) {
                case "asc":
                    return a > b ? 1 : -1;
                case "desc":
                    return b > a ? 1 : -1;
            }
        }

        switch (sortKind) {
            case "asc":
                return a - b;
            case "desc":
                return b - a;
            case "default":
                return productA.id - productB.id;
        }
    });
    return sortedProdcts;
}

function getProductsData(orderId) {
    const productsSearchInput = document.querySelector("#productsSearchInput");

    let orderIndex;
    Orders.forEach((order, index) => {
        if (order.id == orderId) orderIndex = index;
    })

    let data = [];

    if (productsSearchInput.value) {
        let idSet = findProducts(productsSearchInput.value)
        data = getPartOfProducts(orderIndex, idSet);
        console.log(data);
    } else {
        data = getFullProducts(orderIndex);
    }

    return data;
}

function getFullProducts(orderIndex) {
    let data = [];

    Orders[orderIndex].products.forEach(product => {
        data.push(product);
    });

    return data;
}

function getPartOfProducts(orderIndex, idSet) {
    let data = [];

    Orders[orderIndex].products.forEach((product) => {
        if (idSet.has(product.id)) {
            data.push(product);
        }
    });

    return data;
}