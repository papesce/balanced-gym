import * as React from "react";
import { ExerciseList } from "../component/ExerciseList";
import { connect, Dispatch } from "react-redux";
import { Exercise, State, ExerciseQuery } from "../redux/model";
import { getExercisesStarted } from "../redux/actions";
import { push } from "react-router-redux";

interface ExerciseListRCProps {
  exercises?: [Exercise];
  exerciseQuery?: ExerciseQuery;
  getExercisesStarted?: (exerciseQuery: ExerciseQuery) => void;
  editExercise?: (exId: String) => void;
}

class ExerciseListRC extends React.Component<ExerciseListRCProps> {
  componentDidMount() {
    if (this.props.getExercisesStarted && this.props.exerciseQuery) {
      this.props.getExercisesStarted(this.props.exerciseQuery);
    }
  }
  render() {
    const { exercises = [], editExercise = x => x } = this.props;
    return <ExerciseList exercises={exercises} editExercise={editExercise} />;
  }
}

const mapStateToProps = (state: State): ExerciseListRCProps => {
  // debugger;
  return {
    exercises: state.exercises,
    exerciseQuery: {
      muscleGroup: state.selectedMuscleGroup ? state.selectedMuscleGroup : ""
    }
  };
};

const mapDispatchToProps = (dispatch: Dispatch<State>): ExerciseListRCProps => {
  return {
    getExercisesStarted: (exerciseQuery: ExerciseQuery) =>
      dispatch(getExercisesStarted(exerciseQuery)),
    editExercise: (exId: string) => dispatch(push(`/editExercise/${exId}`))
  };
};

const ExerciseListC = connect<ExerciseListRCProps>(
  mapStateToProps,
  mapDispatchToProps
)(ExerciseListRC);

export { ExerciseListC };
