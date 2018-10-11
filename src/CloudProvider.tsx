import React, { StatelessComponent } from "react";

import { AccountId } from "./types";
import { CloudProvidersQuery_actor_account_cloud_providers } from "./types/CloudProvidersQuery";

export interface Props
  extends CloudProvidersQuery_actor_account_cloud_providers {
  accountId: AccountId;
}

export const CloudProvider: StatelessComponent<Props> = props => (
  <a
    className="CloudProvider"
    href={`https://infrastructure.newrelic.com/accounts/${
      props.accountId
    }/integrations/${props.slug}`}
    rel="noopener"
    target="_blank"
  >
    <img height="60" src={props.icon} />
    <span>{props.name}</span>
  </a>
);
