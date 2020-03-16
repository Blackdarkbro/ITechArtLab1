class Order {

    orderId = ElementConstructor.createElementWithClass("span", "orderId");
    createdAt = ElementConstructor.createElementWithClass("span", "createdAt");
    customer = ElementConstructor.createElementWithClass("span", "customer");
    status = ElementConstructor.createElementWithClass("span", "status");
    shippedAt = ElementConstructor.createElementWithClass("time", "shippedAt");

    constructor(id, createdAt, customer, status, shippedAt) {
        this.orderId.textContent = id;
        this.createdAt.textContent = createdAt;
        this.customer.textContent = customer;
        this.status.textContent = status;
        this.shippedAt.textContent = shippedAt;
    }
    createBlock(ParentTagName, ...childs) {

    }
    compileOrder() {
        let section = ElementConstructor.createElementWithClass("section", "order");
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
    productName = ElementConstructor.createElementWithClass("b", "productName");
    productId = ElementConstructor.createElementWithClass("span", "productId");
    currency = ElementConstructor.createElementWithClass("span", "currency");
    price = ElementConstructor.createElementWithClass("b", "price");
    quantity = ElementConstructor.createElementWithClass("span", "quantity");
    totalPrice = ElementConstructor.createElementWithClass("b", "totalPrice");

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

class ShippingAddress {
    span1 = ElementConstructor.createElementWithId("span", "info1");
    span2 = ElementConstructor.createElementWithId("span", "info2");
    span3 = ElementConstructor.createElementWithId("span", "info3");
    span4 = ElementConstructor.createElementWithId("span", "info4");
    span5 = ElementConstructor.createElementWithId("span", "info5");

    constructor(name, address, zip, region, country) {
        this.span1.textContent = name;
        this.span2.textContent = address;
        this.span3.textContent = zip;
        this.span4.textContent = region;
        this.span5.textContent = country;
    }

    compileShippingAddress() {
        let container = ElementConstructor.createElementWithClass("div", "customerInfo");

        let h3 = document.createElement("h3");
        h3.textContent = "Shipping Address";

        let div = document.createElement("div");

        // first line
        let p1 = document.createElement("p");
        let b1 = document.createElement("b");
        b1.textContent = "Name: ";
        let span1 = ElementConstructor.createElementWithId("span", "name");

        p1.append(b1, span1);

        // second line
        let p2 = document.createElement("p");
        let b2 = document.createElement("b");
        b2.textContent = "Street: ";
        let span2 = ElementConstructor.createElementWithId("span", "address");

        p2.append(b2, span2);

        // third line
        let p3 = document.createElement("p");
        let b3 = document.createElement("b");
        b3.textContent = "ZIP code / City: ";
        let span3 = ElementConstructor.createElementWithId("span", "zip");

        p3.append(b3, span1);

        // fourth line
        let p4 = document.createElement("p");
        let b4 = document.createElement("b");
        b4.textContent = "Region: ";
        let span4 = ElementConstructor.createElementWithId("span", "region");

        p4.append(b4, span4);

        // fifth line
        let p5 = document.createElement("p");
        let b5 = document.createElement("b");
        b5.textContent = "Country: ";
        let span5 = ElementConstructor.createElementWithId("span", "country");

        p5.append(b5, span5);

        // finally compile
        div.append(p1, p2, p3, p4, p5);
        container.append(h3, div);

        return container;
    }
}

class CustomerInfo {

}

class ElementConstructor {
    static createElementWithClass(tagName, elemClass) {
        try {
            let element = document.createElement(tagName);
            if (elemClass) element.classList.add(elemClass);

            return element;
        } catch (e) {
            console.error(e.message)
        }
    }
    static createElementWithId(tagName, elemId) {
        try {
            let element = document.createElement(tagName);
            if (elemId) element.id = elemId;

            return element;
        } catch (e) {
            console.error(e.message);
        }
    }
}