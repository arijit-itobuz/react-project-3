import React from 'react';
import AppRoutes from './Lib/Routes/AppRoutes';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, Flip } from 'react-toastify';

function App() {
  return (
    <>
      <ToastContainer
        theme={'light'}
        position='top-right'
        autoClose={1500}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick={false}
        pauseOnFocusLoss={false}
        draggable={true}
        pauseOnHover={false}
        transition={Flip}
        closeButton={false}
      />
      <AppRoutes />
    </>
  );
}

export default App;
