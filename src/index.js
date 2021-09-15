import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import itemReducer from './store/itemsReducer';
import foodsReducer from './containers/Foods/reducers';
import productsReducer from './containers/Products/reducers';
import accomodationReducer from './containers/Accomodation/reducers';
import shootReducer from './containers/Photography/reducers';
import thunk from 'redux-thunk';
import cartReducer from './store/cartReducer';
import orderReducer from './store/orderReducer';
import authReducer from './store/authReducer';
import 'bootstrap/dist/css/bootstrap.min.css';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({ 
  foods: foodsReducer,
  products: productsReducer,
  accomodations: accomodationReducer,
  shoots: shootReducer,
  cart: cartReducer,
  order: orderReducer,
  auth: authReducer
})

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)

ReactDOM.render(app, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
