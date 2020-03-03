const products = document.getElementById('products')

products.addEventListener("click", (event) => {
    let th = event.target;

    if (th.tagName != 'TH') return;

    sortProducts(th.cellIndex);
});

function sortProducts(colNum) {
    let tbody = document.querySelector('tbody');
    let rowsArray = Array.from(tbody.rows);

    rowsArray.sort((rowA, rowB) => {
        let a = +rowA.cells[colNum].innerHTML.match(/\d+/)[0];
        let b = +rowB.cells[colNum].innerHTML.match(/\d+/)[0];

        return a - b;
    });

    tbody.append(...rowsArray);
}