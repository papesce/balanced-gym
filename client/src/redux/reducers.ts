import { combineReducers } from "redux";
import { NEW_EXERCISE_STARTED, NEW_EXERCISE_SUCCEEDED } from "./actionTypes";
import { handleActions, Action } from "redux-actions";
import { reducer as formReducer } from "redux-form";

export type NewExerciseStatus = {
  started?: boolean;
};

export interface Exercise {
  routineId: string;
  name: string;
  muscleGroup: string;
  target: string;
  gifURL: string;
}

export type ExerciseForm = {
  values: Exercise;
};

type AppForms = {
  newExerciseForm: ExerciseForm;
};

export type State = {
   newExerciseStatus: NewExerciseStatus,
   form: AppForms
};

const exerciseReducer = handleActions<NewExerciseStatus, Exercise>(
  {
    [NEW_EXERCISE_STARTED]: (
      state: NewExerciseStatus,
      action: Action<Exercise>
    ): NewExerciseStatus => {
      return { started: true };
    },
    [NEW_EXERCISE_SUCCEEDED]: (
      state: NewExerciseStatus,
      action: Action<Exercise>
    ): NewExerciseStatus => {
      return {};
    }
  },
  {} // initial State
);

export const rootReducer = combineReducers({
  newExerciseStatus: exerciseReducer,
  form: formReducer
});
