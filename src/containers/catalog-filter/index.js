import React, {useCallback, useMemo} from "react";
import useSelector from "../../utils/use-selector";
import useStore from "../../utils/use-store";
import Select from "../../components/select";
import LayoutTools from "../../components/layout-tools";
import Input from "../../components/input";
import SelectCategory from '../../components/select-category';
import {Link} from "react-router-dom";

function CatalogFilter() {

  const store = useStore();

  const select = useSelector(state => ({
    categories: state.categories.categories,
    category: state.catalog.params.category,
    sort: state.catalog.params.sort,
    query: state.catalog.params.query,
  }));

  // Опции для полей
  const options = {
    sort: useMemo(() => ([
      {value:'key', title: 'По коду'},
      {value:'title.ru', title: 'По именованию'},
      {value:'-price', title: 'Сначала дорогие'},
      {value:'edition', title: 'Древние'},
    ]), [])
  }

  const callbacks = {
    onFilter: useCallback(category => store.catalog.setParams({category}), [store]),
    onSort: useCallback(sort => store.catalog.setParams({sort}), [store]),
    onSearch: useCallback(query => store.catalog.setParams({query, page: 1}), [store]),
    onReset: useCallback(() => store.catalog.resetParams(), [store])
  }

  return (
    <LayoutTools>
      <SelectCategory  onChange={callbacks.onFilter} value={select.category} options={select.categories}/>
      <Input onChange={callbacks.onSearch} value={select.query} placeholder={'Поиск'} theme="big"/>
      <label>Сортировка:</label>
      <Select onChange={callbacks.onSort} value={select.sort} options={options.sort}/>
      <button onClick={callbacks.onReset}>Сбросить</button>
      <div className='add'><Link to={'/add/'}>Добавить товар</Link></div>
    </LayoutTools>
  );
}

export default React.memo(CatalogFilter);
