const inputProduct = document.getElementById('productsSearchInput');
const findProductButton = document.getElementById('findProduct');
const refreshProductsButton = document.getElementById('refreshProducts');


findProductButton.addEventListener('click', event => {
    let text = inputProduct.value.toLowerCase();

    if (text) {
        findProducts(text)
    }
});

refreshProductsButton.addEventListener('click', event => {
    const products = document.querySelector('tbody');

    addProducts(products.dataset.id)
    inputProduct.value = "";
})

function findProducts(text) {
    const products = document.querySelector('tbody');

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
    products.append(...searchResult);
}