import { writable } from 'svelte/store';
import type { User } from 'firebase/auth';

// `undefined` means not yet loaded, `null` means logged out
export const user = writable<User | null | undefined>(undefined);