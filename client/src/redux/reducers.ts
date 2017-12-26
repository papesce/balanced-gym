import { combineReducers, Reducer } from "redux";
import * as T from "./actionTypes";
import { handleActions, Action } from "redux-actions";
import { reducer as formReducer } from "redux-form";
import {
  NewExerciseStatus,
  GetExerciseStatus,
  Exercise,
  State,
  MuscleGroupsResult,
  TargetsResult,
  Filter,
  ExercisesReducer
} from "./model";
import { routerReducer } from "react-router-redux";

const newExerciseReducer = handleActions<NewExerciseStatus, Exercise>(
  {
    [T.NEW_EXERCISE_STARTED]: (
      state: NewExerciseStatus,
      action: Action<Exercise>
    ): NewExerciseStatus => {
      return { started: true };
    },
    [T.NEW_EXERCISE_SUCCEEDED]: (
      state: NewExerciseStatus,
      action: Action<Exercise>
    ): NewExerciseStatus => {
      return {};
    }
  },
  {} // initial State
);

const getExerciseReducer = handleActions<GetExerciseStatus, Exercise>(
  {
    [T.GET_EXERCISE_STARTED]: (
      state: GetExerciseStatus,
      action: Action<any>
    ): GetExerciseStatus => {
      return { loading: true };
    },
    [T.GET_EXERCISE_SUCCEEDED]: (
      state: GetExerciseStatus,
      action: Action<Exercise>
    ): GetExerciseStatus => {
      return { exercise: action.payload };
    },
    [T.EDIT_EXERCISE_STARTED]: (
      state: GetExerciseStatus,
      action: Action<Exercise>
    ): GetExerciseStatus => {
      return { exercise: state.exercise, started: true };
    },
    [T.EDIT_EXERCISE_SUCCEEDED]: (
      state: GetExerciseStatus,
      action: Action<Exercise>
    ): GetExerciseStatus => {
      return { exercise: action.payload };
    }
  },
  { loading: true } // initial State
);

const exercisesReducer: Reducer<ExercisesReducer>  = handleActions(
  {
    [T.GET_EXERCISES_STARTED]: (
      state: ExercisesReducer,
      action: Action<any>
    ): ExercisesReducer => {
      return { data: [], loading: true };
    },
    [T.GET_EXERCISES_SUCCEEDED]: (
      state: ExercisesReducer,
      action: Action<Array<Exercise>>
    ): ExercisesReducer => {
      const result: ExercisesReducer = {
          data: (action.payload ? action.payload : [])};
      return result;
    }
  },
  {data: []}
);

const muscleGroupReducer = handleActions(
  {
    [T.SET_MUSCLE_GROUP]: (state: string, action: Action<string>): string => {
      return action.payload ? action.payload : "";
    }
  },
  ""
);

const muscleGroupsReducer = handleActions(
  {
    [T.GET_MUSCLE_GROUPS_SUCCEEDED]: (
      state: MuscleGroupsResult,
      action: Action<MuscleGroupsResult>
    ): MuscleGroupsResult => {
      return action.payload ? { muscleGroups: action.payload } : {};
    }
  },
  { loading: true }
);

const targetReducer = handleActions(
  {
    [T.SET_TARGET]: (state: string, action: Action<string>): string => {
      return action.payload ? action.payload : "";
    }
  },
  ""
);

const targetsReducer = handleActions(
  {
    [T.GET_TARGETS_SUCCEEDED]: (
      state: TargetsResult,
      action: Action<TargetsResult>
    ): TargetsResult => {
      return action.payload ? { targets: action.payload } : {};
    }
  },
  { loading: true }
);

const filterReducer: Reducer<Filter> = combineReducers({
  targets: targetsReducer,
  muscleGroups: muscleGroupsReducer,
  selectedMuscleGroup: muscleGroupReducer,
  selectedTarget: targetReducer,
});

export const rootReducer: Reducer<State> = combineReducers({
  newExerciseStatus: newExerciseReducer,
  getExerciseStatus: getExerciseReducer,
  exercises: exercisesReducer,
  form: formReducer,
  filter: filterReducer,
  router: routerReducer
});
