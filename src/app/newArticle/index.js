import React, {useCallback} from "react";
import Layout from "../../components/layout";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import Header from "../../containers/header";
import useInit from "../../utils/use-init";
import FormAddArticle from '../../components/form-add-atricle';

function NewArticle() {

  const store = useStore();
  
  // Начальная загрузка
  useInit(async () => {
    await store.get('countries').load();
    await store.get('categories').load();
  }, []);

    const select = useSelector(state => ({
    newArticle: state.article.newData,
    waiting:  state.editForm.waiting,
    categories: state.categories.categories,
    countries: state.countries.countries,
    error: state.article.error,
    errorInfo: state.article.errorInfo,
  }));

  const callbacks = {
     handleChange: useCallback((e) => store.get('article').handleChange(e), [store]),
     handleSubmit: useCallback((e) => store.get('article').createArticle(e), [store])
  }

  return (
    <Layout >

      <Header/>
         <FormAddArticle
        data={select.newArticle}
        countries={select.countries}
        options={select.categories}
        handleChange={callbacks.handleChange}
        handleSubmit={callbacks.handleSubmit}
        error={select.error}
        errorInfo={select.errorInfo}
        />
    </Layout>
  );
}

export default React.memo(NewArticle);

 