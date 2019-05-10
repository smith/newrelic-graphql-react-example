import { AccountId, ChangeEvent } from "./types";
import React, { FunctionComponent } from "react";

import { AccountsQuery } from "./types/AccountsQuery";
import { Query } from "react-apollo";
import gql from "graphql-tag";

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

export interface AccountSelectProps {
  onChange: (event: ChangeEvent) => void;
  selectedAccountId: AccountId;
}

export const AccountSelect: FunctionComponent<AccountSelectProps> = props => (
  <Query<AccountsQuery> query={query}>
    {({ data, error, loading }) => {
      const accounts = (data && data.actor && data.actor.accounts) || [];

      // If there's only one account and no currently selected account, select
      // the first one automatically
      if (accounts.length === 1 && props.selectedAccountId === null) {
        const value = String(
          accounts && accounts[0] && (accounts[0] || { id: null }).id
        );

        props.onChange({ target: { value } });
      }

      return (
        <select
          disabled={loading || accounts.length === 1}
          onChange={props.onChange}
          value={props.selectedAccountId || undefined}
          title={
            accounts.length === 1
              ? "You only have one account, so this select is disabled"
              : ""
          }
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
