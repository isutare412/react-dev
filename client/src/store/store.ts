import { createStore, Store } from "redux";
import { DarkModeAction } from "./darkModeReducer";
import { rootReducer, RootState } from "./rootReducer";
import { UserAction } from "./userReducer";

const initStore = (
  darkMode: boolean
): Store<RootState, DarkModeAction | UserAction> => {
  return createStore(rootReducer, { darkMode });
};

export default initStore;
