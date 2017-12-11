export type NewExerciseStatus = {
  started?: boolean;
};

export interface Exercise {
  routineId: string;
  _id: string;
  name: string;
  muscleGroup: string;
  target: string;
  gifURL: string;
}

export type ExerciseForm = {
  values: Exercise;
};

type AppForms = {
  newExerciseForm: ExerciseForm;
};

export type State = {
  newExerciseStatus: NewExerciseStatus;
  exercises: [Exercise];
  form: AppForms;
};
