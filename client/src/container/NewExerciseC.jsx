// @flow
import * as React from "react";
import { ExerciseForm } from "../component/ExerciseForm";
import { connect } from "react-redux";
import {
  State,
  Exercise,
  NewExerciseStatus,
  MusclesResult
} from "../redux/model";
import { newExerciseStarted, getMusclesStarted, getMuscleGroupsStarted } from "../redux/actions";
import { goBack } from "react-router-redux";

interface NewExerciseCProps {
  onClick: (ex: Exercise) => void;
  newExerciseStatus?: NewExerciseStatus;
  getMuscleListStarted?: () => void;
  muscles?: MusclesResult;
}

export class NewExerciseC extends React.Component<NewExerciseCProps> {
  handleClick = (exercise: Exercise) => {
    this.props.onClick(exercise);
    this.props.finish()
  };
  componentDidMount() {
    if (
      this.props.muscles &&
      this.props.muscles.loading &&
      this.props.getMuscleListStarted
    ) {
      this.props.getMuscleListStarted();
    }
    if (
      this.props.muscleGroups &&
      this.props.muscleGroups.loading &&
      this.props.getMuscleGroupsStarted
    ) {
      this.props.getMuscleGroupsStarted();
    }
  }
  render() {
    const { newExerciseStatus, muscles, muscleGroups } = this.props;
    const started: boolean = newExerciseStatus
      ? newExerciseStatus.started === true
      : false;
    const loading: boolean = muscles ? muscles.loading : true;
    if (loading) {
      return <div>loading...</div>;
    }
    return (
      <ExerciseForm
        handleClick={this.handleClick}
        started={started}
        buttonLabel="Add New Exercise"
        initialValue={null}
        muscles={muscles}
        muscleGroups={muscleGroups}
      />
    );
  }
}

const mapStateToProps = (state: State) => {
  return {
    newExerciseStatus: state.newExerciseStatus,
    muscles: state.filter.muscles,
    muscleGroups: state.filter.muscleGroups
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onClick: (newExerciseForm: Exercise) => {
      dispatch(newExerciseStarted(newExerciseForm));
    },
    getMuscleListStarted: () => dispatch(getMusclesStarted()),
    getMuscleGroupsStarted: () => dispatch(getMuscleGroupsStarted()),
    finish: () => dispatch(goBack())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewExerciseC);
