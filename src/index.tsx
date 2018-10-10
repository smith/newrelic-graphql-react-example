import ApolloClient from "apollo-boost";
import gql from "graphql-tag";
import * as React from "react";
import { render } from "react-dom";
import { ApolloProvider, Query } from "react-apollo";

import { ExampleQuery } from "types/ExampleQuery";

import "./index.css";

const query = gql`
  query ExampleQuery {
    actor {
      user {
        name
      }
    }
  }
`;

const client = new ApolloClient({
  headers: { "API-KEY": process.env.REACT_APP_API_KEY },
  uri: "https://api.newrelic.com/graphql"
});

const App = () => (
  <ApolloProvider client={client}>
    <Query<ExampleQuery> query={query}>
      {({ data, loading, error }) => {
        if (error) {
          return <div>{error.message}</div>;
        }
        if (loading) {
          return <div>Loading…</div>;
        }

        // Since it's possible that intermediate objects in the graph could be
        // null or undefined, ensure all properties exist and have a fallback.
        const name =
          (data && data.actor && data.actor.user && data.actor.user.name) ||
          "Unknown user";

        return <div>Hello, {name}!</div>;
      }}
    </Query>
  </ApolloProvider>
);

render(<App />, document.getElementById("root"));
