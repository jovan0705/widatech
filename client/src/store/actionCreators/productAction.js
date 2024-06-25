import {
    SET_PRODUCTS,
    SET_PRODUCTS_ERROR,
    SET_PRODUCTS_LOADING,
  } from "../actionTypes/index";
  import { baseUrl } from "../../apis/baseUrl";
  import { errorAlert } from "../../helpers/alerts";
  
  const setProducts = (payload) => {
    return { type: SET_PRODUCTS, payload };
};

  const setProductsError = (payload) => {
    return { type: SET_PRODUCTS_ERROR, payload };
  };
  
  const setProductsLoading = (payload) => {
    return { type: SET_PRODUCTS_LOADING, payload };
  };

  export const fetchProduct = () => {
    return async (dispatch) => {
        dispatch(setProductsLoading(true));
        dispatch(setProductsError(null));
        try {
            const { data: products } = await baseUrl.get(`/product`);
            dispatch(setProducts(products));
            return products
        } catch (err) {
            dispatch(setProductsError(err.message))
            errorAlert(err.message)
        } finally {
            dispatch(setProductsLoading(false))
        }
    };
};
