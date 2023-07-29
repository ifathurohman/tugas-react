import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {drawerReducer} from './reducers/drawer';
import {composeWithDevTools} from 'redux-devtools-extension';

// Reducers
import {userReducer} from './reducers/userReducer';
import {
  getProductsReducer,
  getProductDetailsReducer,
} from './reducers/productReducers';
import { wilayahReducer } from './reducers/wilayahReducers';
import { shippingReducer } from './reducers/shipping';

const reducer = combineReducers({
  wilayah: wilayahReducer,
  shipping: shippingReducer,
  drawer: drawerReducer,
  user: userReducer,
  getProducts: getProductsReducer,
  getProductDetails: getProductDetailsReducer,
});

const middleware = [thunk];

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;
