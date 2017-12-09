import { combineReducers } from "redux";
import { NEW_EXERCISE_STARTED, NEW_EXERCISE_SUCCEEDED } from "./actionTypes";
import { handleActions, Action } from "redux-actions";

export type Exercise = {
  // id?: number;
  started?: boolean;
  name?: string;
};

export type State = {
  exercise: Exercise;
};

const exerciseReducer = handleActions<Exercise>(
  {
    [NEW_EXERCISE_STARTED]: (
      state: Exercise,
      action: Action<Exercise>
    ): Exercise => {
      return { started: true };
    },
    [NEW_EXERCISE_SUCCEEDED]: (
      state: Exercise,
      action: Action<Exercise>
    ): Exercise => {
      return { };
    }
  },
  {}  // initial State
 );

export const rootReducer = combineReducers({
  exercise: exerciseReducer
  // form: formReducer
});
