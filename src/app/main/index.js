import React, {useState, useCallback, useEffect} from "react";
import Item from "../../components/item";
import Layout from "../../components/layout";
import BasketSimple from "../../components/basket-simple";
import List from "../../components/list";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import Pagination from '../../components/pagination';
import DetailsProduct from '../../components/detailsProduct';

import { Routes, Route } from 'react-router-dom';
import { routes } from 'routes';

function Main() {
  const [currentPage, setCurrentPage] = useState(1);
  const [skip, setSkip] = useState(0);

  const select = useSelector(state => ({
    items: state.catalog.items,
    skip: state.catalog.skip,
    limit: state.catalog.limit,
    count: state.catalog.count,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  // Загрузка тестовых данных при первом рендере
  useEffect(async () => {
    await store.catalog.load(skip);
  }, [skip]);

  const store = useStore();

  const callbacks = {
    addToBasket: useCallback((_id) => store.basket.add(_id), [store]),
    openModal: useCallback(() => store.modals.open('basket'), [store]),
    paginate: useCallback((number) => {
       setCurrentPage(number),
       setSkip((number - 1) * select.limit)
    } , [currentPage, skip]
    ),
  }


  const renders = {
    item: useCallback(item => {
      return <Item item={item} onAdd={callbacks.addToBasket}/>
    }, [callbacks.addToBasket]),
  }

  const { main, productId } = routes;
  
  return (
    <Routes>
      <Route exact={true} path={main}
        element={
      <Layout head={<h1>Магазин</h1>}>
        <BasketSimple onOpen={callbacks.openModal} amount={select.amount} sum={select.sum}/>
        <List items={select.items} renderItem={renders.item} />
            <Pagination limit={select.limit} count={select.count} paginate={callbacks.paginate} currentPage={currentPage}/>
      </Layout>} />
       && <Route path={productId}
          element={ 
            <DetailsProduct onAdd={callbacks.addToBasket} onOpen={callbacks.openModal} amount={select.amount} sum={select.sum}/>
          }
      />
        {/* {select.items && 
         <Route path={productId}
          render={({match}) => (
            
            <DetailsProduct id = {select.items.find(item => item._id === match.params.id)}/>
          )}
      />
        } */}
      <Route path="*" element={
        <main style={{ padding: "1rem" }}>
          <p>There's nothing here!</p>
        </main>
      }/>
        </Routes>

  );
}

export default React.memo(Main);