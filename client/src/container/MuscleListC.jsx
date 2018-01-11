import React, { Component } from "react";
import { connect } from "react-redux";
import { State, TargetsResult } from "../redux/model";
import { getMusclesStarted } from "../redux/actions";
import { MuscleList } from "../component/MuscleList";
import { push } from "react-router-redux";

interface MuscleListRCProps {
  muscles?: TargetsResult;
  getMuscleListStarted?: () => void;
}

class MuscleListRC extends Component<MuscleListRCProps> {
  componentDidMount() {
    if (this.props.getMuscleListStarted) {
      this.props.getMuscleListStarted();
    }
  }
  render() {
    // debugger;
    const { muscles = {} } = this.props;
    if (muscles.loading) {
      return <div>loading... </div>;
    }
    if (muscles.muscles) {
      // debugger;
      return (
        <MuscleList muscles={muscles.muscles} onClick={this.props.editMuscle} />
      );
    }
    return <div>error loading muscle list</div>;
  }
}

const mapStateToProps = (state: State): MuscleListRCProps => {
  const muscles = state.filter ? state.filter.muscles : {};
  return { muscles: muscles };
};

const mapDispatchToProps = (dispatch): MuscleListRCProps => {
  return {
    getMuscleListStarted: () => dispatch(getMusclesStarted()),
    editMuscle: (muscleId: string) => dispatch(push(`/editMuscle/${muscleId}`))
  };
};

const MuscleListC = connect(mapStateToProps, mapDispatchToProps)(MuscleListRC);

export { MuscleListC };
