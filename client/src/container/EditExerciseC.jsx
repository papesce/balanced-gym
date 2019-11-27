// @flow
import * as React from "react";
import { ExerciseForm } from "../component/ExerciseForm";
import { connect, Dispatch } from "react-redux";
import {
  State,
  Exercise,
  GetExerciseStatus,
  MusclesResult
} from "../redux/model";
import {
  getExerciseStarted,
  editExerciseStarted,
  getMusclesStarted,
  getMuscleGroupsStarted
} from "../redux/actions";
import { goBack } from "react-router-redux";

interface EditExerciseCProps {
  exerciseId: string;
  onClick: (ex: Exercise) => void;
  finish: () => void;
  getExerciseStatus?: GetExerciseStatus;
  getExerciseStarted?: (exId: string) => void;
  getMuscleListStarted?: () => void;
  muscles?: MusclesResult;
}

export class EditExerciseC extends React.Component<EditExerciseCProps> {
  handleClick = (exercise: Exercise) => {
    this.props.onClick(exercise);
    this.props.finish();
  }
  componentDidMount() {
    if (this.props.getExerciseStarted) {
      this.props.getExerciseStarted(this.props.exerciseId);
    }

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
    const { getExerciseStatus = {}, muscleGroups, muscles } = this.props;
    const loading: boolean = getExerciseStatus.loading === true;
    const started: boolean = getExerciseStatus.started === true;
    if (loading) {
      return <div>loading...</div>;
    }
    if (getExerciseStatus.exercise) {
      const exercise: Exercise = getExerciseStatus.exercise;
      return (
        <ExerciseForm
          handleClick={this.handleClick}
          started={started}
          buttonLabel="Save"
          initialValue={exercise}
          muscles={muscles}
          muscleGroups={muscleGroups}
        />
      );
    }
    return <div>Error !</div>;
  }
}

const mapStateToProps = (state: State) => {

  return {
    getExerciseStatus: state.getExerciseStatus,
    muscles: state.filter.muscles,
    muscleGroups: state.filter.muscleGroups
  };
};

const mapDispatchToProps = (dispatch: Dispatch<State>) => {
  return {
    onClick: (exercise: Exercise) => {
      dispatch(editExerciseStarted(exercise));
    },
    getExerciseStarted: (exId: string) => dispatch(getExerciseStarted(exId)),
    getMuscleStarted: () => dispatch(getMusclesStarted()),
    getMuscleGroupsStarted: () => dispatch(getMuscleGroupsStarted()),
    finish: () => dispatch(goBack())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditExerciseC);
