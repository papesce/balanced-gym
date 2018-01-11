import React, { Component } from 'react';
import { connect } from 'react-redux';
import { newMuscleStarted } from '../redux/actions';
import { MuscleForm } from '../component/MuscleForm'
function mapStateToProps(state) {
  return {

  };
}

function mapDispatchToProps(dispatch) {
  return {
    addMuscle: (muscle) => dispatch(newMuscleStarted(muscle))
  }
}

class AddMuscleC extends Component {
  render() {
    return (
      <div>
         <MuscleForm handleClick={this.props.addMuscle}/>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddMuscleC);