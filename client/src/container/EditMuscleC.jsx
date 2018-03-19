// @flow
import * as React from "react";
import { connect, Dispatch } from "react-redux";
import { State, GetMuscleStatus, Muscle } from "../redux/model";
import { getMuscleStarted, editMuscleStarted } from "../redux/actions";
import { MuscleForm } from "../component/MuscleForm";

interface EditMuscleCProps {
  muscleId: string;
  onClick: (muscle: Muscle) => void;
  getMuscleStatus?: GetMuscleStatus;
  getMuscleStarted?: (muscleId: string) => void
}

export class EditMuscleC extends React.Component<EditMuscleCProps> {
  handleClick = (muscle: Muscle) => {
       this.props.onClick(muscle);
  }
  componentDidMount() {

    if (this.props.getMuscleStarted) {
      this.props.getMuscleStarted(this.props.muscleId);
    }
  }
  render() {
    const { getMuscleStatus = {} } = this.props;
    const loading: boolean = getMuscleStatus.loading === true;
    // const started: boolean = getMuscleStatus.started === true;
     if (loading) {
       return <div>loading...</div>;
     }
     if (getMuscleStatus.muscle) {
       const muscle: Muscle = getMuscleStatus.muscle;
       return (
          <MuscleForm
              handleClick={this.handleClick}
        //   started={started}
             buttonLabel="Save"
             initialValue={muscle}
          />
      );
    }
    return <div>Error !</div>;
  }
}

const mapStateToProps = (state: State) => {
  return {
     getMuscleStatus: state.getMuscleStatus
  };
};

const mapDispatchToProps = (dispatch: Dispatch<State>) => {
  
  return {
     onClick: (muscle: Muscle) => {
       dispatch(editMuscleStarted(muscle));
     },
    getMuscleStarted: (muscleId: string) => dispatch(getMuscleStarted(muscleId)),
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(EditMuscleC);
