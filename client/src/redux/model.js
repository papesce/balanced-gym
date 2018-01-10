interface NewExerciseStatus {
  started?: boolean;
}

interface EditExerciseStatus {
  started?: boolean;
}

interface SetMuscleStatus {
  started?: boolean;
}

interface Muscle {
  _id: string;
  name: string;
  muscleURL: string;
}

interface Exercise {
  routineId: string;
  _id: string;
  name: string;
  muscleGroup: string;
  target: Muscle;
  gifURL: string;
  exerciseURL?: string;
  synergists?: string;
  equipment?: string;
  lastReps?: string;
  lastWeight?: string;
  normalizedWeight?: string;
  suggestedSerie?: any;
}

interface GetExerciseStatus {
  loading?: boolean;
  exercise?: Exercise;
  started?: boolean;
}

interface ExerciseQuery {
  muscleGroup?: string;
  target?: string;
}

// export interface ExerciseForm {
//   values: Exercise;
// }

// interface AppForms {
//   newExerciseForm: ExerciseForm;
// }

export interface MuscleGroupsResult {
  muscleGroups?: Array<string>;
  loading?: boolean;
}

interface MusclesResult {
  muscles?: Array<Muscle>;
  loading?: boolean;
}


export interface Filter {
  selectedTarget: string;
  selectedMuscleGroup: string;
  muscles?: MusclesResult;
  muscleGroups?: MuscleGroupsResult;
}

export interface Targets {
  target: string;
  exercises: Array<Exercise>;
}

export interface GroupedExercises {
  targets?: Array<Targets>;
  loading?: boolean;
  targetOpen?: Set<String>;
}

interface State {
  newExerciseStatus?: NewExerciseStatus;
  editExerciseSatus?: EditExerciseStatus;
  setMuscleStatus?: SetMuscleStatus;
  getExerciseStatus?: GetExerciseStatus;
  groupedExercises?: GroupedExercises;
  filter: Filter;
}

const DEFAULT_STATE: State = {
  filter: {
    selectedMuscleGroup: "",
    selectedTarget: ""
  }
};

interface Routine {
  _id: string;
  name: string;
}



export {
  NewExerciseStatus,
  SetMuscleStatus,
  Routine,
  Muscle,
  Exercise,
  MusclesResult,
  State,
  ExerciseQuery,
  DEFAULT_STATE,
  GetExerciseStatus
};
