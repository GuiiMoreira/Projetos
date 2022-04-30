import { ApolloProvider } from "@apollo/client";
import React from 'react';
import ReactDOM from 'react-dom';
import { client } from './config/client-graphql';
import RoutesWay from './RoutesWay';
import { Provider } from 'react-redux'
import store from './store/index'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ApolloProvider client={client}>
        <RoutesWay />
      </ApolloProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);