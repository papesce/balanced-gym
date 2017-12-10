import * as React from "react";
import { Component } from "react";
import { WrappedFieldProps, GenericFieldHTMLAttributes } from "redux-form";
import { FormControl, FormGroup, ControlLabel } from "react-bootstrap";

type FieldProps = WrappedFieldProps & GenericFieldHTMLAttributes;

class TargetField extends Component<FieldProps> {
  constructor(props: FieldProps) { 
    super(props);
  }
  render() {
    // debugger;
    return (
      <FormGroup>
        <ControlLabel>Target:</ControlLabel>
        <FormControl
          type="text"
          defaultValue={this.props.input.value}
          placeholder="Enter target muscle"
          onChange={this.props.input.onChange}
        />
        <FormControl.Feedback />
      </FormGroup>
    );
  }
}

export { TargetField };
