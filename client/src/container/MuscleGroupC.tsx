import * as React from "react";
import { MuscleGroupForm } from "../component/MuscleGroupForm";
import { connect, Dispatch } from "react-redux";
import { State, ExerciseQuery } from "../redux/model";
import { setMuscleGroup, getExercisesStarted, getMuscleGroupsStarted } from "../redux/actions";

interface MuscleGroupRCProps {
    setMuscleGroup?: (value: string) => void;
    getExercisesStarted?: (exerciseQuery: ExerciseQuery) => void;
    getMuscleGroupsStarted?: () => void;
    selectedMuscleGroup: string;
    loading?: boolean;
    muscleGroups?: Array<string>;
}

export class MuscleGroupRC extends React.Component<MuscleGroupRCProps> {
  constructor(props: MuscleGroupRCProps) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    if (this.props.getMuscleGroupsStarted) {
      this.props.getMuscleGroupsStarted();
    }
  }
  handleChange = value => {
      if (this.props.setMuscleGroup) {
         this.props.setMuscleGroup(value);
      }
      if (this.props.getExercisesStarted) {
        this.props.getExercisesStarted({muscleGroup: value});
    }
  }
  render() {
    // debugger;
    const {muscleGroups = []} = this.props;
    return (
      <MuscleGroupForm
        muscleGroups={muscleGroups}
        handleChange={this.handleChange}
        defaultValue={this.props.selectedMuscleGroup}
        loading={this.props.loading !== undefined}
      />
    );
  }
}

const mapStateToProps = (state: State): MuscleGroupRCProps => {
  // debugger;
  return {
    selectedMuscleGroup: state.selectedMuscleGroup,
    loading: state.muscleGroups ? state.muscleGroups.loading : false,
    muscleGroups: state.muscleGroups ? state.muscleGroups.muscleGroups : []
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch<State>,
  ownProps: MuscleGroupRCProps
) => {
  return {
    setMuscleGroup: (value: string) =>
      dispatch(setMuscleGroup(value)),
    getExercisesStarted: (exerciseQuery: ExerciseQuery) =>
      dispatch(getExercisesStarted(exerciseQuery)),
    getMuscleGroupsStarted: () => dispatch(getMuscleGroupsStarted())  
  };
};

const MuscleGroupC = connect<MuscleGroupRCProps>(
  mapStateToProps,
  mapDispatchToProps
)(MuscleGroupRC);

export { MuscleGroupC };
