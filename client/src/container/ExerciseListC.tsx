import * as React from "react";
import { ExerciseList } from "../component/ExerciseList";
import { connect, Dispatch } from "react-redux";
import { Exercise, State } from "../redux/model";
import { getExercisesStarted } from "../redux/actions";

interface ExerciseListRCProps {
  exercises?: [Exercise];
  getRoutinesStarted?: () => void;
}

class ExerciseListRC extends React.Component<ExerciseListRCProps> {
  componentDidMount() {
    if (this.props.getRoutinesStarted) {
      this.props.getRoutinesStarted();
    }
  }
  render() {
    const { exercises = [] } = this.props;
    return <ExerciseList exercises={exercises} />;
  }
}

const mapStateToProps = (state: State): ExerciseListRCProps => {
  return { exercises: state.exercises };
};

const mapDispatchToProps = (dispatch: Dispatch<State>): ExerciseListRCProps => {
  return {
    getRoutinesStarted: () => dispatch(getExercisesStarted())
  };
};

const ExerciseListC = connect<ExerciseListRCProps>(
  mapStateToProps,
  mapDispatchToProps
)(ExerciseListRC);

export { ExerciseListC };
