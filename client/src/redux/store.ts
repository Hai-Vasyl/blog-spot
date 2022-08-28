import { configureStore } from '@reduxjs/toolkit';

import popup from '../components/popup/popup.slice';

export const store = configureStore({
  reducer: {
    popup,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
