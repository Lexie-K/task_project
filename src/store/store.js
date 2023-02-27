import { configureStore, ConfigureStoreOptions } from '@reduxjs/toolkit';
import postsReducer from './postSlice';
import modalReducer from './modalSlice';

export const createStore = options =>
  configureStore({
    reducer: {
      posts: postsReducer,
      modal: modalReducer,
    },
  });

export const store = createStore();
export default store;
