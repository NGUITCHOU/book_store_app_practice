import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks, removeBook, editBook } from '../bookslice';

import BookInput from './bookInput';

const BookList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBooks());
  });
  const handleEditBook = (id) => {
    dispatch(editBook(id));
  };
  const handleRemoveBook = (id) => {
    dispatch(removeBook(id));
  };
  const books = useSelector((state) => state.books.books);
  const loading = useSelector((state) => state.books.loading);
  const error = useSelector((state) => state.books.error);

  if (loading) {
    return (
      <p>
        Loading...
        {error}
      </p>
    );
  }
  if (error) {
    return (
      <>
        <h2>ADD NEW BOOK</h2>
        <p>
          Error:
          {' '}
          {error}
        </p>
      </>
    );
  }
  return (
    <div className="container">
      <div className="contents">
        <div className="booklist">
          {books.map((book) => (
            <li key={book.id} className="booklist_content">
              <div className="content1">
                <p>
                  {book.category}
                </p>
                <div className="title">
                  <h2>
                    {book.title}
                  </h2>
                  <p className="author">
                    {book.author}
                  </p>
                </div>
                <div className="button">
                  <button type="button">Comments |</button>
                  <button onClick={() => handleRemoveBook(book.id)} type="button" className="one">Remove |</button>
                  <button onClick={() => handleEditBook(book.id)} type="button">Edith</button>
                </div>
              </div>
              <div className="content2">
                <div className="track">
                  <div className="tracking">
                    <div className="rates">
                      <h2>
                        50%
                      </h2>
                      <p>Completed</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="progress">
                <h3>CURRENT CHAPTER</h3>
                <button type="button">UPDATE PROGRESS</button>
              </div>
            </li>
          ))}
        </div>
        <div className="book_input">
          <h2>ADD NEW BOOK</h2>
          <BookInput />
        </div>
      </div>
    </div>
  );
};

export default BookList;
