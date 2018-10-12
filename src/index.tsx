import ApolloClient from "apollo-boost";
import gql from "graphql-tag";
import React, { PureComponent } from "react";
import { render } from "react-dom";
import { ApolloProvider, Query } from "react-apollo";

import { AccountSelect } from "./AccountSelect";
import { CloudProviderList } from "./CloudProviderList";
import { AccountId, ChangeEvent } from "./types";
import { UserQuery } from "./types/UserQuery";

import "./index.css";

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

type State = { accountId: AccountId };

class App extends PureComponent<{}, State> {
  state: State = {
    accountId: null
  };

  handleChange = (event: ChangeEvent) => {
    const value = parseInt(event.target.value as string, 10);
    this.setState({ accountId: isNaN(value) ? null : value });
  };

  render() {
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
                  selectedAccountId={this.state.accountId}
                  onChange={this.handleChange}
                />
                <CloudProviderList accountId={this.state.accountId} />
              </div>
            );
          }}
        </Query>
      </ApolloProvider>
    );
  }
}

render(<App />, document.getElementById("root"));
