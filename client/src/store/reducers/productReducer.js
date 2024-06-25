const {
    SET_PRODUCTS,
    SET_PRODUCTS_ERROR,
    SET_PRODUCTS_LOADING,
  } = require("../actionTypes");
  
  const initialState = {
    products: [],
    productsError: null,
    productsLoading: false,
  };
  
  const productReducer = (state = initialState, { type, payload }) => {
    switch (type) {
      case SET_PRODUCTS:
        return {
          ...state,
          products: payload,
        };
      case SET_PRODUCTS_ERROR:
        return {
          ...state,
          productsError: payload,
        };
      case SET_PRODUCTS_LOADING:
        return {
          ...state,
          productsLoading: payload,
        };
      default:
        return state;
    }
  };
  
  export default productReducer
  