import React from 'react';
import { Provider } from 'react-redux';
import store from './store/store';
import './App.css';
import AppContainer from './containers/AppContainer';

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <AppContainer />
      </div>
    </Provider>
  );
};

export default App;