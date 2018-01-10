import * as React from "react";
import { ExerciseForm } from "../component/ExerciseForm";
import { connect, Dispatch } from "react-redux";
import { State, Exercise, GetExerciseStatus } from "../redux/model";
import { getExerciseStarted, editExerciseStarted, getMusclesStarted } from "../redux/actions";

interface EditExerciseCProps {
  exerciseId: string;
  onClick: (ex: Exercise) => void;
  getExerciseStatus?: GetExerciseStatus;
  getExerciseStarted?: (exId: string) => void;
  muscles?: MuscleResult;
}

export class EditExerciseC extends React.Component<EditExerciseCProps> {
  constructor(props: EditExerciseCProps) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(exercise) {
      this.props.onClick(exercise);
  }
  componentDidMount() {
    if (this.props.getExerciseStarted) {
      this.props.getExerciseStarted(this.props.exerciseId);
    }
    // debugger
    if (this.props.muscles.loading) {
      this.props.getMuscleListStarted();
    }
  }
  render() {
    // debugger;
    const { getExerciseStatus = {} } = this.props;
    const loading: boolean = getExerciseStatus.loading === true;
    const started: boolean = getExerciseStatus.started === true;
    if (loading) {
      return <div>loading...</div>;
    }
    if (getExerciseStatus.exercise) {
      const exercise: Exercise = getExerciseStatus.exercise;
      // debugger;
      return (
        <ExerciseForm
          handleClick={this.handleClick}
          started={started}
          buttonLabel="Save"
          initialValues={exercise}
          muscles={this.props.muscles}
        />
      );
    }
    return <div>Error !</div>;
  }
}

const mapStateToProps = (state: State) => {
  // debugger;
  return {
    getExerciseStatus: state.getExerciseStatus,
    muscles : state.filter.muscles
  };
};

const mapDispatchToProps = (dispatch: Dispatch<State>) => {

  return {
    onClick: (exercise: Exercise) => {
      dispatch(editExerciseStarted(exercise));
    },
    getExerciseStarted: (exId: string) => dispatch(getExerciseStarted(exId)),
    getMuscleListStarted: () => dispatch(getMusclesStarted()) 
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(EditExerciseC);
