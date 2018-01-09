import * as React from "react";
import { ExerciseList } from "../component/ExerciseList";
import { connect, Dispatch } from "react-redux";
import { State, ExerciseQuery, GroupedExercises } from "../redux/model";
import { getExercisesStarted } from "../redux/actions";
import { push } from "react-router-redux";

interface ExerciseListRCProps {
  groupedExercises?: GroupedExercises;
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
    const { groupedExercises = {}, editExercise = x => x } = this.props;
    if (groupedExercises.loading) {
      return (<div style={{ paddingLeft: "40px" }}>loading...</div>);
    }
    if (groupedExercises.targets) {
      return <ExerciseList targets={groupedExercises.targets} editExercise={editExercise} />;
    }
    return <div />;
  }
}

const mapStateToProps = (state: State): ExerciseListRCProps => {
  const exerciseQuery: ExerciseQuery = {};
  if (state.filter.selectedMuscleGroup !== "") {
    exerciseQuery.muscleGroup = state.filter.selectedMuscleGroup;
  }
  if (state.filter.selectedTarget !== "") {
    exerciseQuery.target = state.filter.selectedTarget;
  }
  return {
    groupedExercises: state.groupedExercises,
    exerciseQuery: exerciseQuery
  };
};

const mapDispatchToProps = (dispatch: Dispatch<State>): ExerciseListRCProps => {
  return {
    getExercisesStarted: (exerciseQuery: ExerciseQuery) =>
      dispatch(getExercisesStarted(exerciseQuery)),
    editExercise: (exId: string) => dispatch(push(`/editExercise/${exId}`))
  };
};

const ExerciseListC = connect/*<ExerciseListRCProps>*/(
  mapStateToProps,
  mapDispatchToProps
)(ExerciseListRC);

export { ExerciseListC };
