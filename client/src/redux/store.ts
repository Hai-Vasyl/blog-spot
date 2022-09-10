import { configureStore } from '@reduxjs/toolkit';

import popup from '../components/popup/popup.slice';
import auth from '../components/auth/auth.slice';

export const store = configureStore({
  reducer: {
    popup: popup.reducer,
    auth: auth.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
