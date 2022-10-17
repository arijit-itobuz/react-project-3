import React from 'react';
import StockList from '../Components/StockList';
import StockSearch from '../Components/StockSearch';

export default function StockListPage() {
  return (
    <>
      <section>
        <div className=' my-5'>
          <StockSearch />
        </div>
        <div className='my-2'>
          <StockList />
        </div>
      </section>
    </>
  );
}
