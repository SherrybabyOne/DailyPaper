import React from 'react';
import {  Route, Switch } from 'dva/router';
import Text from './text';
import Login from './login/login'
import Tags from './TagDisplay/Tags';
import Regist from './register/register';
import  Addtags from './Tags/tags';

const App = (props) => {
  return (
    <div>
      <Switch>
          <Route exact path='/' component={Text}  />
          <Route path="/login" component={Login}/>
          <Route path="/display" component={Tags}/>
          <Route path="/regist" component={Regist}/>
          <Route path="/addtags" component={Addtags}/>
      </Switch>
    </div>
  )
}

export default App
