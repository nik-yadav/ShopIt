import reducer from "./auth.reducer";

export const selectSlice = (state) => state[reducer.name];

export const selectedAuthInfo = (state) => selectSlice(state).authInfo;
