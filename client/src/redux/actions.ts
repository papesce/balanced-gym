import { NEW_EXERCISE_STARTED, NEW_EXERCISE_SUCCEEDED } from "./actionTypes";
import { createAction } from "redux-actions";
import { Exercise } from "./reducers";

export const newExerciseStarted = createAction<Exercise>(
    NEW_EXERCISE_STARTED
);

export const newExerciseSucceeded = createAction<Exercise>(
    NEW_EXERCISE_SUCCEEDED);  