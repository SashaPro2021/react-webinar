import StoreModule from "../module";

class CategoriesStore extends StoreModule {

  /**
   * Начальное состояние
   */
  initState() {
      return {
        categories: [],
        list: [],
        waiting: true
    };
  }

  async load(){

    this.updateState({
      waiting: true,
        categories: [],
    });

    try {
      const response = await fetch(`/api/v1/categories?limit=*&fields=_id,parent,title`);
      const json = await response.json();
      const elem = {
      "_id": '',
      "parent": null,
      "title": "Все"
    }
      console.log(json.result.items)
      console.log('!!!')
     if (json.error) throw new Error(json.error);
      this.updateState({
        categories: [elem, ...json.result.items],
        waiting: false
      });
    } catch (e){
      this.updateState({
        categories: [],
        waiting: false
      });
    }
  }
}

export default CategoriesStore;
