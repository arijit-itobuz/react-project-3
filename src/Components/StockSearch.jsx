import React, { useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import { stocksApi } from '../Lib/Api/Stocks/stocks-api';
import { AppContext } from '../Lib/Context/context';

export default function StockSearch() {
  const { stocksList, addStock } = useContext(AppContext);

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
            autoComplete='off'
          />
          <label htmlFor='search'>Search Stocks</label>
          {searchFocus && search !== '' && (
            <span className='position-absolute top-0 end-0 fw-light search-result-count'>
              {searchResults.count}
            </span>
          )}
          <ul
            className={`dropdown-menu mt-2 w-100 overflow-scroll ${
              searchFocus && searchResults?.result?.length > 0 && search !== ''
                ? 'show'
                : ''
            } `}
          >
            {searchResults?.result?.map((e) => {
              return (
                <li
                  onMouseDown={() => {
                    if (stocksList.indexOf(e.symbol) === -1) {
                      addStock(e.symbol);
                      setSearchResults([]);
                      setSearch('');
                      toast.success('Stock added successfully');
                    } else {
                      toast.warning('Stock already added');
                    }
                  }}
                  key={e.symbol}
                  className='dropdown-item'
                >{`${e.description} (${e.symbol})`}</li>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
}
