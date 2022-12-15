
var productService = new ProductService();

function getEle(id) {
    return document.getElementById(id);
}

function getListProduct() {
    var promise = productService.getListProductAPI();
    promise
        .then(function (result) {
            console.log(result.data);
            renderHTML(result.data);

        })
        .catch(function (error) {
            console.log(error);
        });

}

getListProduct();
function renderHTML(data) {
    var content = "";
    data.forEach(function (product) {
        content += `
        <div class="card">
        <div class="card_above">
            <div class="card_top">
                <i class="fa-brands fa-apple"></i>
                <em>In Stock</em>
            </div>
            <div class="card-img-top">
                <img src="${product.img}" alt="">
            </div>
        </div>
        <div class="card_hover">
            <div class="card-body">
                <div class="card-title">
                    <div>${product.name}</div>
                    <div class="card_heart"><i class="fa-solid fa-heart"></i></div>
                </div>
                <p class="card-text">${product.desc}</p>
            </div>
            <div class="card_content">
                Màn hình : ${product.screen}
            </div>
            <div class="card_bottom">
                <div class="priceDevices">${product.price}</div>
                <button>Add <i class="fa-solid fa-angle-right"></i></button>
            </div>
        </div>
    </div>
    `
    });
    getEle("productItem").innerHTML = content;
}