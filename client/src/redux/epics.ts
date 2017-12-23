import { combineEpics, ActionsObservable } from "redux-observable";
import { map } from "rxjs/operators/map";
import { mergeMap } from "rxjs/operators/mergeMap";
import * as T from "./actionTypes";
import URLQueryBuilder from "url-query-builder";

import {
  newExerciseSucceeded,
  getExercisesSucceeded,
  getExerciseSucceeded,
  getMuscleGroupsSucceeded,
  getTargetsSucceeded
} from "./actions";
import { ajax } from "rxjs/observable/dom/ajax";
import { Action } from "redux-actions";
import { Exercise } from "./model";

const NEW_EXERCISE_URL: string = "/newExercise";
const GET_EXERCISES_URL: string = "/exercise";
const GET_EXERCISE_URL: string = "/exercise";
const GET_MUSCLE_GROUPS_URL: string = "/muscleGroup";
const GET_TARGETS_URL: string = "/target";

const addExercise = (action$: ActionsObservable<Action<Exercise>>) => {
  return action$.ofType(T.NEW_EXERCISE_STARTED).pipe(
    mergeMap(action => {
      const routineId = action.payload ? action.payload.routineId : "";
      return ajax.post(`${NEW_EXERCISE_URL}/${routineId}`, action.payload, {
        "Content-Type": "application/json"
      });
    }),
    map(response => {
      // debugger;
      const newExercise = {
        _id: "",
        routineId: "",
        name: "",
        muscleGroup: "",
        target: "",
        gifURL: ""
      };
      return newExerciseSucceeded(newExercise);
    })
  );
};

const getExercises = (action$: ActionsObservable<Action<any>>) => {
  return action$.ofType(T.GET_EXERCISES_STARTED).pipe(
    mergeMap(action => {
      // debugger;
      let QUERY_URL = GET_EXERCISES_URL;
      if (action.payload) {
        QUERY_URL = new URLQueryBuilder(
          GET_EXERCISES_URL,
          action.payload
        ).getUrl();
      }
      return ajax.get(`${QUERY_URL}`, {
        "Content-Type": "application/json"
      });
    }),
    map(resp => {
      const exercises = resp.response;
      return getExercisesSucceeded(exercises);
})
  );
};

const getExercise = (action$: ActionsObservable<Action<any>>) => {
  return action$.ofType(T.GET_EXERCISE_STARTED).pipe(
    mergeMap(action => {
      // debugger;
      const exId = action.payload ? action.payload : "";
      return ajax.get(`${GET_EXERCISE_URL}/${exId}`, {
        "Content-Type": "application/json"
      });
    }),
    map(resp => {
      const exercise = resp.response;
      return getExerciseSucceeded(exercise);
    })
  );
};

const editExercise = (action$: ActionsObservable<Action<any>>) => {
  return action$.ofType(T.EDIT_EXERCISE_STARTED).pipe(
    mergeMap(action => {
      // debugger;
      const exId = action.payload ? action.payload._id : "";
      return ajax.patch(`${GET_EXERCISE_URL}/${exId}`, action.payload, {
        "Content-Type": "application/json"
      });
    }),
    map(resp => {
      debugger;
      const exercise = resp.response;
      return getExerciseSucceeded(exercise);
    })
  );
};

const getMuscleGroups = (action$: ActionsObservable<Action<any>>) => {
  return action$.ofType(T.GET_MUSCLE_GROUPS_STARTED).pipe(
    mergeMap(action => {
      // debugger;
      let QUERY_URL = GET_MUSCLE_GROUPS_URL;
      return ajax.get(`${QUERY_URL}`, {
        "Content-Type": "application/json"
      });
    }),
    map(resp => {
      // debugger;
      const muscleGroups = resp.response;
      return getMuscleGroupsSucceeded(muscleGroups);
   })
  );
};

const getTargets = (action$: ActionsObservable<Action<any>>) => {
  return action$.ofType(T.GET_TARGETS_STARTED).pipe(
    mergeMap(action => {
      // debugger;
      let QUERY_URL = GET_TARGETS_URL;
      return ajax.get(`${QUERY_URL}`, {
        "Content-Type": "application/json"
      });
    }),
    map(resp => {
      // debugger;
      const targets = resp.response;
      return getTargetsSucceeded(targets);
   })
  );
};

export const rootEpic = combineEpics(
  addExercise,
  getExercises,
  getExercise,
  editExercise,
  getMuscleGroups,
  getTargets
);
