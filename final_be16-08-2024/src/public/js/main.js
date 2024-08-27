const socket = io();

socket.on("products", (data) => {
    renderProducts(data);
})

const renderProducts = (products) => {
    const productContainer = document.getElementById("productContainer");
    productContainer.innerHTML = "";

    products.forEach(item => {
        const card = document.createElement("div");
        card.innerHTML = `
                            <p> ID: ${item.id} </p>
                            <p> Titulo:  ${item.title} </p>
                            <p> Precio: ${item.price} </p>
                            <button> Eliminar producto </button>
                        `;
        productContainer.appendChild(card);

        card.querySelector("button").addEventListener("click", () => {
            deleteProduct(item.id)
        })
    })
}

const deleteProduct = (id) => {
    socket.emit("deleteProduct", id);
}

document.getElementById("btnSend").addEventListener("click", () => {
    addProduct();
    form.reset();
})

const addProduct = () => {
    const product = {
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        price: document.getElementById("price").value,
        thumbnail: document.getElementById("thumbnail").value,
        code: document.getElementById("code").value,
        stock: document.getElementById("stock").value,
    }
    socket.emit("addProduct", product)
}