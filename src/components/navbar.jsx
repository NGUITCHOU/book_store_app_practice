import React from 'react';

import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="nav">
    <ul>
      <h1>Bookstore CMS</h1>
      <li><Link to="/">Books</Link></li>
      <li><Link to="/categories">Category</Link></li>
    </ul>
  </nav>
);
export default Navbar;
