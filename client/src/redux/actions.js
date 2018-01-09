// @flow
// @ts-ignore
import * as Types from "./actionTypes";
import { createAction } from "redux-actions";

export const newExerciseStarted = createAction/*<Exercise>*/(Types.NEW_EXERCISE_STARTED);
export const newExerciseSucceeded = createAction/*<Exercise>*/(
  Types.NEW_EXERCISE_SUCCEEDED
);

export const getExerciseStarted = createAction/*<String>*/(Types.GET_EXERCISE_STARTED);
export const getExerciseSucceeded = createAction/*<Exercise>*/(
  Types.GET_EXERCISE_SUCCEEDED
);

export const editExerciseStarted = createAction/*<Exercise>*/(Types.EDIT_EXERCISE_STARTED);
export const editExerciseSucceeded = createAction/*<Exercise>*/(
  Types.EDIT_EXERCISE_SUCCEEDED
);

export const getExercisesStarted = createAction/*<ExerciseQuery>*/(Types.GET_EXERCISES_STARTED);
export const getExercisesSucceeded = createAction/*<Array<Exercise>>*/(
  Types.GET_EXERCISES_SUCCEEDED
);

export const setMuscleGroup = createAction/*<String>*/(Types.SET_MUSCLE_GROUP);

export const getMuscleGroupsStarted = createAction(Types.GET_MUSCLE_GROUPS_STARTED);
export const getMuscleGroupsSucceeded = createAction/*<Array<String>>*/(Types.GET_MUSCLE_GROUPS_SUCCEEDED);

export const setTarget = createAction/*<String>*/(Types.SET_TARGET);

export const getTargetsStarted = createAction(Types.GET_TARGETS_STARTED);
export const getTargetsSucceeded = createAction/*<Array<String>>*/(Types.GET_TARGETS_SUCCEEDED);
