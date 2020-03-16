const products = document.querySelector("#products")

products.addEventListener("click", (event) => {
    let th = event.target;
    if (th.tagName != "TH") return;


    const iconsCollection = document.querySelectorAll("#products i");
    const thead = document.querySelector("#products thead");
    const headers = document.querySelectorAll("th");

    let sortKind = changeSort(thead);

    highlightTarget(headers, th);
    replaceIcon(iconsCollection, sortKind);
    sortProducts(th.cellIndex, sortKind);
});

function sortProducts(colNum, sortKind) {
    let tbody = document.querySelector('tbody');

    let rowsArray = Array.from(tbody.rows);

    Orders.forEach(order => {
        order
    })

    rowsArray.sort((rowA, rowB) => {
        let regexp = /\d+/;

        let a = rowA.cells[colNum].innerHTML.match(regexp)[0];
        let b = rowB.cells[colNum].innerHTML.match(regexp)[0];

        if (colNum == 0) {
            a = rowA.cells[colNum].innerHTML.substr(44);
            b = rowB.cells[colNum].innerHTML.substr(44);

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
                return +rowA.cells[0].innerHTML.match(/\d+/)[0] - +rowB.cells[0].innerHTML.match(/\d+/)[0];
        }
    });

    tbody.append(...rowsArray);
}

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