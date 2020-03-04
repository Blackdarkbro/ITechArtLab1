const products = document.querySelector("#products")


products.addEventListener("click", (event) => {
    let th = event.target;
    if (th.tagName != "TH") return;


    const iconsCollection = document.querySelectorAll("#products i");
    const thead = document.querySelector("#products thead");
    const headers = document.querySelectorAll("th");

    let sortKind = changeSort(thead);

    highlightTarget(headers, th);
    replaceIcon(iconsCollection);
    sortProducts(th.cellIndex, sortKind);
});

function sortProducts(colNum, sortKind) {
    let tbody = document.querySelector('tbody');
    let rowsArray = Array.from(tbody.rows);

    rowsArray.sort((rowA, rowB) => {
        let a = +rowA.cells[colNum].innerHTML.match(/\d+/)[0];
        let b = +rowB.cells[colNum].innerHTML.match(/\d+/)[0];

        switch (sortKind) {
            case "asc":
                return a - b;
                break;
            case "desc":
                return b - a;
                break;
            case "default":
                return +rowA.cells[0].innerHTML.match(/\d+/)[0] - +rowB.cells[0].innerHTML.match(/\d+/)[0];
        }
    });

    tbody.append(...rowsArray);
}

function replaceIcon(collection) {
    collection.forEach(i => {
        if (i.classList.contains("fa-sort-amount-up")) {
            i.classList.replace("fa-sort-amount-up", "fa-sort-amount-down-alt");
        } else {
            i.classList.replace("fa-sort-amount-down-alt", "fa-sort-amount-up")
        }
    })
}

function highlightTarget(headers, target) {
    headers.forEach(elem => {
        elem.classList.remove("js-activeColumn")
    })
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