import { combineReducers } from "redux";
import { NEW_EXERCISE_STARTED, NEW_EXERCISE_SUCCEEDED } from "./actionTypes";
import { handleActions, Action } from "redux-actions";
import { reducer as formReducer } from "redux-form";

export type Exercise = {
  // id?: number;
  routineId?: string;
  started?: boolean;
  name?: string;
};

export type ExerciseForm = {
  values: Exercise;
};

type AppForms = {
  newExerciseForm: ExerciseForm;
};

export type State = {
   form: AppForms
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
      return {};
    }
  },
  {} // initial State
);

export const rootReducer = combineReducers({
  exercise: exerciseReducer,
  form: formReducer
});
