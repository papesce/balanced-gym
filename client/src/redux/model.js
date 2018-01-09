interface NewExerciseStatus {
  started?: boolean;
}

interface NewMuscleStatus {
  started?: boolean;
}

interface Exercise {
  routineId: string;
  _id: string;
  name: string;
  muscleGroup: string;
  target: string;
  gifURL: string;
  muscleURL?: string;
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

export interface ExerciseForm {
  values: Exercise;
}

interface AppForms {
  newExerciseForm: ExerciseForm;
}

export interface MuscleGroupsResult {
  muscleGroups?: Array<string>;
  loading?: boolean;
}

interface TargetsResult {
  targets?: Array<string>;
  loading?: boolean;
}

interface MusclesResult {
  targets?: Array<string>;
  loading?: boolean;
}


export interface Filter {
  selectedTarget: string;
  selectedMuscleGroup: string;
  targets?: TargetsResult;
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
  newMuscleStatus?: NewMuscleStatus;
  getExerciseStatus?: GetExerciseStatus;
  groupedExercises?: GroupedExercises;
  filter: Filter;
  form?: AppForms;
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

interface Muscle {
  _id: string;
  name: string;
  muscleGif: string;
}

export {
  NewExerciseStatus,
  NewMuscleStatus,
  Routine,
  Muscle,
  Exercise,
  TargetsResult,
  MusclesResult,
  State,
  ExerciseQuery,
  DEFAULT_STATE,
  GetExerciseStatus
};
