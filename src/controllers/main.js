class RenderView {
    constructor() {
        this.productService = new ProductService();
        this.getListProduct();
        this.productsList = [];
    }

    getEle(id) {
        return document.getElementById(id);
    }

    dataProcessing(data) {
        this.productsList = data;
        this.renderHTML(this.productsList);
    }

    onFilterChange(e) {
        if (!e.value) {
            this.renderHTML(this.productsList);
            return;
        }
        const products = this.productsList.filter(product => {
            return product.type.toLowerCase() === e.value;
        });
        this.renderHTML(products);
    }

    getListProduct() {
        this.productService.getListProductAPI()
          .then((result) => this.dataProcessing(result.data))
          .catch(function (error) {
              console.log(error);
          });

    }

    renderHTML(data) {
        productDetails = data.map(p => {
            return {...p, des: p.desc, heading: p.screen, imageUrl: p.img, qty: 53};
        });
        document.getElementById("app").innerHTML = App();
        loadCarts();
    }
}

const renderView = new RenderView();
