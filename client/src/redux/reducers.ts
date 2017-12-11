import { combineReducers } from "redux";
import {
  NEW_EXERCISE_STARTED,
  NEW_EXERCISE_SUCCEEDED,
  GET_EXERCISES_SUCCEEDED
} from "./actionTypes";
import { handleActions, Action } from "redux-actions";
import { reducer as formReducer } from "redux-form";
import { NewExerciseStatus, Exercise } from "./model";

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

const exercisesReducer = handleActions(
  {
    [GET_EXERCISES_SUCCEEDED]: (
      state: Array<Exercise>,
      action: Action<Array<Exercise>>
    ): Array<Exercise> => {
      return action.payload ? action.payload : [];
    }
  },
  []
);

export const rootReducer = combineReducers({
  newExerciseStatus: exerciseReducer,
  exercises: exercisesReducer,
  form: formReducer
});
