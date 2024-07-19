const initialState = {
  cartItems: 0,
  totalPrice: 0,
  cartData: {},
  openCategoryMenu: false,
};

const cartReducer = (
  state = initialState,
  action: { type: string; payload: string }
) => {
  switch (action.type) {
    case 'addItem':
      return { ...state, cartItems: state.cartItems + action.payload };
    case 'setCartItems':
      return { ...state, cartItems: action.payload };
    case 'setTotalPrice':
      return { ...state, totalPrice: action.payload };
    case 'setCartData':
      return { ...state, cartData: action.payload };
    case 'setOpenCategoryMenu':
      return { ...state, openCategoryMenu: action.payload };
    default:
      return state;
  }
};

export default cartReducer;
