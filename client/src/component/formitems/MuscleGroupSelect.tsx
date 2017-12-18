import * as React from "react";
import { Component } from "react";
import { WrappedFieldProps, GenericFieldHTMLAttributes } from "redux-form";
import { Label, FormGroup, Input } from "reactstrap";

class MuscleGroupSelect extends Component<
  WrappedFieldProps & GenericFieldHTMLAttributes
> {
  render() {
    // debugger;
    return (
      <FormGroup>
        <Label>MuscleGroup:</Label>
        <Input
          type="select"
          onChange={this.props.input.onChange}
          defaultValue={this.props.input.value}
        >
          <option value="">
            All
          </option>
          <option value="Chest">
            Chest
          </option>
          <option value="Biceps">
            Biceps
          </option>
        </Input>
      </FormGroup>
    );
  }
}

export { MuscleGroupSelect };