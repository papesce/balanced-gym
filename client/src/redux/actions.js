// @flow
import * as Types from "./actionTypes";
import { createAction } from "redux-actions";

export const newExerciseStarted = createAction(
  /*<Exercise>*/ Types.NEW_EXERCISE_STARTED
);
export const newExerciseSucceeded = createAction(
  /*<Exercise>*/ Types.NEW_EXERCISE_SUCCEEDED
);

export const getExerciseStarted = createAction(
  /*<String>*/ Types.GET_EXERCISE_STARTED
);
export const getExerciseSucceeded = createAction(
  /*<Exercise>*/ Types.GET_EXERCISE_SUCCEEDED
);

export const editExerciseStarted = createAction(
  /*<Exercise>*/ Types.EDIT_EXERCISE_STARTED
);
export const editExerciseSucceeded = createAction(
  /*<Exercise>*/ Types.EDIT_EXERCISE_SUCCEEDED
);

export const getExercisesStarted = createAction(Types.GET_EXERCISES_STARTED);
export const getExercisesSucceeded = createAction(
  Types.GET_EXERCISES_SUCCEEDED
);
export const getExercisesFailed = createAction(Types.GET_EXERCISES_FAILED);

export const setMuscleGroup = createAction(/*<String>*/ Types.SET_MUSCLE_GROUP);

export const getMuscleGroupsStarted = createAction(
  Types.GET_MUSCLE_GROUPS_STARTED
);
export const getMuscleGroupsSucceeded = createAction(
  /*<Array<String>>*/ Types.GET_MUSCLE_GROUPS_SUCCEEDED
);

export const setTarget = createAction(/*<String>*/ Types.SET_TARGET);

export const getTargetsStarted = createAction(Types.GET_TARGETS_STARTED);
export const getTargetsSucceeded = createAction(
  /*<Array<String>>*/ Types.GET_TARGETS_SUCCEEDED
);

export const getMusclesStarted = createAction(Types.GET_MUSCLES_STARTED);
export const getMusclesSucceeded = createAction(
  /*<Array<String>>*/ Types.GET_MUSCLES_SUCCEEDED
);

export const newMuscleStarted = createAction(Types.NEW_MUSCLE_STARTED);
export const newMuscleSucceeded = createAction(Types.NEW_MUSCLE_SUCCEEDED);

export const getMuscleStarted = createAction(Types.GET_MUSCLE_STARTED);
export const getMuscleSucceeded = createAction(Types.GET_MUSCLE_SUCCEEDED);

export const editMuscleStarted = createAction(Types.EDIT_MUSCLE_STARTED);
export const editMuscleSucceeded = createAction(Types.EDIT_MUSCLE_SUCCEEDED);
