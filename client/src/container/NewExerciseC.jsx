import * as React from "react";
import { NewExerciseForm } from "../component/NewExerciseForm";
import { connect, Dispatch } from "react-redux";
import {
  State,
  Exercise,
  ExerciseForm,
  NewExerciseStatus
} from "../redux/model";
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

// interface DispatchToProps {
//  onClick: (ex: Exercise) => void;
// }

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
    const { newExerciseStatus } = this.props;
    const started: boolean = newExerciseStatus
      ? newExerciseStatus.started === true
      : false;
    return (
      <NewExerciseForm
        handleClick={this.handleClick}
        started={started}
        buttonLabel="Add new Exercise"
        initialValues={{routineId: "59f0c59d4e55c40d38868034"}}
      />
    );
  }
}

const mapStateToProps = (state: State): StateToProps => {
  return {
    newExerciseStatus: state.newExerciseStatus,
    newExerciseForm: state.form ? state.form.newExerciseForm : undefined
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

const NewExerciseC = connect/*<StateToProps, DispatchToProps>*/(
  mapStateToProps,
  mapDispatchToProps
)(NewExerciseRC);

export { NewExerciseC };
