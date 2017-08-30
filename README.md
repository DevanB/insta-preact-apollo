# Instagram Clone with Preact + Apollo

Built with [preact-cli](http://npm.im/preact-cli), [Apollo](http://dev.apollodata.com), [Graphcool](http://graph.cool), and [Tachyons](http://tachyons.io).

This project is a continually evolving test of integrating Preact and Apollo.

## Steps to run
```bash
git clone git@github.com:DevanB/insta-preact-apollo.git && cd insta-preact-apollo
```

```bash
npm i -g graphcool
```

```bash
graphcool init --schema insta.graphql
```

```bash
graphcool endpoints
```

Copy the Simple API endpoint and paste into `createNetworkInterface` `uri`:

```javascript
// src/components/app.js

const networkInterface = createNetworkInterface({
  uri: 'SIMPLE_API_ENDPOINT_URI_GOES_HERE'
});
```

```bash
yarn install && yarn start
```
