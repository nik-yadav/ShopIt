import * as authActions from "./auth.action.js";
import * as slice from "./auth.reducer.js";
import * as selectors from "./auth.selector.js";

export const { tokenVerify } = authActions;

export const { name, reducer, actions: { setAuthInfo } } = slice;

export const { selectedAuthInfo } = selectors;

