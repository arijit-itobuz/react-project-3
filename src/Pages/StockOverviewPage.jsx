import React from 'react';
import StockList from '../Components/StockList';
import StockSearch from '../Components/StockSearch';

export default function StockOverviewPage() {
  return (
    <>
      <div>
        <StockSearch />
        <StockList />
      </div>
    </>
  );
}
