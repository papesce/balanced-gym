import * as React from "react";
import { Component } from "react";
import {
    WrappedFieldProps,
    GenericFieldHTMLAttributes
  } from "redux-form";
import { FormControl, FormGroup, ControlLabel} from "react-bootstrap";
  
class RoutineSelect extends Component<
WrappedFieldProps & GenericFieldHTMLAttributes
> {
render() {
  // debugger;
  return (
    <FormGroup>
      <ControlLabel>Routine:</ControlLabel>
      <FormControl
        componentClass="select"
        onChange={this.props.input.onChange}
        defaultValue={this.props.input.value}
      >
       
        <option value="59ee3ddc243a5977dab96c2b">
        Chest Triceps Forearms
        </option>
        <option value="59f0c59d4e55c40d38868034">
        Thighs Shoulders Calves Hips
        </option>
        <option value="59f3a4fb73da258989f47cf0">
        Back Biceps Waist Neck
        </option>
        <option value="59ee3ddc243a5977dab96c2b">
          Chest Triceps Forearms (local)
        </option>
        <option value="59f0c59d4e55c40d38868034">
          Thighs Shoulders Calves Hips (local)
        </option>
      </FormControl>
    </FormGroup>
  );
}
}

export { RoutineSelect };