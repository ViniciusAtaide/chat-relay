import React from 'react';
import Relay from 'react-relay';
import Message from './Message';
import NewMessage from './NewMessage';
import CreateMessageMutation from '../mutations/CreateMessage';

export default class Application extends React.Component {
  render() {
    const { messages } = this.props.example;
    return (
      <div>
        <ul>
          { messages.map(message =>
            <Message key={message.id} message={message} />
          )}
        </ul>
        <NewMessage />
      </div>
    );
  }
}

export default Relay.createContainer(Application, {
  fragments: {
    example: () => Relay.QL`
      fragment on Example {
        messages {
          id
          ${ Message.getFragment('message') }
        }
        ${CreateMessageMutation.getFragment('example')}
      }
    `
  }
});