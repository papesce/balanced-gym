import { NEW_EXERCISE_STARTED, NEW_EXERCISE_SUCCEEDED } from "./actionTypes";
import { createAction } from "redux-actions";
import { Exercise } from "./reducers";

export const newExercise = createAction<Exercise, string>(
    NEW_EXERCISE_STARTED,
    (name: string) => ({ name })
  );

export const newExerciseSucceeded = createAction<Exercise>(
    NEW_EXERCISE_SUCCEEDED, () => {return {}; });  