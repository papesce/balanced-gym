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
import { newExerciseStarted, getMusclesStarted } from "../redux/actions";

interface NewExerciseCProps {
  onClick: (ex: Exercise) => void;
  newExerciseStatus?: NewExerciseStatus;
  getMuscleListStarted?: () => void;
  muscles?: MusclesResult;
}

export class NewExerciseC extends React.Component<NewExerciseCProps> {
  handleClick = (exercise: Exercise) => {
    this.props.onClick(exercise);
  };
  componentDidMount() {
    if (
      this.props.muscles &&
      this.props.muscles.loading &&
      this.props.getMuscleListStarted
    ) {
      this.props.getMuscleListStarted();
    }
  }
  render() {
    const { newExerciseStatus, muscles } = this.props;
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
      />
    );
  }
}

const mapStateToProps = (state: State) => {
  return {
    newExerciseStatus: state.newExerciseStatus,
    muscles: state.filter.muscles
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onClick: (newExerciseForm: Exercise) => {
      dispatch(newExerciseStarted(newExerciseForm));
    },
    getMuscleListStarted: () => dispatch(getMusclesStarted())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewExerciseC);
