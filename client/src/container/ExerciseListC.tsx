import * as React from "react";
import { ExerciseList } from "../component/ExerciseList";
import { connect, Dispatch } from "react-redux";
import { Exercise, State } from "../redux/model";
import { getExercisesStarted } from "../redux/actions";
import { push } from "react-router-redux";

interface ExerciseListRCProps {
  exercises?: [Exercise];
  getRoutinesStarted?: () => void;
  editExercise?: (exId: String) => void;
}

class ExerciseListRC extends React.Component<ExerciseListRCProps> {
  componentDidMount() {
    if (this.props.getRoutinesStarted) {
      this.props.getRoutinesStarted();
    }
  }
  render() {
    const { exercises = [], editExercise = x => x } = this.props;
    return <ExerciseList exercises={exercises} editExercise={editExercise} />;
  }
}

const mapStateToProps = (state: State): ExerciseListRCProps => {
  return { exercises: state.exercises };
};

const mapDispatchToProps = (dispatch: Dispatch<State>): ExerciseListRCProps => {
  return {
    getRoutinesStarted: () => dispatch(getExercisesStarted()),
    editExercise: (exId: string) => dispatch(push(`/editExercise/${exId}`))
  };
};

const ExerciseListC = connect<ExerciseListRCProps>(
  mapStateToProps,
  mapDispatchToProps
)(ExerciseListRC);

export { ExerciseListC };
