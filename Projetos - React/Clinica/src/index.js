import { ApolloProvider } from "@apollo/client";
import React from 'react';
import ReactDOM from 'react-dom';
import { client } from './config/client-graphql';
import RoutesWay from './RoutesWay';

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <RoutesWay />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);