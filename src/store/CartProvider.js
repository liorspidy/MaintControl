import { useState } from 'react';
import CartContext from './cart-context';

const CartProvider = (props) => {
  const [userDetails, setUserDetails] = useState(null);

  const userHandler = (userDetails) => {
    setUserDetails(userDetails);
  };

  const cartContext = {
    user: userDetails,
    setUser: userHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
