import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import StarHop from 'containers/starhop/StarHop';
import Header from 'containers/header/Header';
import store from 'store/reduxStore';

import { BrowserRouter as Router, Route } from 'react-router-dom';

/**
 * Set up the redux store for the app.
 *
 * Set up the main react-router routes for the app.   As of react-router v4, Routes can be nested throughout the app.
 */
render(
  <Provider store={store}>
    <Router>
      <div className="starhop-app">
        <Route component={Header} />
        <Route exact path="/" component={StarHop} />
        <Route path="/starhop" component={StarHop} />
      </div>
    </Router>
  </Provider>,
  document.getElementById('app')
);
