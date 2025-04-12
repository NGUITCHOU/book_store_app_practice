import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';

const apiKey = 'm4EwBGqXI281WdinvzcP';

// Initial state for books
const initialState = {
  books: [],
  loading: false,
  error: null,
};

// Async thunk to fetch books from the API
export const fetchBooks = createAsyncThunk('books/fetchBooks', async () => {
try{
  const response = await fetch(`https://us-central1-bookstore-api-e63c8.cloudfunctions.net/bookstoreApi/apps/${apiKey}/books`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch books');
  }else{
    const res = await response.json();

   const flatObject = Object.entries(res).flatMap(([id, books]) => books.map((book) => {
    console.log(book, id);
    const bookProp = {
      id,
      title: book.title,
      author: book.author,
      category: book.category
    };

    return bookProp;
  }));

return flatObject;
  }
  
}catch{
  console.log('unable to fetch books from the API');
  return [];
}
});

export const postBook = createAsyncThunk('books/addBook', async (book) => {
try{
  const response = await fetch(`https://us-central1-bookstore-api-e63c8.cloudfunctions.net/bookstoreApi/apps/${apiKey}/books`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(book),
  });
  if (!response.ok) {
    throw new Error('Failed to postBook book');
  }
}catch{
  console.log('unable to postbook with your big head');
}
});

export const editBook = createAsyncThunk('books/editBook', async (book) => {
  const response = await fetch(`https://us-central1-bookstore-api-e63c8.cloudfunctions.net/bookstoreApi/apps/${apiKey}/${book.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title: book.title, author: book.author, category: book.category }),
  });
  if (!response.ok) {
    throw new Error('Failed to edit book');
  }
  return book;
});

export const removeBook = createAsyncThunk('books/removeBook', async (id) => {
  const response = await fetch(`https://us-central1-bookstore-api-e63c8.cloudfunctions.net/bookstoreApi/apps/${apiKey}/books/${id}`, {
    method: 'DELETE',
    headers:{
      'Content-type':'application/json'
    }
  });
  if (!response.ok) {
    throw new Error('Failed to remove book');
  }
  return id;
});

export const bookSlice = createSlice({
  name: 'books',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.books = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

      builder
      .addCase(postBook.pending, (state)=>{
        state.loading = true;
        state.error = null
      })
      .addCase(postBook.fulfilled, (state, action)=>{
        state.pending = false;
        state.books = [...state, action.payload];
        state.error = '';
      })
      .addCase(postBook.rejected, (state, action)=>{
        state.loading = false;
        state.error = action.error.message
      });

      builder
      .addCase(removeBook.pending, (state)=>{
        state.loading = false;
        state.error = null
      })
      .addCase(removeBook.fulfilled, (state, action)=>{
        state.loading = false;
        state.books = state.books.filter((book)=> book.id !== action.payload)
      })
      .addCase(removeBook.rejected, (state,action)=>{
        state.loading = false;
        state.error = action.error.message
      })
  },
});

export default bookSlice.reducer;
