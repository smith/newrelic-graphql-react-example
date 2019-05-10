import "./index.css";

import { AccountId, ChangeEvent } from "./types";
import { ApolloProvider, Query } from "react-apollo";
import React, { FunctionComponent, useCallback, useState } from "react";

import { AccountSelect } from "./AccountSelect";
import ApolloClient from "apollo-boost";
import { CloudProviderList } from "./CloudProviderList";
import { UserQuery } from "./types/UserQuery";
import gql from "graphql-tag";
import { render } from "react-dom";

const query = gql`
  query UserQuery {
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


const App: FunctionComponent = () => {
  const [accountId, setAccountId] = useState<AccountId>(null)

  const handleChange = useCallback((event: ChangeEvent) => {
    const value = parseInt(event.target.value as string, 10);
    setAccountId(isNaN(value) ? null : value);
  }, [setAccountId]);

  return (
    <ApolloProvider client={client}>
      <Query<UserQuery> query={query}>
        {({ data, error, loading }) => {
          if (error) {
            return <div>{error.message}</div>;
          }

          // Since it's possible that intermediate objects in the graph could be
          // null or undefined, ensure all properties exist and have a fallback.
          const name =
            (data && data.actor && data.actor.user && data.actor.user.name) ||
            "Unknown user";

          return (
            <div>
              <span className="greeting">
                {loading ? "Loading…" : `Hello, ${name}!`}
              </span>
              <AccountSelect
                selectedAccountId={accountId}
                onChange={handleChange}
              />
              <CloudProviderList accountId={accountId} />
            </div>
          );
        }}
      </Query>
    </ApolloProvider>
  );
}

render(<App />, document.getElementById("root"));
