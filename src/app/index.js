import React from 'react';
import Main from "./main";
import Basket from "./basket";
import Product from './product';
import useSelector from "../utils/use-selector";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { routes } from 'routes';
/**
 * Приложение
 */
function App() {

  const select = useSelector(state => ({
    name: state.modals.name
  }));
  
  const { main, productId } = routes;

  return (
    <Router>
      <>
      <Routes>
        <Route
          exact={true} path={main}
          element={<Main />
          }
        />
        <Route path={main}
          element={ <Basket />}
          /> 
        <Route path={productId}
          element={<Product/>}
        />
        <Route path="*" element={
        <main style={{ padding: "1rem" }}>
          <p>There's nothing here!</p>
        </main>
      } />
          
      </Routes>
       {select.name === 'basket' && <Basket />}
       </>
    </Router>
  );
}

export default React.memo(App);
