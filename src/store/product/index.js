import StoreModule from "../module";

class ProductStore extends StoreModule {

    initState() {
        return {
            item: {},
        };
    }

    async getProduct(id) {
        const response = await fetch(`api/v1/articles/${id}?fields=*,maidIn(title,code),category(title)`);
        const json = await response.json();
        this.setState({
            item: { ...json.result }
        });
    }
}
export default ProductStore;