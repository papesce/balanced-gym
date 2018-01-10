import * as React from "react";
import { ExerciseForm } from "../component/ExerciseForm";
import { connect, Dispatch } from "react-redux";
import {
  State,
  Exercise,
  NewExerciseStatus
} from "../redux/model";
import { newExerciseStarted } from "../redux/actions";

interface NewExerciseCProps {
  onClick: (ex: Exercise) => void;
  newExerciseStatus?: NewExerciseStatus;
}

interface StateToProps {
  newExerciseStatus?: NewExerciseStatus;
}

export class NewExerciseC extends React.Component<NewExerciseCProps> {
  constructor(props: NewExerciseCProps) {
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
      <ExerciseForm
        handleClick={this.handleClick}
        started={started}
        buttonLabel="Add New Exercise"
        initialValues={{routineId: "59f0c59d4e55c40d38868034"}}
      />
    );
  }
}

const mapStateToProps = (state: State): StateToProps => {
  return {
    newExerciseStatus: state.newExerciseStatus,
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

export default connect/*<StateToProps, DispatchToProps>*/(
  mapStateToProps,
  mapDispatchToProps
)(NewExerciseC);

