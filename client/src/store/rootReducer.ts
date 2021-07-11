import { combineReducers } from "redux";
import { darkModeReducer } from "./darkModeReducer";
import { userReducer } from "./userReducer";

export const rootReducer = combineReducers({
  darkMode: darkModeReducer,
  user: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
