import React, { useState, useEffect, useContext } from 'react';
import { stocksApi } from '../Lib/Api/Stocks/stocks-api';
import CaretUpIcon from '../Icons/CaretUpIcon';
import CaretDownIcon from '../Icons/CaretDownIcon';
import { AppContext } from '../Lib/Context/context';

export default function StocksList() {
  const { stocksList } = useContext(AppContext);
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const stocksQuoteRequests = stocksList.map(async (e) => {
          const response = await stocksApi.quote(e);
          return {
            symbol: response.config.params.symbol,
            data: response.data,
          };
        });
        const data = await Promise.allSettled(stocksQuoteRequests);
        setStocks(data);
        console.log('stocksQuoteRequests', data);
      } catch (error) {
        console.log('stocksQuoteRequests error', error);
      }
    })();
  }, [stocksList]);

  const setStocksColor = (change) => {
    return change > 0 ? 'success' : 'danger';
  };
  const getStocksChange = (change) => {
    return change > 0 ? <CaretUpIcon /> : <CaretDownIcon />;
  };
  return (
    <>
      <section className='container-md overflow-scroll'>
        <table className='table table-hover table-bordered'>
          <thead className='table-light' style={{ color: 'rgb(79, 89, 102)' }}>
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
          {stocks.length !== 0 &&
            stocks.map((e) => {
              if (e.status === 'fulfilled') {
                const { c:current, d:change, dp:changePercent, h:high, l:low, o:open, pc:previousClose } = e.value.data;
                const symbol = e.value.symbol;
                return (
                  <tbody key={symbol}>
                    <tr>
                      <td>{symbol}</td>
                      <td>{current}</td>
                      <td className={`text-${setStocksColor(change)}`}>
                        <div className='d-flex justify-content-center align-items-center gap-2'>
                          {change}
                          {getStocksChange(change)}
                        </div>
                      </td>
                      <td className={`text-${setStocksColor(changePercent)}`}>
                        <div className='d-flex justify-content-center align-items-center gap-2'>
                          {changePercent}
                          {getStocksChange(changePercent)}
                        </div>
                      </td>
                      <td>{high}</td>
                      <td>{low}</td>
                      <td>{open}</td>
                      <td>{previousClose}</td>
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
