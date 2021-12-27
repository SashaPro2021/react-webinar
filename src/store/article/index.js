import StoreModule from "../module";

class ArticleStore extends StoreModule {

  /**
   * Начальное состояние
   */
  initState() {
    return {
      data: {},
      newData: {
      "isNew": true,
        "name": '',
        "title": '',
        "description": '',
        "price": 0,
        "maidIn": {
            "_id": ''
        },
        "edition": 0,
        "category": {
            "_id":''
        }
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
      data: {}
    });

    try {
      const response = await fetch(`/api/v1/articles/${id}?fields=*,maidIn(title,code),category(title)`);
      const json = await response.json();
      if (json.error) throw new Error(json.error);

      this.updateState({
        data: json.result,
        waiting: false
      });

    } catch (e){
      this.updateState({
        data: {},
        waiting: false
      });
    }
  }

   handleChange = (name, value)  => {
     this.updateState({
       newData: ({ ...this.getState().newData, [name]: value })
     })
  }
  
  async createArticle(e) {
    e.preventDefault();
     this.updateState({
        error: '',
        errorInfo: []
    });

    try {
      const state = this.getState()
      const obj = {
        "isNew": state.newData.isNew,
        "name": state.newData.name,
        "title": state.newData.title,
        "description": state.newData.description,
        "price": state.newData.price,
        "maidIn": {
            "_id": state.newData.maidIn
        },
        "edition": state.newData.edition,
        "category": {
            "_id":state.newData.category
        }
      }
      
    const response = await fetch(`/api/v1/articles`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj)
      });
      
      const json = await response.json();

      if (json.error) {
        this.updateState({
          error: json.error?.message,
          errorInfo: json.error.data.issues,
        })
            
        throw new Error(json.error);
      } 

    } catch (e){
      this.updateState({
        newData: {},
      });
    }
  }
}

export default ArticleStore;
