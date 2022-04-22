import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { Provider } from 'react-redux';
import { configureStore } from './redux/store';
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { createTheme, ThemeProvider } from '@mui/material';

const store = configureStore();
const persistor = persistStore(store)
const theme = createTheme({
  typography:{
    fontFamily:'SUIT-Medium'
  }
})
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme = {theme}>
          <App />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
