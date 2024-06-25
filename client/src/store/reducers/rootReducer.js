import { combineReducers } from "redux";
import invoiceReducer from "./invoiceReducer";
import productReducer from "./productReducer";

const rootReducer = combineReducers({
  invoiceReducer,
  productReducer
});

export default rootReducer;
