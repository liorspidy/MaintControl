import { useState } from 'react';
import CartContext from './cart-context';

const CartProvider = (props) => {
  const [userDetails, setUserDetails] = useState(null);
  const [userClassDetails, setUserClassDetails] = useState(null);
  const [tokenDetails, setTokenDetails] = useState(null);

  const userHandler = (userDetails) => {
    setUserDetails(userDetails);
  };

  const tokenHandler = (token) => {
    setTokenDetails(token);
  };

  const userClassHandler = (userClassDetails) => {
    setUserClassDetails(userClassDetails);
  };

  const cartContext = {
    user: userDetails,
    class: userClassDetails,
    token: tokenDetails,
    setUser: userHandler,
    setToken: tokenHandler,
    setClass: userClassHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
