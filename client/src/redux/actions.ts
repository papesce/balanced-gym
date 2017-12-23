import * as Types from "./actionTypes";
import { createAction } from "redux-actions";
import { Exercise, ExerciseQuery } from "./model";

export const newExerciseStarted = createAction<Exercise>(Types.NEW_EXERCISE_STARTED);
export const newExerciseSucceeded = createAction<Exercise>(
  Types.NEW_EXERCISE_SUCCEEDED
);

export const getExerciseStarted = createAction<string>(Types.GET_EXERCISE_STARTED);
export const getExerciseSucceeded = createAction<Exercise>(
  Types.GET_EXERCISE_SUCCEEDED
);

export const editExerciseStarted = createAction<Exercise>(Types.EDIT_EXERCISE_STARTED);
export const editExerciseSucceeded = createAction<Exercise>(
  Types.EDIT_EXERCISE_SUCCEEDED
);

export const getExercisesStarted = createAction<ExerciseQuery>(Types.GET_EXERCISES_STARTED);
export const getExercisesSucceeded = createAction<Array<Exercise>>(
  Types.GET_EXERCISES_SUCCEEDED
);

export const setMuscleGroup = createAction<string>(Types.SET_MUSCLE_GROUP);

export const getMuscleGroupsStarted = createAction(Types.GET_MUSCLE_GROUPS_STARTED);
export const getMuscleGroupsSucceeded = createAction<Array<string>>(Types.GET_MUSCLE_GROUPS_SUCCEEDED);

export const setTarget = createAction<string>(Types.SET_TARGET);

export const getTargetsStarted = createAction(Types.GET_TARGETS_STARTED);
export const getTargetsSucceeded = createAction<Array<string>>(Types.GET_TARGETS_SUCCEEDED);
