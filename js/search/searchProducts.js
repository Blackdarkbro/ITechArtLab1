const inputProduct = document.querySelector("#productsSearchInput");
const findProductButton = document.querySelector("#findProduct");
const refreshProductsButton = document.querySelector("#refreshProducts");

findProductButton.addEventListener("click", event => {
    let text = inputProduct.value.toLowerCase();

    if (text) {
        let idStore = findProducts(text);
        renderFindedProducts(idStore);
    }
});

refreshProductsButton.addEventListener("click", event => {
    const products = document.querySelector('tbody');

    addProducts(products.dataset.id)
    inputProduct.value = "";
})

function findProducts(text) {
    const products = document.querySelector("tbody");

    let orderId = products.dataset.id
    let coincidentalId = new Set();

    Orders.forEach(order => {
        order.products.forEach(product => {
            if (order.id == orderId) {

                for (const key in product) {
                    if (product[key].toLowerCase().includes(text)) {
                        coincidentalId.add(product.id);
                    }
                }
            }
        });
    });

    return coincidentalId;
}

function renderFindedProducts(idSet) {
    const products = document.querySelector("tbody");
    const productsNumber = document.querySelector("#productsNumber");

    let orderId = products.dataset.id

    products.innerHTML = "";
    productsNumber.textContent = idSet.size;

    if (idSet.size) {
        idSet.forEach(value => {
            products.appendChild(createProduct(orderId, value));
        });
    } else {
        products.textContent = "No such products";
    }
}