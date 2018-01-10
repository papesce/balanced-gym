import * as React from "react";
import { Component } from "react";
import { RoutineSelect } from "./formitems/RoutineSelect";
import { TextEntryField } from "./formitems/TextEntryField";
// import { Exercise } from "../redux/model";
// import { EquipmentSelect } from "./formitems/EquipmentSelect";
import "./ExerciseForm.css";
import TargetSelect from "./formitems/TargetSelect";
import { MusclesResult } from "../redux/model";
import MuscleSelect from "./formitems/MuscleSelect";
import RaisedButton from "material-ui/RaisedButton";
// import TargetSelect from "./formitems/TargetSelect";
// import MuscleSelect from "./formitems/MuscleSelect";

interface ExerciseFormProps {
  handleClick: () => void;
  started: boolean;
  buttonLabel: string;
  initialValues: Exercise;
  muscles: MusclesResult;
}

interface ExerciseFormState {
  routineId: string;
}

class ExerciseForm extends Component<ExerciseFormProps, ExerciseFormState> {
  constructor(props) {
    super(props);
    // debugger;
    this.state = { ...this.props.initialValues };
  }
  onRoutineIdChange = value => {
    this.setState({ routineId: value });
  };
  onNameChange = value => {
    this.setState({ name: value });
  };
  onMuscleGroupChange = value => {
    this.setState({ muscleGroup: value });
  };
  onTargetChange = value => {
    this.setState({ target: value });
  };
  onGifURLChange = value => {
    this.setState({ gifURL: value });
  };
  onExerciseURLChange = value => {
    this.setState({ exerciseURL: value });
  };
  onSynergistsChange = value => {
    this.setState({ synergists: value });
  };
  handleClick = () => {
    debugger;
    const exercise = this.state;
    this.props.handleClick(exercise);
  };
  render() {
    const { buttonLabel } = this.props;
    const muscleURL = this.state.target ? this.state.target.muscleURL : "";
    return (
      <div className="exercise-form">
        <RoutineSelect
          onChange={this.onRoutineIdChange}
          initialValue={this.state.routineId}
        />
        <br />
        <TextEntryField
          label="Name"
          placeholder="Enter exercise name"
          initialValue={this.state.name}
          onChange={this.onNameChange}
        />
        <br />
        <TextEntryField
          label="Muscle Group"
          placeholder="Enter muscle group"
          initialValue={this.state.muscleGroup}
          onChange={this.onMuscleGroupChange}
        />
        <br />
        <TargetSelect
          muscles={this.props.muscles}
          initialValue={this.state.target._id}
          onChange={this.onTargetChange}
        />
        <br />
        <img alt="muscleURL" style={{ width: "200px" }} src={muscleURL} />
        <br />
        <TextEntryField
          label="Gif URL"
          placeholder="Enter Gif URL"
          initialValue={this.state.gifURL}
          onChange={this.onGifURLChange}
        />
        <br />
        <img alt="gif URL" style={{ width: "200px" }} src={this.state.gifURL} />
        <br />
        <TextEntryField
          label="Exercise URL"
          placeholder="Enter Exercise URL"
          initialValue={this.state.exerciseURL}
          onChange={this.onExerciseURLChange}
        />
        <br />
        <img
          alt="exerciseURL"
          style={{ width: "400px" }}
          src={this.state.exerciseURL}
        />
        <br />
        <MuscleSelect
          muscles={this.props.muscles}
          initialValues={this.state.synergists}
          onChange={this.onSynergistsChange}
        />
        <br />
        {/*<EquipmentSelect/>*/}
        <RaisedButton
          label={buttonLabel}
          primary={true}
          // style={style}
          //  disabled={started || !valid}
          onClick={this.handleClick}
        />
      </div>
    );
  }
}

export { ExerciseForm };
