import { configureStore } from "@reduxjs/toolkit"
import myIdReducer from "./IdReducer";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
 
// import rootReducer from './reducers'

if (import.meta.env.VITE_NODE_ENV === 'production') {
  console.log("production")
  // window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ = undefined;
}

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}
const persistedReducer = persistReducer(persistConfig, myIdReducer)


export const store = configureStore({
    reducer: { Id : persistedReducer },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
    devTools: import.meta.env.VITE_NODE_ENV !== 'production',
})
// const store = createStore(persistedReducer)
export const Persistor = persistStore(store)