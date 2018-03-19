import * as React from "react";
import { MuscleGroupForm } from "../component/MuscleGroupForm";
import { connect, Dispatch } from "react-redux";
import { State } from "../redux/model";
import { setMuscleGroup, getMuscleGroupsStarted } from "../redux/actions";

interface MuscleGroupRCProps {
    setMuscleGroup?: (value: string) => void;
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
  }
  render() {
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
  return {
    selectedMuscleGroup: state.filter.selectedMuscleGroup,
    loading: state.filter.muscleGroups ? state.filter.muscleGroups.loading : false,
    muscleGroups: state.filter.muscleGroups ? state.filter.muscleGroups.muscleGroups : []
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch<State>,
  ownProps: MuscleGroupRCProps
) => {
  return {
    setMuscleGroup: (value: string) =>
      dispatch(setMuscleGroup(value)),
    getMuscleGroupsStarted: () => dispatch(getMuscleGroupsStarted())  
  };
};

const MuscleGroupC = connect/*<MuscleGroupRCProps>*/(
  mapStateToProps,
  mapDispatchToProps
)(MuscleGroupRC);

export { MuscleGroupC };
