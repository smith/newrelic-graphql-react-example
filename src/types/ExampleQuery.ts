/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ExampleQuery
// ====================================================

export interface ExampleQuery_actor_user {
  name: string | null;
}

export interface ExampleQuery_actor {
  /**
   * The `User` that is associated with the API key used in this request.
   */
  user: ExampleQuery_actor_user | null;
}

export interface ExampleQuery {
  /**
   * The `actor` field is the top-level entry into all data that is scoped
   * to the API user's access level.
   */
  actor: ExampleQuery_actor | null;
}
