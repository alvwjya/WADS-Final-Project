export const initialState = null;

// This is used to check whether the user already sign in or not.
export const reducer = (state, action) => {
    if (action.type === "USER") {
        return action.payload;
    }
    if (action.type === "CLEAR") {
        return null;
    }
    return state;
}