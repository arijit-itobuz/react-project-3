import React, { useState } from 'react';

export default function StockSearch() {
  const [search, setSearch] = useState('');

  return (
    <>
      <section className='container-md'>
        <div className='form-floating'>
          <input
            type='search'
            id='search'
            className='form-control'
            placeholder='Search'
            defaultValue={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <label htmlFor='search'>Search</label>
          <ul
            className={`dropdown-menu ${
              search !== '' ? 'show' : ''
            } mt-1 w-100`}
          >
            <li className='dropdown-item'>Stock 1</li>
            <li className='dropdown-item'>Stock 1</li>
            <li className='dropdown-item'>Stock 1</li>
            <li className='dropdown-item'>Stock 1</li>
          </ul>
        </div>
      </section>
    </>
  );
}
