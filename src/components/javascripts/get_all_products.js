
function fetch_products() {
    var table = document.createElement("table");
    var tr = document.createElement("tr");
    var th = document.createElement("th");

    fetch("http://127.0.0.1:3000/all_products")
        .then((response) => response.json())
        .then((products) => {
            for (const product of products) {
                console.log(product.name);

                add_product_to_web(product)
            }
        }
        )
}

fetch_products()