import React, { useCallback } from "react";
import Header from "../../containers/header";
import Layout from "../../components/layout";
import EditForm from '../../components/edit-form'; 
import useSelector from "../../utils/use-selector";
import useStore from "../../utils/use-store";
import useInit from "../../utils/use-init";
import Spinner from "../../components/spinner";
import { useParams } from "react-router-dom";


function Edit() {

  const store = useStore();

  const params = useParams();

  useInit(async () => {
    await store.get('article').load(params.articleId)
    await store.get('editForm').load(params.articleId)
    await store.get('countries').load();
    await store.get('categories').load();
  }, [params.articleId]);
 
   
  const select = useSelector(state => ({
    article: state.article.data,
    formData: state.editForm.data,
    waiting:  state.editForm.waiting,
    categories: state.categories.categories,
    countries: state.countries.countries,
    category: state.categories.categories.categoryGood,
    country: state.countries.countries.country,
    error: state.editForm.error,
    errorInfo: state.editForm.errorInfo
  }));
  
  const callbacks = {
    onChange: useCallback((name, value) => store.get('editForm').handleChange(name, value), [store]),
    handleSubmit: useCallback((e) => store.get('editForm').updateArticles(params.articleId, e), [store])
  }

  return (
    <Layout head={<h1>{select.article.title}</h1>}>
      <Header />
      <Spinner active={select.waiting}>
      <EditForm
        data = {select.formData}
        error={select.error}
        errorInfo={select.errorInfo}
        countries={select.countries}
        options={select.categories}
        onChange={callbacks.onChange}
        handleSubmit={callbacks.handleSubmit} />
      </Spinner>
    </Layout>
  );
}

export default React.memo(Edit);