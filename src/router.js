import React from 'react';
import { Router } from 'dva/router';
import App from './routes/app';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <App  />
    </Router>
  );
}

export default RouterConfig;