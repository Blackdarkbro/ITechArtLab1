const inputProduct = document.querySelector("#productsSearchInput");
const findProductButton = document.querySelector("#findProduct");
const refreshProductsButton = document.querySelector("#refreshProducts");

findProductButton.addEventListener("click", event => {
    let text = inputProduct.value.toLowerCase();

    if (text) {
        findProducts(text)
    }
});

refreshProductsButton.addEventListener("click", event => {
    const products = document.querySelector('tbody');

    addProducts(products.dataset.id)
    inputProduct.value = "";
})

function findProducts(text) {
    const products = document.querySelector("tbody");
    const productsNumber = document.querySelector("#productsNumber");

    let orderId = products.dataset.id
    let searchResult = new Set();

    Orders.forEach(order => {
        order.products.forEach(product => {
            if (order.id == orderId) {

                for (const key in product) {
                    if (product[key].toLowerCase().includes(text)) {
                        searchResult.add(product.id);
                    }
                }
            }
        });
    });
    products.innerHTML = "";
    productsNumber.textContent = searchResult.size;

    if (searchResult.size) {

        searchResult.forEach(value => {
            products.appendChild(createProduct(orderId, value))
        });
    } else {
        products.textContent = "No such products";
    }


}