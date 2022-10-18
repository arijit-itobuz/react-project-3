import React, { useState, createContext } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [stocksList, setStocksList] = useState(
    localStorage.getItem('open-stocks-stockList') !== null
      ? JSON.parse(localStorage.getItem('open-stocks-stockList'))
      : []
  );

  const addStock = (stockSymbol) => {
    if (stocksList.indexOf(stockSymbol) === -1) {
      // const arr = [...stocksList];
      // arr.unshift(stockSymbol);
      // setStocksList(arr);
      
      const arr = [stockSymbol, ...stocksList];
      setStocksList(arr);
      localStorage.setItem('open-stocks-stockList', JSON.stringify(arr));
    }
  };

  const deleteStock = (stockSymbol) => {
    if (stocksList.indexOf(stockSymbol) !== -1) {
      const arr = stocksList.filter((e) => e !== stockSymbol);
      setStocksList(arr);
      localStorage.setItem('open-stocks-stockList', JSON.stringify(arr));
    }
  };

  return (
    <AppContext.Provider value={{ stocksList, addStock, deleteStock }}>
      {children}
    </AppContext.Provider>
  );
};
