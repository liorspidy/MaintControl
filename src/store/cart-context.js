import React from 'react';

const CartContext = React.createContext({
  user: null,
  setUser: (userDetails) => {},
});

export default CartContext;
