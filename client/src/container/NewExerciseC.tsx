import * as React from "react";
import { NewExercise } from "../component/NewExercise";
import { connect, Dispatch } from "react-redux";
import { State, Exercise } from "../redux/reducers";
import { newExercise } from "../redux/actions";

interface NewExerciseRCProps {
  onClick: () => void;
  newExerciseForm?: Exercise;
}

interface StateToProps {
   // newExerciseForm: Exercise;
}

interface DispatchToProps {
  onClick: () => void;
}

export class NewExerciseRC extends React.Component<NewExerciseRCProps> {
  render() {
    const {onClick} = this.props; 
    return <NewExercise handleClick={onClick} />;
  }
}

const mapStateToProps = (state: State) => {
  debugger;
  return {
    newExerciseForm: state.form.newExerciseForm
     ? state.form.newExerciseForm.values
      : {}
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch<State>
) => {
  return {
    onClick: () => { 
      debugger;
      dispatch(newExercise("routineId"));
    }
  };
};

const NewExerciseC = connect<StateToProps, DispatchToProps>(mapStateToProps, mapDispatchToProps)(
  NewExerciseRC
);

export { NewExerciseC };
