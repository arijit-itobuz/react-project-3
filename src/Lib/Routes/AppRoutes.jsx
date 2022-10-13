import React from 'react';
import { Routes, Route } from 'react-router';
import routes from './Routes';
import StockOverviewPage from '../../Pages/StockOverviewPage';
import StockDetailsPage from '../../Pages/StockDetailsPage';

export default function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path={routes.stockOverviewPage.fullPath} element={<StockOverviewPage />}/>
        <Route path={routes.stockOverviewPage.fullPath} element={<StockDetailsPage />}/>
      </Routes>
    </>
  );
}
