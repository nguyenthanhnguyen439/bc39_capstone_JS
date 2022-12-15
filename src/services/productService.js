
function ProductService() {
    this.getListProductAPI = function () {
        var promise = axios({
            url: "https://6395af15a68e43e418ee79d1.mockapi.io/Product",
            method: "GET",
        });

        return promise;
    };
}