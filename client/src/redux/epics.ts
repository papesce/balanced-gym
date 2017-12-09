import { combineEpics, ActionsObservable } from "redux-observable";
import { map } from "rxjs/operators/map";
import { mergeMap } from "rxjs/operators/mergeMap";
import { NEW_EXERCISE_STARTED } from "./actionTypes";
import { newExerciseSucceeded } from "./actions";
import { ajax } from "rxjs/observable/dom/ajax";
import { Action } from "redux-actions";
import { Exercise } from "./reducers";

const addExercise = ( action$: ActionsObservable<Action<Exercise>>) => {
  return action$.ofType(NEW_EXERCISE_STARTED)
  .pipe(
    mergeMap( action => { debugger;
      return ajax.getJSON(`http://localhost:5000/newExercise/${action.payload}`)}),
    map((response) => { 
      return newExerciseSucceeded(); }),
  );
}; 

export const rootEpic = combineEpics(addExercise);
