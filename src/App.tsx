import React from 'react';
import { Provider } from 'react-redux';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import { createStore, compose } from 'redux';

import { RootReducer } from '@store/reducers/index';

import { NavigationProvider } from '@app/context/NavigationContext';
import { CartProvider } from '@app/context/CartContext';

import Main from '@app/components/Main';
import ReferenceUI from '@app/components/ReferenceUI/ReferenceUI';

import './styles/App.scss';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(RootReducer, composeEnhancers());

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route
            path="/"
            render={(props) => (
              <NavigationProvider>
                <CartProvider>
                  <Main {...props} />
                </CartProvider>
              </NavigationProvider>
            )}
            exact
          />
          <Route
            path="/reference/"
            render={(props) => <ReferenceUI {...props} />}
            exact
          />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
