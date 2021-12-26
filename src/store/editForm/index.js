import StoreModule from "../module";

class EditFormStore extends StoreModule {

  /**
   * Начальное состояние
   */
  initState() {
    return {
      data: {
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
      waiting: true,
       data: {
        country: '',
        categoryGood: ''
      }
    });
   
    try {
      const response = await fetch(`/api/v1/articles/${id}?fields=*,maidIn(title,code),category(title)`);
        const json = await response.json();

      if (json.error) {throw new Error(json.error);} 
        
       
      this.updateState({
        data: { ...json.result, country: json.result.maidIn?._id, categoryGood: json.result.category?._id},
        waiting: false
      });
    
    } catch (e){
      this.updateState({
        waiting: false
      });
    }
  }

  handleChange = (e)  => {
      const { name, value } = e.target;

      const formData = ({ ...this.getState().data, [name]: value });
      
     this.updateState({
       data: formData
     })
    }

    async updateArticles(id, e) {

     e.preventDefault();
    
    this.updateState({
        error: '',
        waiting: true,
    });
      const obj = {
        'title': this.getState().data.title,
        'description': this.getState().data.description,
        'maidIn': {
            '_id': this.getState().data.country
        },
        'category': {
           '_id': this.getState().data.categoryGood
       },
        'edition': this.getState().data.edition,
        'price': this.getState().data.price  
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