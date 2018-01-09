import React, { Component } from "react";
import { connect } from "react-redux";
import { State, TargetsResult } from "../redux/model";
import { getTargetsStarted } from "../redux/actions";

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
    if (muscles.targets) {
      return (
         <ul>
      {muscles.targets.map( (muscle, index) => {
        return (<li key={index}> {muscle} </li>);
      })} 
        </ul> );
    }
    return (
      <div>
        error loading muscle list  
      </div>
    );
  }
}

const mapStateToProps = (state: State): MuscleListRCProps => {
  const muscles = state.filter ? state.filter.targets : {};
  return { muscles: muscles };
};

const mapDispatchToProps = (dispatch): MuscleListRCProps => {
  return { 
    getMuscleListStarted: () => dispatch(getTargetsStarted()) 
  };
};

const MuscleListC = connect(mapStateToProps, mapDispatchToProps)(MuscleListRC);

export { MuscleListC };
