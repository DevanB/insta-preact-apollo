import { h, Component } from 'preact';
import { Router } from 'preact-router';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import 'tachyons';

import ListPage from '../routes/list';
import CreatePage from '../routes/create';

const networkInterface = createNetworkInterface({
  uri: 'https://api.graph.cool/simple/v1/cj6r92nx6193p0187uxpan5xs'
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
