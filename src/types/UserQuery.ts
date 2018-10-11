/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UserQuery
// ====================================================

export interface UserQuery_actor_user {
  name: string | null;
}

export interface UserQuery_actor {
  /**
   * The `User` that is associated with the API key used in this request.
   */
  user: UserQuery_actor_user | null;
}

export interface UserQuery {
  /**
   * The `actor` field is the top-level entry into all data that is scoped
   * to the API user's access level.
   */
  actor: UserQuery_actor | null;
}
