// @flow
import * as React from "react";
import { Component } from "react";
import RoutineSelect from "./formitems/RoutineSelect";
import { EquipmentSelect } from "./formitems/EquipmentSelect";
import { TextEntryField } from "./formitems/TextEntryField";
import "./ExerciseForm.css";
import TargetSelect from "./formitems/TargetSelect";
import { MusclesResult, Exercise, Muscle } from "../redux/model";
import MuscleSelect from "./formitems/MuscleSelect";
import RaisedButton from "material-ui/RaisedButton";
import MuscleGroupSelect from './formitems/MuscleGroupSelect';

interface ExerciseFormProps {
  handleClick: (exercise: Exercise) => void;
  started: boolean;
  buttonLabel: string;
  initialValue: Exercise;
  muscles: MusclesResult;
}

class ExerciseForm extends Component<ExerciseFormProps, Exercise> {
  constructor(props: ExerciseFormProps) {
    super(props);
    this.state = { ...this.props.initialValue };
  }
  onRoutineIdChange = (value: string) => {
    this.setState({ routineId: value });
  };
  onEquipmentChange = (value: string) => {
    this.setState({ equipment: value });
  };
  onNameChange = (value: string) => {
    this.setState({ name: value });
  };
  onExternalLinkChange = (value: string) => {
    this.setState({ links: [value] });
  };
  onMuscleGroupChange = (value: string) => {
    this.setState({ muscleGroup: value });
  };
  onTargetChange = (value: Muscle) => {
    this.setState({ target: value });
  };
  onGifURLChange = (value: string) => {
    this.setState({ gifURL: value });
  };
  onExerciseURLChange = (value: string) => {
    this.setState({ exerciseURL: value });
  };
  onSynergistsChange = (value: Array<Muscle>) => {
    this.setState({ synergists: value });
  };
  onStabilizersChange = (value: Array<Muscle>) => {
    this.setState({ stabilizers: value });
  };
  handleClick = () => {
    const exercise = this.state;
    this.props.handleClick(exercise);
  };
  render() {

    const { buttonLabel, muscles, muscleGroups } = this.props;
    const muscleURL = this.state.target ? this.state.target.muscleURL : "";
    const targetId = this.state.target ? this.state.target._id : "";

    return (
      <div className="exercise-form">
        <TextEntryField
          style={{width: "600px"}}
          label="Name"
          placeholder="Enter exercise name"
          initialValue={this.state.name}
          onChange={this.onNameChange}
        />
        <br/>
        <TextEntryField
          style={{width: "600px"}}
          label="External Link"
          // placeholder="Enter exercise name"
          initialValue={this.state.links?this.state.links[0]:""}
          onChange={this.onExternalLinkChange}
        />
        <br/>
        <RoutineSelect
          onChange={this.onRoutineIdChange}
          initialValue={this.state.routineId}
        />
        <span style={{margin:"10px"}}>&nbsp;</span>
        <MuscleGroupSelect 
          label="Muscle Group (required)"
          placeholder="Enter the muscle group (reuqired)"
          muscleGroups={muscleGroups}
          initialValue={this.state.muscleGroup}
          onChange={this.onMuscleGroupChange}
        />
        {/* <TextEntryField
          label="Muscle Group"
          placeholder="Enter muscle group"
          initialValue={this.state.muscleGroup}
          onChange={this.onMuscleGroupChange}
        /> */}
        <br/>
        <TargetSelect
          style={{width: "300px"}}
          muscles={muscles}
          initialValue={targetId}
          onChange={this.onTargetChange}
        />
        <img alt="muscleURL" style={{ width: "auto", maxHeight: "250px" }} src={muscleURL} />
        <br/>
        <TextEntryField
          style={{width: "300px"}}
          label="Gif URL"
          placeholder="Enter Gif URL"
          initialValue={this.state.gifURL}
          onChange={this.onGifURLChange}
        />
        <span style={{margin:"10px"}}>&nbsp;</span>
        <img alt="gif URL" style={{ width: "200px" }} src={this.state.gifURL} />
        <br/>
        <TextEntryField
          style={{width: "300px"}}
          label="Exercise URL"
          placeholder="Enter Exercise URL"
          initialValue={this.state.exerciseURL}
          onChange={this.onExerciseURLChange}
        />
        <span style={{margin:"10px"}}>&nbsp;</span>
        <img
          alt="exerciseURL"
          style={{ width: "400px" }}
          src={this.state.exerciseURL}
        />
        <br/>
        <MuscleSelect
          label="Synergists"
          placeholder="Select the Synergists"
          muscles={this.props.muscles}
          initialValues={this.state.synergists}
          onChange={this.onSynergistsChange}
        />
        <MuscleSelect
          label="Stabilizers"
          placeholder="Select the Stabilizers"
          muscles={this.props.muscles}
          initialValues={this.state.stabilizers}
          onChange={this.onStabilizersChange}
        />
        <EquipmentSelect 
         onChange={this.onEquipmentChange}
         initialValue={this.state.equipment}
        />
        <br/>
        <RaisedButton
          label={buttonLabel}
          primary={true}
          onClick={this.handleClick}
        />
      </div>
    );
  }
}

export { ExerciseForm };
