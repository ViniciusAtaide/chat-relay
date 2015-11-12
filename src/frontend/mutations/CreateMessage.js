import Relay from 'react-relay';

export default class CreateMessageMutation extends Relay.Mutation {

  static fragments = {
    store: () => Relay.QL`fragment on Store { id }`
  };

  getMutation() {
    return Relay.QL`mutation { CreateMessage }`
  }

  getFatQuery() {
    return Relay.QL`
      fragment on CreateMessagePayload {
        store { messages }
      }
    `
  }

  getConfigs() {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: { store: this.props.store.id }
    }]
  }

  getVariables() {
    return { text: this.props.text };
  }
}