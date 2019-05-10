import {
  CloudProvidersQuery,
  CloudProvidersQueryVariables
} from "./types/CloudProvidersQuery";
import React, { FunctionComponent } from "react";

import { AccountId } from "./types";
import { CloudProvider } from "./CloudProvider";
import { Query } from "react-apollo";
import gql from "graphql-tag";

const query = gql`
  query CloudProvidersQuery($accountId: Int!) {
    actor {
      account(id: $accountId) {
        cloud {
          providers {
            icon
            id
            name
            slug
          }
        }
      }
    }
  }
`;

export type CloudProviderListProps = { accountId: AccountId };

export const CloudProviderList: FunctionComponent<CloudProviderListProps> = props => {
  if (!props.accountId) {
    return <div>Select an account</div>;
  }

  const variables = { accountId: Number(props.accountId) };

  return (
    <div className="CloudProviderList">
      <p>Cloud providers available on your New Relic account:</p>
      <Query<CloudProvidersQuery, CloudProvidersQueryVariables>
        query={query}
        variables={variables}
      >
        {({ data, error, loading }) => {
          if (error) {
            return <div>Error: {error.message}</div>;
          }
          if (loading) {
            return <div>Loading…</div>;
          }

          const providers =
            (data &&
              data.actor &&
              data.actor.account &&
              data.actor.account.cloud &&
              data.actor.account.cloud.providers) ||
            [];

          if (providers.length === 0) {
            return <div>No cloud providers exist on this account</div>;
          }

          return providers.map(
            provider =>
              provider && (
                <CloudProvider
                  key={provider.id}
                  accountId={props.accountId}
                  {...provider}
                />
              )
          );
        }}
      </Query>
    </div>
  );
};
