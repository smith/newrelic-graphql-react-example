/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CloudProvidersQuery
// ====================================================

export interface CloudProvidersQuery_actor_account_cloud_providers {
  /**
   * The cloud provider icon name.
   */
  icon: string;
  /**
   * The cloud provider identifier in NewRelic.
   */
  id: number;
  /**
   * The cloud provider name.
   */
  name: string;
  /**
   * The cloud provider short name.
   */
  slug: string;
}

export interface CloudProvidersQuery_actor_account_cloud {
  /**
   * Get all available cloud providers.
   */
  providers: (CloudProvidersQuery_actor_account_cloud_providers | null)[] | null;
}

export interface CloudProvidersQuery_actor_account {
  /**
   * The `cloud` field provides access to Cloud Integrations configuration data.
   */
  cloud: CloudProvidersQuery_actor_account_cloud | null;
}

export interface CloudProvidersQuery_actor {
  /**
   * The `account` field is the entry point into data that is scoped to a single account.
   */
  account: CloudProvidersQuery_actor_account | null;
}

export interface CloudProvidersQuery {
  /**
   * The `actor` field is the top-level entry into all data that is scoped
   * to the API user's access level.
   */
  actor: CloudProvidersQuery_actor | null;
}

export interface CloudProvidersQueryVariables {
  accountId: number;
}
