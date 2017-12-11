import {
  NEW_EXERCISE_STARTED,
  NEW_EXERCISE_SUCCEEDED,
  GET_EXERCISES_STARTED,
  GET_EXERCISES_SUCCEEDED
} from "./actionTypes";
import { createAction } from "redux-actions";
import { Exercise } from "./model";

export const newExerciseStarted = createAction<Exercise>(NEW_EXERCISE_STARTED);
export const newExerciseSucceeded = createAction<Exercise>(
  NEW_EXERCISE_SUCCEEDED
);

export const getExercisesStarted = createAction(GET_EXERCISES_STARTED);
export const getExercisesSucceeded = createAction<Array<Exercise>>(
  GET_EXERCISES_SUCCEEDED
);
