import * as React from "react";
import { Component } from "react";
import { WrappedFieldProps, GenericFieldHTMLAttributes } from "redux-form";
import { Label, FormGroup, Input } from "reactstrap";

class EquipmentSelect extends Component<
  WrappedFieldProps & GenericFieldHTMLAttributes
> {
  render() {
    // debugger;
    return (
      <FormGroup>
        <Label>Equipment:</Label>
        <Input
          type="select"
          onChange={this.props.input.onChange}
          defaultValue={this.props.input.value}
        >
          <option value="Barbell Long">
            Barbell Long
          </option>
          <option value="Dumbbell">
            Dumbbell
          </option>
          <option value="Barbell Short">
            Barbell Short
          </option>
          <option value="">
             None
          </option>
        </Input>
      </FormGroup>
    );
  }
}

export { EquipmentSelect };
