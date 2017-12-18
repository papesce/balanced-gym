import * as React from "react";
import { MuscleGroupForm } from "../component/MuscleGroupForm";
import { connect, Dispatch } from "react-redux";
import {
  State
} from "../redux/model";

interface MuscleGroupRCProps {
}

interface StateToProps {
}

interface DispatchToProps {
}

export class MuscleGroupRC extends React.Component<MuscleGroupRCProps> {
  constructor(props: MuscleGroupRCProps) {
    super(props);
  }
  render() {
   // debugger;
    return (
      <MuscleGroupForm
        initialValues={{muscleGroup: ""}}
      />
    );
  }
}

const mapStateToProps = (state: State): StateToProps => {
  return {
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch<State>,
  ownProps: MuscleGroupRCProps
) => {
  return {
  };
};

const MuscleGroupC = connect<StateToProps, DispatchToProps>(
  mapStateToProps,
  mapDispatchToProps
)(MuscleGroupRC);

export { MuscleGroupC };