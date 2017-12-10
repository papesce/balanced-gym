import { NEW_EXERCISE_STARTED, NEW_EXERCISE_SUCCEEDED } from "./actionTypes";
import { createAction } from "redux-actions";
import { Exercise } from "./reducers";

export const newExercise = createAction<Exercise, Exercise>(
    NEW_EXERCISE_STARTED,
    (exercise: Exercise) => {return exercise; } 
  );

export const newExerciseSucceeded = createAction<Exercise>(
    NEW_EXERCISE_SUCCEEDED, () => {return {}; });  