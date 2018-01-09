import React, { Component } from 'react';
import { connect } from 'react-redux';
import { newMuscleStarted } from '../redux/actions';
import { AddMuscleForm } from '../component/AddMuscleForm'
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
         <AddMuscleForm handleClick={this.props.addMuscle}/>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddMuscleC);