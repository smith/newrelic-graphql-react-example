// Type definitions shared between components

import { AccountsQuery_actor_accounts } from "./AccountsQuery";

export type AccountId = AccountsQuery_actor_accounts["id"];

// A simplified change event
export type ChangeEvent = { target: { value?: string | null } };
