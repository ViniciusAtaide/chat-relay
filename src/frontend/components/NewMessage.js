import React from 'react';
import Relay from 'react-relay';
import CreateMessageMutation from '../mutations/CreateMessage';

export default class NewMessage extends React.Component {
  _sendMessage(e) {
    e.preventDefault();

    Relay.Store.update(
      new CreateMessageMutation({
        text: this.refs.newMessage.value
      })
    )
    this.refs.newMessage.value = '';
  }

  render() {
    return (
      <form onSubmit={this._sendMessage}>
        <input type="text" name="newMessage" id="newMessage" ref="newMessage"/>
        <input type="submit" value="New Message"/>
      </form>
    )
  }
}