import { combineReducers, configureStore } from '@reduxjs/toolkit';

import videoReducer from './video/slice';
import searchReducer from './search/slice';
import searchTipsReducer from './searchTips/slice';
import commentsReducer from './comments/slice';

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
  video: videoReducer,
  search: searchReducer,
  searchTips: searchTipsReducer,
  comments: commentsReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['searchTips'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
