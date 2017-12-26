import * as React from "react";
import { Component } from "react";
import { WrappedFieldProps, GenericFieldHTMLAttributes } from "redux-form";
import { Label, FormGroup, Input } from "reactstrap";
import { getRoutines } from "../Routines";

class RoutineSelect extends Component<
  WrappedFieldProps & GenericFieldHTMLAttributes
> {
  render() {
    const routines = getRoutines();
    return (
      <FormGroup>
        <Label>Routine:</Label>
        <Input
          type="select"
          onChange={this.props.input.onChange}
          defaultValue={this.props.input.value}
        >

         <option value="">
            None
          </option>
         {routines.map((routine, index) => (
              <option
                key={index}
                value={routine._id}
              >
                {routine.name}
              </option>
         ))}
        </Input>
      </FormGroup>
    );
  }
}

export { RoutineSelect };
