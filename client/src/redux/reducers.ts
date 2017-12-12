import { combineReducers } from "redux";
import * as T from "./actionTypes";
import { handleActions, Action } from "redux-actions";
import { reducer as formReducer } from "redux-form";
import { NewExerciseStatus, GetExerciseStatus, Exercise } from "./model";
import { routerReducer } from "react-router-redux";

const newExerciseReducer = handleActions<NewExerciseStatus, Exercise>(
  {
    [T.NEW_EXERCISE_STARTED]: (
      state: NewExerciseStatus,
      action: Action<Exercise>
    ): NewExerciseStatus => {
      return { started: true };
    },
    [T.NEW_EXERCISE_SUCCEEDED]: (
      state: NewExerciseStatus,
      action: Action<Exercise>
    ): NewExerciseStatus => {
      return {};
    }
  },
  {} // initial State
);

const getExerciseReducer = handleActions<GetExerciseStatus, Exercise>(
  {
    [T.GET_EXERCISE_STARTED]: (
      state: GetExerciseStatus,
      action: Action<any>
    ): GetExerciseStatus => {
      return { loading: true };
    },
    [T.GET_EXERCISE_SUCCEEDED]: (
      state: GetExerciseStatus,
      action: Action<Exercise>
    ): GetExerciseStatus => {
      return {exercise: action.payload};
    },
    [T.EDIT_EXERCISE_STARTED]: (
      state: GetExerciseStatus,
      action: Action<Exercise>
    ): GetExerciseStatus => {
      return { exercise: state.exercise, started: true };
    },
    [T.EDIT_EXERCISE_SUCCEEDED]: (
      state: GetExerciseStatus,
      action: Action<Exercise>
    ): GetExerciseStatus => {
      return {exercise: action.payload};
    },
  },
  { loading: true } // initial State
);

const exercisesReducer = handleActions(
  {
    [T.GET_EXERCISES_SUCCEEDED]: (
      state: Array<Exercise>,
      action: Action<Array<Exercise>>
    ): Array<Exercise> => {
      return action.payload ? action.payload : [];
    }
  },
  []
);

export const rootReducer = combineReducers({
  newExerciseStatus: newExerciseReducer,
  getExerciseStatus: getExerciseReducer,
  exercises: exercisesReducer,
  form: formReducer,
  router: routerReducer
});
