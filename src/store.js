import { writable } from "svelte/store";

export const searchList = writable([]);

export const stateSearchSubmitted = writable(false);
