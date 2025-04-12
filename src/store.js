import { configureStore } from '@reduxjs/toolkit';

import bookSlice from './bookslice';

const store = configureStore({
  reducer: {
    books: bookSlice,

  },
});

export default store;
