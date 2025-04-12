import React, { useState } from 'react';

import { useDispatch } from 'react-redux';

import { v4 as uuidv4 } from 'uuid';
import { postBook } from '../bookslice';

const BookInput = () => {
  const dispatch = useDispatch();
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const HandleAddBook = () => {
    if (category === '' || author === '' || title === '') {
      alert('empty forms can be submmited');
    } else {
      const book = {
        item_id: uuidv4(),
        author,
        title,
        category,
      };

      dispatch(postBook(book));
    }
  };

  return (
    <form>

      <input
        type="text"
        id="title"
        placeholder="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <input
        type="text"
        id="author"
        placeholder="author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        required
      />

      <select name="" id="" onChange={(e) => setCategory(e.target.value)}>
        <optgroup>
          <option value="Fiction">Fiction</option>
          <option value="Economy">Economy</option>
          <option value="Name">Name</option>
          <option value="WorkBook">WorkBook</option>
          <option value="Math">Math</option>
        </optgroup>
      </select>
      <button type="button" onClick={() => HandleAddBook()}>Add Book</button>
    </form>
  );
};

export default BookInput;
