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
          <ControlLabel>Routine:</ControlLabel>
          <FormControl componentClass="select" >
           <option value="59ee3ddc243a5977dab96c2b">Chest Triceps Forearms</option>
          <option value="59f0c59d4e55c40d38868034">Thighs Shoulders Calves Hips</option>
      </FormControl>
          </FormGroup>
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
