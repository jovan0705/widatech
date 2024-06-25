import {
    SET_INVOICES_LOADING,
    SET_INVOICES_ERROR,
    SET_INVOICES,
    SET_POST_INVOICES_ERROR,
    SET_POST_INVOICES_LOADING
  } from "../actionTypes/index";
  import { baseUrl } from "../../apis/baseUrl";
  import { errorAlert } from "../../helpers/alerts";
  
  const setInvoices = (payload) => {
    return { type: SET_INVOICES, payload };
};

  const setInvoicesError = (payload) => {
    return { type: SET_INVOICES_ERROR, payload };
  };
  
  const setInvoicesLoading = (payload) => {
    return { type: SET_INVOICES_LOADING, payload };
  };

  const setPostInvoicesError = (payload) => {
    return { type: SET_POST_INVOICES_ERROR, payload };
  };
  
  const setPostInvoicesLoading = (payload) => {
    return { type: SET_POST_INVOICES_LOADING, payload };
  };

  export const fetchInvoices = () => {
    return async (dispatch) => {
        dispatch(setInvoicesLoading(true));
        dispatch(setInvoicesError(null));
        try {
            const { data: invoiceList } = await baseUrl.get(`/invoice`);
            dispatch(setInvoices(invoiceList));
            return invoiceList
        } catch (err) {
            dispatch(setInvoicesError(err.message))
            errorAlert(err.message)
        } finally {
            dispatch(setInvoicesLoading(false))
        }
    };
};

export const postInvoice = (data) => {
    return async (dispatch) => {
        dispatch(setPostInvoicesLoading(true));
        dispatch(setPostInvoicesError(null));
        try {
            await baseUrl.post(`/invoice`, data);
        } catch (err) {
            dispatch(setPostInvoicesError(err.message))
            errorAlert(err.message)
        } finally {
            dispatch(setPostInvoicesLoading(false))
        }
    }
}