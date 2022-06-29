import { configureStore, combineReducers } from "@reduxjs/toolkit";
import adminSlice from "./adminSlice";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist' // imports from redux-persist
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import productSlice from "./productSlice";
import userSlice from "./userSlice";

const rootReducer = combineReducers({ admin: adminSlice, products: productSlice, users: userSlice });

const persistConfig = { // configuration object for redux-persist
  key: 'root',
  version: 1,
  blacklist: ['products','users'],
  storage, // define which storage to use
}

const persistedReducer = persistReducer(persistConfig, rootReducer) // create a persisted reducer

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

const persistor = persistStore(store); // used to create the persisted store, persistor will be used in the next step

export { store, persistor }