import React from 'react';
import Relay from 'react-relay';

class Message extends React.Component {

  render() {
    const { message } = this.props;
    return (
      <li>{ message.id } : { message.text }</li>
    );
  }

}

export default Relay.createContainer(Message, {
  fragments: {
    message: () => Relay.QL`
      fragment on Message {
        id
        text
      }
    `
  }
})