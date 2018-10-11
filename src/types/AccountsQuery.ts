/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AccountsQuery
// ====================================================

export interface AccountsQuery_actor_accounts {
  id: number | null;
  name: string | null;
}

export interface AccountsQuery_actor {
  /**
   * The `accounts` field returns all accounts that the Actor is authorized to view.
   */
  accounts: (AccountsQuery_actor_accounts | null)[] | null;
}

export interface AccountsQuery {
  /**
   * The `actor` field is the top-level entry into all data that is scoped
   * to the API user's access level.
   */
  actor: AccountsQuery_actor | null;
}
