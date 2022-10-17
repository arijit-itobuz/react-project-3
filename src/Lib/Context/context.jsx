import React, { useState, createContext } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [stocksList, setStocksList] = useState([]);

  const addStock = (stockSymbol) => {
    if (stocksList.indexOf(stockSymbol) === -1) {
      // const arr = [...stocksList];
      // arr.unshift(stockSymbol);
      // setStocksList(arr);

      setStocksList([stockSymbol, ...stocksList]);
    }
  };

  const deleteStock = (stockSymbol) => {
    if (stocksList.indexOf(stockSymbol) !== -1) {
      const arr = stocksList.filter((e) => e !== stockSymbol);
      setStocksList(arr);
    }
  };

  return (
    <AppContext.Provider value={{ stocksList, addStock, deleteStock }}>
      {children}
    </AppContext.Provider>
  );
};
