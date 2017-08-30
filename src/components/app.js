import { h, Component } from 'preact';
import { Router } from 'preact-router';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import 'tachyons';

import ListPage from '../routes/list';
import CreatePage from '../routes/create';

const networkInterface = createNetworkInterface({
  uri: 'SIMPLE_API_ENDPOINT_URI_GOES_HERE'
});

const client = new ApolloClient({
  networkInterface
});

export default class App extends Component {
  handleRoute = e => {
    this.currentUrl = e.url;
  };

  render() {
    return (
      <ApolloProvider client={client}>
        <Router onChange={this.handleRoute}>
          <ListPage path="/" />
          <CreatePage path="/create" />
        </Router>
      </ApolloProvider>
    );
  }
}
