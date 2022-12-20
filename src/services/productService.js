
function ProductService() {
    this.getListProductAPI = function () {
        return axios({
            url: "https://6395af15a68e43e418ee79d1.mockapi.io/Product",
            method: "GET",
        });
    };
}
