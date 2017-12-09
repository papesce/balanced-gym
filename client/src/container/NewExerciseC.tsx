import * as React from "react";
import { NewExercise } from "../component/NewExercise";
import { connect, Dispatch } from "react-redux";
import { State } from "../redux/reducers";
import { newExercise } from "../redux/actions";

interface NewExerciseRCProps {
  onClick: () => void;
}

export class NewExerciseRC extends React.Component<NewExerciseRCProps> {
  render() {
    return <NewExercise handleClick={this.props.onClick} />;
  }
}

const mapDispatchToProps = (dispatch: Dispatch<State>) => {
  return {
    onClick: () => { 
        dispatch(newExercise("New Exercise"));
    }
  };
};

const NewExerciseC = connect(undefined, mapDispatchToProps)(NewExerciseRC);

export { NewExerciseC };
