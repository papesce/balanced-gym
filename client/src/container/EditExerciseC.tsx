import * as React from "react";
import { NewExerciseForm } from "../component/NewExerciseForm";
import { connect, Dispatch } from "react-redux";
import {
  State,
  Exercise,
  ExerciseForm,
  GetExerciseStatus
} from "../redux/model";
import { getExerciseStarted, editExerciseStarted } from "../redux/actions";

interface EditExerciseRCProps {
  exerciseId: string;
  onClick: (ex: Exercise) => void;
  // exercise?: Exercise;
  newExerciseForm?: ExerciseForm;
  getExerciseStatus?: GetExerciseStatus;
  getExerciseStarted?: (exId: string) => void;
}

interface StateToProps {
  // exercise?: Exercise;
  getExerciseStatus?: GetExerciseStatus;
  newExerciseForm?: ExerciseForm;
}

interface DispatchToProps {
  onClick: (ex: Exercise) => void;
}

export class NewExerciseRC extends React.Component<EditExerciseRCProps> {
  constructor(props: EditExerciseRCProps) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    if (this.props.newExerciseForm) {
      const ex: ExerciseForm = this.props.newExerciseForm;
      this.props.onClick(ex.values);
    }
  }
  componentDidMount() {
    if (this.props.getExerciseStarted) {
      this.props.getExerciseStarted(this.props.exerciseId);
    }
  }
  render() {
    // debugger;
    const { getExerciseStatus = {} } = this.props;
    const loading: boolean = getExerciseStatus.loading === true;
    const started: boolean = getExerciseStatus.started === true;
    if (loading) {
      return (<div>loading...</div>);
    }
    if (getExerciseStatus.exercise) {
      const exercise: Exercise = getExerciseStatus.exercise;
      return (
      <NewExerciseForm
        handleClick={this.handleClick}
        started={started}
        buttonLabel="Save"
        initialValues={exercise}
      />);
    } 
    return (<div>Error !</div>); 
  }
}

const mapStateToProps = (
  state: State,
  ownProps: EditExerciseRCProps
): StateToProps => {
  return {
    getExerciseStatus: state.getExerciseStatus,
    newExerciseForm: state.form ? state.form.newExerciseForm : state.form
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch<State>,
  ownProps: EditExerciseRCProps
) => {
  return {
    onClick: (editExerciseForm: Exercise) => {
      dispatch(editExerciseStarted(editExerciseForm));
    },
    getExerciseStarted: (exId: string) => dispatch(getExerciseStarted(exId))
  };
};

const EditExerciseC = connect<StateToProps, DispatchToProps>(
  mapStateToProps,
  mapDispatchToProps
)(NewExerciseRC);

export { EditExerciseC };
