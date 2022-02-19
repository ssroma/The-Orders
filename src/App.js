import React, {useState} from 'react';

import Header from './components/Layout/Header/Header';
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart';
import CartProvider from './Store/cart-provider';

function App() {
  const [cartShowing, setCartShowing] = useState(false);

  const showCartHandler = () => {
    setCartShowing(true);
    const body = document.querySelector('body');
          body.style.overflow = 'hidden'
  }

  const hideCartHandler = () => {
    setCartShowing(false);
    const body = document.querySelector('body');
          body.style.overflow = 'auto'
  }
  
  return (
    <CartProvider>
      <Header onShowCart={showCartHandler}/>
      <main>
        <Meals />
      </main>
      { cartShowing && <Cart onHideCart={hideCartHandler} /> }
    </CartProvider>
  );
}

export default App;
