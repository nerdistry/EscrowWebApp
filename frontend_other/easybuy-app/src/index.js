import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import { MoralisProvider } from 'react-moralis';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
 <Provider store={store}>
  <MoralisProvider initializeOnMount={false} >
       <App />

</MoralisProvider>
  </Provider>
);


