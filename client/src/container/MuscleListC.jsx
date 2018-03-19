// @flow
import React, { Component } from "react";
import { connect } from "react-redux";
import { State, TargetsResult } from "../redux/model";
import { getMusclesStarted } from "../redux/actions";
import { MuscleList } from "../component/MuscleList";
import { push } from "react-router-redux";
import MDSpinner from "react-md-spinner";

interface MuscleListCProps {
  muscles?: TargetsResult;
  getMuscleListStarted?: () => void;
  editMuscle?: (muscleId: string) => void; 
}

class MuscleListC extends Component<MuscleListCProps> {
  componentDidMount() {
    if (this.props.getMuscleListStarted) {
      this.props.getMuscleListStarted();
    }
  }
  render() {
    const { muscles = {}, editMuscle } = this.props;
    if (muscles.loading) {
      // return <div>loading... </div>;
      return <MDSpinner />
    } 
    if (muscles.muscles) {
      return (
        <MuscleList muscles={muscles.muscles} onClick={editMuscle} />
      );
    }
    return <div>error loading muscle list</div>;
  }
}

const mapStateToProps = (state: State): MuscleListCProps => {
  const muscles = state.filter ? state.filter.muscles : {};
  return { muscles: muscles };
};

const mapDispatchToProps = (dispatch): MuscleListCProps => {
  return {
    getMuscleListStarted: () => dispatch(getMusclesStarted()),
    editMuscle: (muscleId: string) => dispatch(push(`/editMuscle/${muscleId}`))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MuscleListC);


