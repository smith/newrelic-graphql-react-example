# New Relic GraphQL React Example

This repository contains an example [React](https://reactjs.org/) application
(bootstrapped with
[Create React App](https://github.com/facebookincubator/create-react-app)) that
demonstrates use of the
[New Relic GraphQL API](https://docs.newrelic.com/docs/apis/graphql-api) in a
front-end application.

## Installation

You'll need [Node.js](https://nodejs.org) and [Yarn](https://yarnpkg.com) installed.

Run `yarn` to install the dependencies.

## Get your New Relic API key

You'll need an API key to authenticate against the GraphQL API. Go to the
[New Relic GraphQL API explorer](https://api.newrelic.com/graphiql) and log in if prompted.

Select an existing API key or create a new API key from the the dropdown menu in
the GraphiQL title bar.

Create a GraphQL query to get your API key. It should look like:

```graphql
{
  requestContext {
    apiKey
  }
}
```

[Click here to go directly to this query in the explorer](https://api.newrelic.com/graphiql?query=%7B%0A%20%20requestContext%20%7B%0A%20%20%20%20apiKey%0A%20%20%7D%0A%7D%0A).

The `apiKey` value is what you'll be using to start the application.

### Run the application

Given your API key is `YOUR_API_KEY`, Run:

```bash
env REACT_APP_API_KEY=YOUR_API_KEY yarn start
```

This will start the application on port 3000 and open a browser window.

Congratulations! You've just connected to the New Relic GraphQL API!

### Generating type information

Since the GraphQL API has a strongly-typed schema, we can introspect this schema
and the queries in our application to generate
[TypeScript](https://www.typescriptlang.org/) type information.

[schema.json](schema.json) contains the API schema. If you need to download a
more up to date version of the schema run:

```bash
env REACT_APP_API_KEY=YOUR_API_KEY yarn run schema:download`
```

[src/types](src/types) contains the default generated type information based on
the schema and the existing queries.

If you change your queries you can run:

```bash
yarn run codegen:generate
```

to generate updated type annotations.

[src/index.tsx](src/index.tsx) imports the `ExampleQuery` type and uses it to
specify the type of the `data` object in the query. Your text editor can provide
autocompletion and inline documentation for these types.

### What's next?

You can use the documentation and API explorer to see everything that's possible.

Making changes in the application will cause the page to reload with new results.

More help can be found on the [New Relic Explorers Hub](https://discuss.newrelic.com/).
