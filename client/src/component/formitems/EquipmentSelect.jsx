import * as React from "react";
import { Component } from "react";
import { Label, FormGroup, Input } from "reactstrap";

class EquipmentSelect extends Component {
  render() {
    return (
      <FormGroup>
        <Label>Equipment:</Label>
        <Input
          type="select"
          onChange={this.props.input.onChange}
          defaultValue={this.props.input.value}
        >
        <option value="">
             None
          </option>
          <option value="Dumbbell">
            1 Dumbbell
          </option>
          <option value="Dumbbells">
            2 Dumbbells
          </option>
          <option value="Barbell Long">
            Barbell Long
          </option>
          <option value="Barbell Short">
            Barbell Short
          </option>
          <option value="TRX">
            TRX
          </option>
        </Input>
      </FormGroup>
    );
  }
}

export { EquipmentSelect };
