import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';

import ExampleRoot from './roots/ExampleRoot';
import Application from './components/Application';

class Root extends React.Component {
  render() {
    return (
      <Relay.RootContainer
        Component={ Application }
        route={ new ExampleRoot() } />
    );
  }
}

ReactDOM.render(
  <Root />,
  document.getElementById('container')
);