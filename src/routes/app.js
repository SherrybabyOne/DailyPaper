import React from 'react';
import {  Route, Switch } from 'dva/router';
import Text from './text';

const App = (props) => {
  return (
    <div>
      <Switch>
          <Route exact path='/' component={Text}  />
      </Switch>
    </div>
  )
}

export default App
