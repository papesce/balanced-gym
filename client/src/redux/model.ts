export type NewExerciseStatus = {
  started?: boolean;
};

export type GetExerciseStatus = {
  loading?: boolean;
  exercise?: Exercise;
  started?: boolean;
};

export interface Exercise {
  routineId: string;
  _id: string;
  name: string;
  muscleGroup: string;
  target: string;
  gifURL: string;
  multiplier?: number;
  equipment?: string;
}

export interface ExerciseQuery {
  muscleGroup?: string;
  target?: string;
}

export type ExerciseForm = {
  values: Exercise;
};

type AppForms = {
  newExerciseForm: ExerciseForm;
};

export type MuscleGroupsResult = {
  muscleGroups?: Array<string>;
  loading?: boolean;
};

export type TargetsResult = {
  targets?: Array<string>;
  loading?: boolean;
};

export type Filter = {
  selectedTarget: string;
  selectedMuscleGroup: string;
  targets?: TargetsResult;
  muscleGroups?: MuscleGroupsResult;
};

export const DEFAULT_STATE: State = {
  filter: {
    selectedMuscleGroup: "",
    selectedTarget: ""
  }
};

export type State = {
  newExerciseStatus?: NewExerciseStatus;
  getExerciseStatus?: GetExerciseStatus;
  exercises?: [Exercise];
  filter: Filter;
  form?: AppForms;
};
