import React, {useState, useCallback, useEffect} from "react";
import Item from "../../components/item";
import Layout from "../../components/layout";
import BasketSimple from "../../components/basket-simple";
import List from "../../components/list";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import Pagination from '../../components/pagination';

function Main() {
  // const [currentPage, setCurrentPage] = useState(1);
  // const [skip, setSkip] = useState(0);

  const select = useSelector(state => ({
    items: state.catalog.items,
    // skip: state.catalog.skip,
    currentPage: state.catalog.currentPage,
    limit: state.catalog.limit,
    count: state.catalog.count,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  const store = useStore();

  // Загрузка тестовых данных при первом рендере
  useEffect(async () => {
    await store.catalog.load(select.currentPage);
  }, [select.currentPage]);

  const callbacks = {
    addToBasket: useCallback((_id) => store.basket.add(_id), [store]),
    openModal: useCallback(() => store.modals.open('basket'), [store]),
    paginate: useCallback((page) => {
      //  setCurrentPage(number),
      store.catalog.load(page);
      //  setSkip((number - 1) * select.limit)
    } , [store]
    ),
  }


  const renders = {
    item: useCallback(item => {
      return <Item item={item} onAdd={callbacks.addToBasket}/>
    }, [callbacks.addToBasket]),
  }

  
  return (
  
      <Layout head={<h1>Магазин</h1>}>
        <BasketSimple onOpen={callbacks.openModal} amount={select.amount} sum={select.sum}/>
        <List items={select.items} renderItem={renders.item} />
        <Pagination limit={select.limit} count={select.count} paginate={callbacks.paginate} currentPage={select.currentPage}/>
      </Layout>
  );
}

export default React.memo(Main);