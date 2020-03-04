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

    let searchResult = [];

    Orders.forEach(order => {
        order.products.forEach(product => {

            for (const key in product) {
                if (product[key].toLowerCase().includes(text)) {

                    searchResult.push(createProduct(products.dataset.id, product.id))
                }
            }
        });
    });
    products.innerHTML = "";
    productsNumber.textContent = searchResult.length;

    if (searchResult.length) {
        products.append(...searchResult);
    } else {
        products.textContent = "No such products";
    }


}