import * as React from "react";
import { Component } from "react";
import { FormControl, FormGroup, ControlLabel, Button } from "react-bootstrap";
import "./NewExercise.css";

export interface NewExerciseProps {
  handleClick: () => void;
}

export class NewExercise extends Component<NewExerciseProps> {
  render() {
    return (
      <form className="new-exercise">
        <FormGroup>
          <ControlLabel>Name:</ControlLabel>
          <FormControl
            type="text"
            defaultValue="this.state.value"
            placeholder="Enter exercise name"
          />
          <FormControl.Feedback />
        </FormGroup>
        <Button bsStyle="primary" onClick={this.props.handleClick}>Add exercise</Button>
        
      </form>
    );
  }
}
