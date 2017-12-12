import {
  NEW_EXERCISE_STARTED,
  NEW_EXERCISE_SUCCEEDED,
  GET_EXERCISES_STARTED,
  GET_EXERCISES_SUCCEEDED,
  GET_EXERCISE_STARTED,
  GET_EXERCISE_SUCCEEDED,
  EDIT_EXERCISE_STARTED,
  EDIT_EXERCISE_SUCCEEDED
} from "./actionTypes";
import { createAction } from "redux-actions";
import { Exercise } from "./model";

export const newExerciseStarted = createAction<Exercise>(NEW_EXERCISE_STARTED);
export const newExerciseSucceeded = createAction<Exercise>(
  NEW_EXERCISE_SUCCEEDED
);

export const getExerciseStarted = createAction<string>(GET_EXERCISE_STARTED);
export const getExerciseSucceeded = createAction<Exercise>(
  GET_EXERCISE_SUCCEEDED
);

export const editExerciseStarted = createAction<Exercise>(EDIT_EXERCISE_STARTED);
export const editExerciseSucceeded = createAction<Exercise>(
  EDIT_EXERCISE_SUCCEEDED
);

export const getExercisesStarted = createAction(GET_EXERCISES_STARTED);
export const getExercisesSucceeded = createAction<Array<Exercise>>(
  GET_EXERCISES_SUCCEEDED
);
