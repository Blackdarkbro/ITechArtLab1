class Order {

    orderId = Order.createElement("span", "orderId");
    createdAt = Order.createElement("span", "createdAt");
    customer = Order.createElement("span", "customer");
    status = Order.createElement("span", "status");
    shippedAt = Order.createElement("time", "shippedAt");

    constructor(id, createdAt, customer, status, shippedAt) {
        this.orderId.textContent = id;
        this.createdAt.textContent = createdAt;
        this.customer.textContent = customer;
        this.status.textContent = status;
        this.shippedAt.textContent = shippedAt;
    }

    static createElement(tagName, elemClass) {
        let element = document.createElement(tagName);
        element.classList.add(elemClass);

        return element;
    }

    compileOrder() {
        let section = Order.createElement("section", "order");
        section.dataset.id = "";

        // first div
        let div1 = document.createElement("div");

        let h4 = document.createElement("h4");

        h4.textContent = "Order ";

        h4.appendChild(this.orderId);
        div1.append(h4, this.createdAt);

        // second div
        let div2 = document.createElement("div");
        div2.append(this.customer, this.status);

        // third div
        let div3 = document.createElement("div");
        let span = document.createElement("span");
        span.textContent = "Shipped ";

        span.appendChild(this.shippedAt);
        div3.appendChild(span);

        // finally compile
        section.append(div1, div2, div3);

        return section;
    }
}

class TableRow {
    productName = Order.createElement("b", "productName");
    productId = Order.createElement("span", "productId");
    currency = Order.createElement("span", "currency");
    price = Order.createElement("b", "price");
    quantity = Order.createElement("span", "quantity");
    totalPrice = Order.createElement("b", "totalPrice");

    constructor(productId, productName, price, currency, quantity, totalPrice) {
        this.productName.textContent = productName;
        this.productId.textContent = productId;
        this.currency.textContent = currency;
        this.price.textContent = price + " ";
        this.quantity.textContent = quantity;
        this.totalPrice.textContent = totalPrice + " ";
    }

    compileRow() {
        let row = document.createElement("tr");

        // create first td
        let firstTd = document.createElement("td");
        let br = document.createElement("br");

        let span1 = document.createElement("span");
        span1.textContent = "Product:";

        firstTd.append(span1, this.productName, br, this.productId);

        // create second td
        let secondTd = document.createElement("td");
        let span2 = document.createElement("span");

        span2.textContent = "Unit Price:";
        let cloneCurrency = this.currency.cloneNode(true);

        secondTd.append(span2, this.price, cloneCurrency);

        // created third td
        let thirdTd = document.createElement("td");
        let span3 = document.createElement("span");

        span3.textContent = "Quantity:";

        thirdTd.append(span3, this.quantity);

        // create fourth td
        let fourthTd = document.createElement("td");
        let span4 = document.createElement("span");

        span4.textContent = "Total:";

        fourthTd.append(span4, this.totalPrice, this.currency);

        // finally compile
        row.append(firstTd, secondTd, thirdTd, fourthTd);

        return row;
    }
}