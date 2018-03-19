// @flow
import React, { Component } from "react";
import RaisedButton from "material-ui/RaisedButton";
import "./MuscleForm.css";
import { Muscle } from "../redux/model";
import { TextEntryField } from "./formitems/TextEntryField";

const style = {
  margin: 12
};

interface MuscleFormProps {
  handleClick: (muscle: Muscle) => void;
  buttonLabel: string;
  initialValue: Muscle;
}


class MuscleForm extends Component<MuscleFormProps, Muscle> {
  constructor(props: MuscleFormProps) {
    super(props);
    this.state = {...this.props.initialValue, buttonDisabled: true };
  }
  handleClick = () => {
    const muscle = this.state;
    this.props.handleClick(muscle);
  };
  handleChangeName = (value: string) => {
    this.setState({
      name: value,
      buttonDisabled: value === ""
    });
  };
  handleChangeGif = (value: string) => {
    this.setState({ muscleURL: value });
  };
  render() {
    const { buttonLabel } = this.props;
    return (
      <div className="add-muscle-form">
        <TextEntryField
          label="Muscle Name"
          placeholder="Enter Muscle Name"
          initialValue={this.state.name}
          onChange={this.handleChangeName}
        />
        <br />
        <TextEntryField
          label="Muscle Image URL"
          placeholder="Enter Muscle Image URL"
          onChange={this.handleChangeGif}
          initialValue={this.state.muscleURL}
        />
        <br />
        <img alt="muscleURL" style={{ width: "auto", maxHeight: "250px" }} src={this.state.muscleURL} />
        <br />
        <RaisedButton
          onClick={this.handleClick}
          // disabled={this.state.buttonDisabled}
          label={buttonLabel}
          primary={true}
          style={style}
        />
      </div>
    );
  }
}

export { MuscleForm };
