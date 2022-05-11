import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import MainRoutes from './routes';
import './index.css'

ReactDOM.render(
  <BrowserRouter>
    <MainRoutes />
  </BrowserRouter>,
  document.getElementById('root')
);

