// @flow
import * as React from "react";
import { connect } from "react-redux";
import { State, Exercise, GetExerciseStatus, Muscle } from "../redux/model";
import { getExerciseStarted } from "../redux/actions";
import { MuscleList } from "../component/MuscleList";
import { push } from "react-router-redux";

interface ShowExerciseCProps {
  exerciseId: string;
  getExerciseStatus?: GetExerciseStatus;
  getExerciseStarted?: (exId: string) => void;
  editMuscle: (muscleId: string) => void;
}

export class ShowExerciseC extends React.Component<ShowExerciseCProps> {
  // handleClick = (exercise: Exercise) => {
  //   this.props.onClick(exercise);
  // }
  componentDidMount() {
    if (this.props.getExerciseStarted) {
      this.props.getExerciseStarted(this.props.exerciseId);
    }
  }
  render() {
    const { getExerciseStatus = {} } = this.props;
    const loading: boolean = getExerciseStatus.loading === true;
    if (loading) {
      return <div>loading...</div>;
    }
    if (getExerciseStatus.exercise) {
      debugger;
      const exercise: Exercise = getExerciseStatus.exercise;
      const { target = {}, synergists = [],  } = exercise; 
      const muscles: Array<Muscle> = [target, ...synergists];
      return (
          <MuscleList
            muscles={muscles}
            onClick={this.props.editMuscle}
          />
      );
    }
    return <div>Error !</div>;
  }
}

const mapStateToProps = (state: State) => {
  return {
    getExerciseStatus: state.getExerciseStatus
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editMuscle: (muscleId: string) => dispatch(push(`/editMuscle/${muscleId}`)),
    getExerciseStarted: (exId: string) => dispatch(getExerciseStarted(exId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowExerciseC);
