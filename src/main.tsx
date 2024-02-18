import ReactDOM from 'react-dom/client';

import App from './App';
import './index.css';

import { Provider } from 'react-redux';
import { persistor, store } from './redux/store';

import { PersistGate } from 'redux-persist/integration/react';

import { SpeedInsights } from '@vercel/speed-insights/next';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <PersistGate persistor={persistor} loading={null}>
      <App />
      <SpeedInsights />
    </PersistGate>
  </Provider>
);
