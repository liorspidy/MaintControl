import React from 'react';

const CartContext = React.createContext({
  user: null,
  class: null,
  token: null,
  setToken: (token) => {},
  setUser: (userDetails) => {},
  setClass: (userClass) => {},
});

export default CartContext;
