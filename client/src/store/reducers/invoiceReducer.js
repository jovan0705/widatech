const {
  SET_INVOICES,
  SET_INVOICES_ERROR,
  SET_INVOICES_LOADING,
} = require("../actionTypes");

const initialState = {
  invoices: [],
  invoicesError: null,
  invoicesLoading: false,
};

const invoiceReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_INVOICES:
      return {
        ...state,
        invoices: payload,
      };
    case SET_INVOICES_ERROR:
      return {
        ...state,
        invoicesError: payload,
      };
    case SET_INVOICES_LOADING:
      return {
        ...state,
        invoicesLoading: payload,
      };
    default:
      return state;
  }
};

export default invoiceReducer
