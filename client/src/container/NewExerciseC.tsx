import * as React from "react";
import { NewExercise } from "../component/NewExercise";
import { connect, Dispatch } from "react-redux";
import {
  State,
  Exercise,
  ExerciseForm,
  NewExerciseStatus
} from "../redux/reducers";
import { newExerciseStarted } from "../redux/actions";

interface NewExerciseRCProps {
  onClick: (ex: Exercise) => void;
  newExerciseForm?: ExerciseForm;
  newExerciseStatus?: NewExerciseStatus;
}

interface StateToProps {
  newExerciseStatus?: NewExerciseStatus;
  newExerciseForm?: ExerciseForm;
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
    if (this.props.newExerciseForm) {
      const ex: ExerciseForm = this.props.newExerciseForm;
      this.props.onClick(ex.values);
    }
  }
  render() {
    // debugger;
    const { newExerciseStatus } = this.props;
    const started: boolean = newExerciseStatus ? newExerciseStatus.started === true : false;
    return <NewExercise handleClick={this.handleClick} started={started} />;
  }
}

const mapStateToProps = (state: State): StateToProps => {
  // debugger;
  return {
    newExerciseStatus: state.newExerciseStatus,
    newExerciseForm: state.form.newExerciseForm
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch<State>,
  ownProps: NewExerciseRCProps
) => {
  return {
    onClick: (newExerciseForm: Exercise) => {
      dispatch(newExerciseStarted(newExerciseForm));
    }
  };
};

const NewExerciseC = connect<StateToProps, DispatchToProps>(
  mapStateToProps,
  mapDispatchToProps
)(NewExerciseRC);

export { NewExerciseC };
