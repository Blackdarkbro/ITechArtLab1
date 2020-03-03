// defoult inner page
addAllOrders();
pasteInfoIntoPage(Orders[0].id);
addProducts(Orders[0].id);

const ordersNumber = document.getElementById('ordersNumber');
ordersNumber.textContent = Orders.length;

const documentOrders = document.querySelectorAll('.order');


// light active order
documentOrders.forEach(elem => {

    elem.addEventListener('click', (event) => {
        let targent = event.currentTarget;

        documentOrders.forEach(oo => {

            oo.style.background = "rgba(226, 238, 248, 0)"
        })
        targent.style.background = "rgb(226, 238, 248)";
    });
});