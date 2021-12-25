import StoreModule from "../module";

class CountriesStore extends StoreModule {

  /**
   * Начальное состояние
   */
  initState() {
      return {
          countries: [],
          waiting: true
    };
  }

  async load(){

    this.updateState({
      waiting: true,
        countries: [],
    });

    try {
      const response = await fetch('/api/v1/countries?limit=*&fields=_id,title,code&sort=title.ru');
    const json = await response.json();
        
     if (json.error) throw new Error(json.error);
      this.updateState({
        countries: json.result.items,
        waiting: false
      });

    } catch (e){
      this.updateState({
        countries: [],
        waiting: false
      });
    }
  }

}

export default CountriesStore;
