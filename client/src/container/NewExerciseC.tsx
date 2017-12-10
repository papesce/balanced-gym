import * as React from "react";
import { NewExercise } from "../component/NewExercise";
import { connect, Dispatch } from "react-redux";
import { State, Exercise } from "../redux/reducers";
import { newExercise } from "../redux/actions";

interface NewExerciseRCProps {
  onClick: (ex: Exercise) => void;
  newExerciseForm?: Exercise;
}

interface StateToProps {
  newExerciseForm?: Exercise;
}

interface DispatchToProps {
  onClick: (ex: Exercise) => void;
}

export class NewExerciseRC extends React.Component<NewExerciseRCProps> {
  constructor(props: NewExerciseRCProps) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
     const ex = this.props.newExerciseForm ? this.props.newExerciseForm : {};
     this.props.onClick(ex);
  }
  render() {
    // debugger;
    // const {onClick} = this.props; 
    return <NewExercise handleClick={this.handleClick} />;
  }
}

const mapStateToProps = (state: State) => {
  // debugger;
  return {
    newExerciseForm: state.form.newExerciseForm
     ? state.form.newExerciseForm.values
      : {}
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch<State>, ownProps: NewExerciseRCProps
) => {
  return {
    onClick: (newExerciseForm: Exercise) => { 
      dispatch(newExercise(newExerciseForm));
    }
  };
};

const NewExerciseC = connect<StateToProps, DispatchToProps>(mapStateToProps, mapDispatchToProps)(
  NewExerciseRC
);

export { NewExerciseC };
