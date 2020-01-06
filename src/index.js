import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { generateStore } from './redux/store';
import './index.css';
import 'font-awesome/css/font-awesome.css';
import App from './App';

let store = generateStore();

let WithStore = () => (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(<WithStore />, document.getElementById('root'));
