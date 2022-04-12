import React from 'react';
import ReactDOM from 'react-dom';
import { client } from './config/client-graphql'
import { ApolloProvider } from "@apollo/client";
import RoutesWay from './RoutesWay';

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <RoutesWay />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);