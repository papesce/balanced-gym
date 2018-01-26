// @flow
import { combineReducers, Reducer } from "redux";
import * as T from "./actionTypes";
import { handleActions, Action } from "redux-actions";
import {
  NewExerciseStatus,
  NewMuscleStatus,
  GetMuscleStatus,
  GetExerciseStatus,
  State,
  MuscleGroupsResult,
  TargetsResult,
  Filter,
  GroupedExercises
} from "./model";
import { routerReducer } from "react-router-redux";

const newExerciseReducer = handleActions(
  {
    [T.NEW_EXERCISE_STARTED]: (state, action): NewExerciseStatus => {
      return { started: true };
    },
    [T.NEW_EXERCISE_SUCCEEDED]: (state, action): NewExerciseStatus => {
      return {};
    }
  },
  {} // initial State
);

const newMuscleReducer = handleActions(
  {
    [T.NEW_MUSCLE_STARTED]: (state, action): NewMuscleStatus => {
      return { started: true };
    },
    [T.NEW_MUSCLE_SUCCEEDED]: (state, action): NewMuscleStatus => {
      return {};
    }
  },
  {} // initial State
);

const getMuscleReducer = handleActions(
  {
    [T.GET_MUSCLE_STARTED]: (state, action): GetMuscleStatus => {
      return { loading: true };
    },
    [T.GET_MUSCLE_SUCCEEDED]: (state, action): GetMuscleStatus => {
      return { muscle: action.payload };
    },
    [T.EDIT_MUSCLE_STARTED]: (state, action): GetMuscleStatus => {
      return { muscle: state.muscle, started: true };
    },
    [T.EDIT_MUSCLE_SUCCEEDED]: (state, action): GetMuscleStatus => {
      return { muscle: action.payload };
    }
  },
  { loading: true } // initial State
);

const getExerciseReducer = handleActions(
  {
    [T.GET_EXERCISE_STARTED]: (state, action): GetExerciseStatus => {
      return { loading: true };
    },
    [T.GET_EXERCISE_SUCCEEDED]: (state, action): GetExerciseStatus => {
      return { exercise: action.payload };
    },
    [T.EDIT_EXERCISE_STARTED]: (state, action): GetExerciseStatus => {
      return { exercise: state.exercise, started: true };
    },
    [T.EDIT_EXERCISE_SUCCEEDED]: (state, action): GetExerciseStatus => {
      return { exercise: action.payload };
    }
  },
  { loading: true } // initial State
);

const exercisesReducer: Reducer<GroupedExercises> = handleActions(
  {
    [T.GET_EXERCISES_STARTED]: (state, action): GroupedExercises => {
      return { loading: true };
    },
    [T.GET_EXERCISES_SUCCEEDED]: (state, action): GroupedExercises => {
      return { targets: action.payload };
    },
    [T.GET_EXERCISES_FAILED]: (state, action): GroupedExercises => {
      return { error: action.payload };
    }
  },
  {}
);

const muscleGroupReducer = handleActions(
  {
    [T.SET_MUSCLE_GROUP]: (state, action): string => {
      return action.payload ? action.payload : "";
    }
  },
  ""
);

const muscleGroupsReducer = handleActions(
  {
    [T.GET_MUSCLE_GROUPS_SUCCEEDED]: (state, action): MuscleGroupsResult => {
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

// const targetsReducer = handleActions(
//  {
//    [T.GET_TARGETS_SUCCEEDED]: (
//      state: TargetsResult,
//      action: Action<TargetsResult>
//    ): TargetsResult => {
//      return action.payload ? { targets: action.payload } : {};
//    }
//  },
//  { loading: true }
// );

const musclesReducer = handleActions(
  {
    [T.GET_MUSCLES_SUCCEEDED]: (state, action): TargetsResult => {
      return action.payload ? { muscles: action.payload } : {};
    }
  },
  { loading: true }
);

const filterReducer: Reducer<Filter> = combineReducers({
  // targets: targetsReducer, //deprecated
  muscles: musclesReducer,
  muscleGroups: muscleGroupsReducer,
  selectedMuscleGroup: muscleGroupReducer,
  selectedTarget: targetReducer
});

export const rootReducer: Reducer<State> = combineReducers({
  newExerciseStatus: newExerciseReducer,
  newMuscleStatus: newMuscleReducer,
  getMuscleStatus: getMuscleReducer,
  getExerciseStatus: getExerciseReducer,
  groupedExercises: exercisesReducer,
  filter: filterReducer,
  router: routerReducer
});
