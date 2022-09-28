import {configureStore} from '@reduxjs/toolkit';
import videoSlice from './slices/videoSlice';
export const store = configureStore({
  reducer: {
    videoSlice: videoSlice,
  },
});
