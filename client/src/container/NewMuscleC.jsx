import React, { Component } from "react";
import { connect } from "react-redux";
import { newMuscleStarted } from "../redux/actions";
import { MuscleForm } from "../component/MuscleForm";

class NewMuscleC extends Component {
  render() {
    return (
      <div>
        <MuscleForm
          handleClick={this.props.addMuscle}
          buttonLabel="Add Muscle"
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    muscles: state.filter.muscles
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addMuscle: muscle => dispatch(newMuscleStarted(muscle))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewMuscleC);
