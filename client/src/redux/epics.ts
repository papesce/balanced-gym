import { combineEpics, ActionsObservable } from "redux-observable";
import { map } from "rxjs/operators/map";
import { mergeMap } from "rxjs/operators/mergeMap";
import { NEW_EXERCISE_STARTED } from "./actionTypes";
import { newExerciseSucceeded } from "./actions";
import { ajax } from "rxjs/observable/dom/ajax";
import { Action } from "redux-actions";
import { Exercise } from "./reducers";

const URL: string = "/newExercise/";

const addExercise = (action$: ActionsObservable<Action<Exercise>>) => {
  return action$.ofType(NEW_EXERCISE_STARTED).pipe(
    mergeMap( action => {
      const routineId = action.payload ? action.payload.routineId : "";
      return ajax.post( `${URL}${routineId}`, action.payload, {
        "Content-Type": "application/json"
      });
    }),
    map(response => {
      return newExerciseSucceeded();
    })
  );
};

export const rootEpic = combineEpics(addExercise);
