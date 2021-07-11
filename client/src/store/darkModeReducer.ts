import { Reducer } from "redux";

export interface DarkModeAction {
  type: "darkModeAction";
  payload: boolean;
}

export const darkModeReducer: Reducer<boolean, DarkModeAction> = (
  state: boolean | undefined,
  action: DarkModeAction
): boolean => {
  switch (action.type) {
    case "darkModeAction":
      return action.payload;
    default:
      return state === undefined ? false : state;
  }
};
