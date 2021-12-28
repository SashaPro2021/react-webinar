import StoreModule from "../module";

class EditFormStore extends StoreModule {

  /**
   * Начальное состояние
   */
  initState() {
    return {
      data: {},
      formData: {
        title: '',
        description: '',
        edition: 0,
        price: 0,
        country: '',
        categoryGood: ''
      },
      waiting: true, 
      error: '',
      errorInfo: []
    };
  }

  /**
   * Загрузка списка товаров
   */
  async load(id){

    this.updateState({
      data: {},
      waiting: true,
    });
   
    try {
      const response = await fetch(`/api/v1/articles/${id}?fields=*,maidIn(title,code),category(title)`);
        const json = await response.json();

      if (json.error) {throw new Error(json.error);} 
        
       
      this.updateState({
        data: json.result,
        formData: { ...json.result, country: json.result.maidIn?._id, categoryGood: json.result.category?._id},
        waiting: false
      });
    
    } catch (e){
      this.updateState({
        waiting: false
      });
    }
  }

  handleChange = (name, value)  => {
     this.updateState({
       formData: ({ ...this.getState().formData, [name]: value })
     })
  }

  async updateArticles(id, e) {

     e.preventDefault();
    
      this.updateState({
        error: '',
        waiting: true,
    });
    const obj = {
      'title': this.getState().formData.title,
      'description': this.getState().formData.description,
      'maidIn': {
          '_id': this.getState().formData.country
      },
      'category': {
          '_id': this.getState().formData.categoryGood
      },
      'edition': this.getState().formData.edition,
      'price': this.getState().formData.price  
    }
  
    try {
    const res = await fetch(`/api/v1/articles/${id}`, {
      method: 'PUT',
      headers: {
      'Content-Type': 'application/json'
    },
      body: JSON.stringify(obj)
    });
      const json = await res.json();
      
      if (json.error) {
        this.updateState({
              error: json.error?.message,
              errorInfo: json.error.data.issues,
            })
        
        throw new Error(json.error);
      } 
      this.updateState({
        data: {...this.getState().data, ...this.getState().formData},
        waiting: false
      })

    } catch (error) {
      this.updateState({
          waiting: false
      })
    } 
        
  }

}
export default EditFormStore;