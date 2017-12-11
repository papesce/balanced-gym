import { combineEpics, ActionsObservable } from "redux-observable";
import { map } from "rxjs/operators/map";
import { mergeMap } from "rxjs/operators/mergeMap";
import { NEW_EXERCISE_STARTED, GET_EXERCISES_STARTED } from "./actionTypes";
import { newExerciseSucceeded, getExercisesSucceeded } from "./actions";
import { ajax } from "rxjs/observable/dom/ajax";
import { Action } from "redux-actions";
import { Exercise } from "./model";

const NEW_EXERCISE_URL: string = "/newExercise";
const GET_EXERCISES_URL: string = "/exercise";

const addExercise = (action$: ActionsObservable<Action<Exercise>>) => {
  return action$.ofType(NEW_EXERCISE_STARTED).pipe(
    mergeMap( action => {
      const routineId = action.payload ? action.payload.routineId : "";
      return ajax.post( `${NEW_EXERCISE_URL}/${routineId}`, action.payload, {
        "Content-Type": "application/json"
      });
    }),
    map(response => {
      debugger;
      const newExercise = {_id : "", routineId: "", name: "", muscleGroup: "",
      target: "", gifURL: ""};
      return newExerciseSucceeded(newExercise);
    })
  );
};

const getExercises = (action$: ActionsObservable<Action<any>>) => {
  return action$.ofType(GET_EXERCISES_STARTED).pipe(
    mergeMap( action => {
      return ajax.get( `${GET_EXERCISES_URL}`, {
        "Content-Type": "application/json"
      });
    }),
    map(resp => {
      const exercises = resp.response;
      return getExercisesSucceeded(exercises);
    })
  );
};

export const rootEpic = combineEpics(
  addExercise,
  getExercises);
