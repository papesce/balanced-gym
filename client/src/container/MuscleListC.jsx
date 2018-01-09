import React, { Component } from "react";
import { connect } from "react-redux";
import { State, TargetsResult } from "../redux/model";
import { getMusclesStarted } from "../redux/actions";

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
         <ul>
      {muscles.muscles.map( (muscle, index) => {
        return (<li key={index}> {muscle.name} </li>);
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
  const muscles = state.filter ? state.filter.muscles : {};
  return { muscles: muscles };
};

const mapDispatchToProps = (dispatch): MuscleListRCProps => {
  return { 
    getMuscleListStarted: () => dispatch(getMusclesStarted()) 
  };
};

const MuscleListC = connect(mapStateToProps, mapDispatchToProps)(MuscleListRC);

export { MuscleListC };
