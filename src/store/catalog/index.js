import StoreModule from "../module";

class CatalogStore extends StoreModule {
  /**
   * Начальное состояние
   */
  initState() {
    return {
      items: [],
      limit: 10,
      count: 0,
    };
  }
  
  /**
   * Загрузка списка товаров
   */
  async load(skip){
    const response = await fetch(`api/v1/articles?&limit=${this.getState().limit}&skip=${skip}&fields=items(*),count`);
    const json = await response.json();
    const limit = this.getState().limit
    this.setState({
      items: json.result.items,
      count: json.result.count,
      limit
    });
  }
}

export default CatalogStore;

