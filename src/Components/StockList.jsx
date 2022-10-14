import React, { useState, useEffect } from 'react';
import { stocksApi } from '../Lib/Api/Stocks/stocks-api';
import CaretUpIcon from '../Icons/CaretUpIcon';
import CaretDownIcon from '../Icons/CaretDownIcon';

export default function StockList() {
  const [watchList, setWatchList] = useState(['GOOGL', 'MSFT', 'AMZN', 'AAPL']);
  const [stock, setStock] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const stocksQuoteRequests = watchList.map(async (e) => {
          const response = await stocksApi.quote(e);
          return {
            symbol: response.config.params.symbol,
            data: response.data,
          };
        });
        const data = await Promise.allSettled(stocksQuoteRequests);
        setStock(data);
        console.log('stocksQuoteRequests', data);
      } catch (error) {
        console.log('stocksQuoteRequests error', error);
      }
    })();
  }, [watchList]);

  const setStockColor = (change) => {
    return change > 0 ? 'success' : 'danger';
  };
  const getStockChange = (change) => {
    return change > 0 ? <CaretUpIcon /> : <CaretDownIcon />;
  };
  return (
    <>
      <section className='container-md overflow-scroll'>
        <table className='table table-hover table-bordered'>
          <thead className='table-light' style={{ color: 'rgb(79, 89, 102)'}}>
            <tr>
              <th scope='col'>Name</th>
              <th scope='col'>Curr</th>
              <th scope='col'>Chg</th>
              <th scope='col'>Chg%</th>
              <th scope='col'>High</th>
              <th scope='col'>Low</th>
              <th scope='col'>Open</th>
              <th scope='col'>Prev</th>
            </tr>
          </thead>
          {stock.length !== 0 &&
            stock.map((e) => {
              if (e.status === 'fulfilled') {
                const { c, d, dp, h, l, o, pc } = e.value.data;
                const symbol = e.value.symbol;
                return (
                  <tbody key={symbol}>
                    <tr>
                      <td>{symbol}</td>
                      <td>{c}</td>
                      <td className={`text-${setStockColor(d)}`}>
                        <div className='d-flex justify-content-center align-items-center gap-2'>
                          {d}
                          {getStockChange(d)}
                        </div>
                      </td>
                      <td className={`text-${setStockColor(dp)}`}>
                        <div className='d-flex justify-content-center align-items-center gap-2'>
                          {dp}
                          {getStockChange(dp)}
                        </div>
                      </td>
                      <td>{h}</td>
                      <td>{l}</td>
                      <td>{o}</td>
                      <td>{pc}</td>
                    </tr>
                  </tbody>
                );
              } else {
                return '';
              }
            })}
        </table>
      </section>
    </>
  );
}
