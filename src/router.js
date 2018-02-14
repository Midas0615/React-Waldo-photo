import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PizzaView from 'routes/PizzaView';

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" component={PizzaView} />
    </Switch>
  </BrowserRouter>
);

export default Router;
