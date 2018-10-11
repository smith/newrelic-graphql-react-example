import gql from "graphql-tag";
import React, { CSSProperties, StatelessComponent } from "react";
import { Query } from "react-apollo";

import { AccountId } from "./types";
import { AccountsQuery } from "./types/AccountsQuery";

const query = gql`
  query AccountsQuery {
    actor {
      accounts {
        id
        name
      }
    }
  }
`;

export interface Props {
  onChange: (event: { target: { value: string } }) => void;
  selectedAccountId: AccountId;
  style?: CSSProperties;
}

export const AccountSelect: StatelessComponent<Props> = props => (
  <Query<AccountsQuery> query={query}>
    {({ data, error, loading }) => {
      const accounts = (data && data.actor && data.actor.accounts) || [];

      if (
        accounts.length === 1 &&
        props.selectedAccountId === null &&
        accounts !== null &&
        accounts[0] !== null
      ) {
        props.onChange({
          target: { value: String((accounts[0] || { id: null }).id) }
        });
      }

      return (
        <select
          disabled={loading}
          onChange={props.onChange}
          style={props.style}
          value={props.selectedAccountId || undefined}
        >
          <option>Select an account…</option>
          {accounts.length === 0 && <option>No accounts found</option>}
          {error && <option>Error loading accounts: {error.message}</option>}
          {accounts.map(account => {
            if (!account) {
              return null;
            }
            return (
              <option key={Number(account.id)} value={Number(account.id)}>
                {account.name} ({account.id})
              </option>
            );
          })}
        </select>
      );
    }}
  </Query>
);
