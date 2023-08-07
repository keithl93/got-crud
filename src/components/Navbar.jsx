import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className='container'>
      <div className='item1'>GoT</div>

      <Link to='/' className='item'>
        Home
      </Link>
      <Link to='/characters' className='item'>
        Characters
      </Link>
      <Link to='/add-character' className='item'>
        Add New Character
      </Link>
    </nav>
  );
}
