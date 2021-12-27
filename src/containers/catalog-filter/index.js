import React, {useCallback, useMemo} from "react";
import useSelector from "../../utils/use-selector";
import useStore from "../../utils/use-store";
import Select from "../../components/select";
import LayoutTools from "../../components/layout-tools";
import Input from "../../components/input";
import { Link } from "react-router-dom";
import { unflat, nestedList} from '../../utils/create-nested-list';

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
      {_id:'key', title: 'По коду'},
      {_id:'title.ru', title: 'По именованию'},
      {_id:'-price', title: 'Сначала дорогие'},
      {_id:'edition', title: 'Древние'},
    ]), [])
  }

  const callbacks = {
    onFilter: useCallback(category => store.catalog.setParams({category}), [store]),
    onSort: useCallback(sort => store.catalog.setParams({sort}), [store]),
    onSearch: useCallback(query => store.catalog.setParams({query, page: 1}), [store]),
    onReset: useCallback(() => store.catalog.resetParams(), [store])
  }
  
  const source = unflat(select.categories);
  const newList = nestedList(source, 0, '-')

  return (
    <LayoutTools>
      <Select onChange={callbacks.onFilter} value={select.category} options={newList}/>
      <Input onChange={callbacks.onSearch} value={select.query} placeholder={'Поиск'} theme="big"/>
      <label>Сортировка:</label>
      <Select onChange={callbacks.onSort} value={select.sort} options={options.sort}/>
      <button onClick={callbacks.onReset}>Сбросить</button>
      <div className='add'><Link to={'/add/'}>Добавить товар</Link></div>
    </LayoutTools>
  );
}

export default React.memo(CatalogFilter);
