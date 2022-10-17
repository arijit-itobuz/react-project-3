import React, { useState, useEffect, useContext } from 'react';
import { stocksApi } from '../Lib/Api/Stocks/stocks-api';
import { AppContext } from '../Lib/Context/context';

export default function StockSearch() {
  const { addStock } = useContext(AppContext);

  const [search, setSearch] = useState('');
  const [searchFocus, setSearchFocus] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (search !== '') {
      (async () => {
        try {
          const symbolLookupResponse = await stocksApi.symbolLookup(search);
          setSearchResults(symbolLookupResponse.data);
          console.log('symbolLookupResponse', symbolLookupResponse);
        } catch (error) {
          console.log('symbolLookupError', error);
        }
      })();
    } else {
      setSearchResults([]);
    }
  }, [search]);
  return (
    <>
      <section className='container-md'>
        <div className='form-floating position-relative'>
          <input
            type='search'
            id='search'
            className='form-control'
            placeholder='Search Stocks'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setSearchFocus(true)}
            onBlur={() => setSearchFocus(false)}
          />
          <label htmlFor='search'>Search Stocks</label>
          {searchFocus && search !== '' && (
            <span
              className='position-absolute top-0 end-0 fw-light'
              style={{
                fontSize: '0.9rem',
                marginRight: '12px',
                marginTop: '6px',
              }}
            >
              {searchResults.count}
            </span>
          )}
          <ul
            className={`dropdown-menu ${
              searchFocus && searchResults?.result?.length > 0 && search !== ''
                ? 'show'
                : ''
            } mt-2 w-100 overflow-scroll`}
            style={{ height: '300px' }}
          >
            {searchResults?.result?.map((e) => {
              return (
                <li
                  onMouseDown={() => {
                    addStock(e.symbol);
                    setSearchResults([]);
                    setSearch('');
                  }}
                  key={e.symbol}
                  className='dropdown-item'
                  style={{ cursor: 'pointer' }}
                >{`${e.description} (${e.symbol})`}</li>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
}
