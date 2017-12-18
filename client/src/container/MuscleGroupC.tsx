import * as React from "react";
import { MuscleGroupForm } from "../component/MuscleGroupForm";
import { connect, Dispatch } from "react-redux";
import { State, ExerciseQuery } from "../redux/model";
import { getExercisesStarted } from "../redux/actions";

interface MuscleGroupRCProps {
    getExercisesStarted?: (exerciseQuery: ExerciseQuery) => void;
}

export class MuscleGroupRC extends React.Component<MuscleGroupRCProps> {
  constructor(props: MuscleGroupRCProps) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange = value => {
      if (this.props.getExercisesStarted) {
         this.props.getExercisesStarted({muscleGroup: value});
     }
  }
  render() {
    // debugger;
    return (
      <MuscleGroupForm
        defaultValue={""}
        handleChange={this.handleChange}
      />
    );
  }
}

const mapStateToProps = (state: State): MuscleGroupRCProps => {
  return {};
};

const mapDispatchToProps = (
  dispatch: Dispatch<State>,
  ownProps: MuscleGroupRCProps
) => {
  return {
    getExercisesStarted: (exerciseQuery: ExerciseQuery) =>
      dispatch(getExercisesStarted(exerciseQuery))
  };
};

const MuscleGroupC = connect<MuscleGroupRCProps>(
  mapStateToProps,
  mapDispatchToProps
)(MuscleGroupRC);

export { MuscleGroupC };
