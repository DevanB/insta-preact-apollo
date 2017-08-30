# Instagram Clone with Preact + Apollo

## Steps to run
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
