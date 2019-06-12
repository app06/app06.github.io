import React from 'react';
import { Link } from 'react-router-dom';

import './header.css';

const Header = ({ onServiceChange }) => {
  return (
    <div className="header d-flex">
      <h3>
        <Link to="/works/star-db">Star DB</Link>
      </h3>
      <ul className="d-flex">
        <li>
          <Link to="/works/star-db/people/">People</Link>
        </li>
        <li>
          <Link to="/works/star-db/planets/">Planets</Link>
        </li>
        <li>
          <Link to="/works/star-db/starships/">Starships</Link>
        </li>
        <li>
          <Link to="/works/star-db/login">Login</Link>
        </li>
        <li>
          <Link to="/works/star-db/secret">Secret</Link>
        </li>
      </ul>
      <button
          className="btn btn-primary btn-sm"
          onClick={onServiceChange}>
        Change Service
      </button>
    </div>
  );
};

export default Header;
