import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";


import authReducer from "./slices/Auth";
import adminReducer from "./slices/Admin";
import clientReducer from "./slices/Client";
import tokenReducer from "./slices/AuthToken";

const reducers = combineReducers({
  auth: authReducer,
  admin: adminReducer,
  client: clientReducer
});

const persistConfig = {
  key: "root",
  storage
};

const persistReducers = combineReducers({
  token: tokenReducer
});

const persists = persistReducer(persistConfig, persistReducers);

const reducer = combineReducers({
  reducers,
  persists
});

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export default store;