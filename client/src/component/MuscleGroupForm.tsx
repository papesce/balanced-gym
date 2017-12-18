import * as React from "react";
import { Component } from "react";
import { Label, FormGroup, Input, Form } from "reactstrap";

export interface MuscleGroupFormProps {
  handleChange: (value: string) => void;
  defaultValue: string;
}

class MuscleGroupForm extends Component<MuscleGroupFormProps> {
  constructor(props: MuscleGroupFormProps) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }
  onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // debugger;
    this.props.handleChange(event.target.value);
  }
  render() {
    // debugger;
    return (
      <Form className="muscle-group-form">
        <FormGroup>
          <Label>MuscleGroup:</Label>
          <Input
            type="select"
            onChange={this.onChange}
            defaultValue={this.props.defaultValue}
          >
            <option value="">All</option>
            <option value="Chest">Chest</option>
            <option value="Biceps">Biceps</option>
            <option value="Shoulders">Shoulders</option>
            <option value="Triceps">Triceps</option>
            <option value="Forearms">Forearms</option>
            <option value="Thighs">Thighs</option>
            <option value="Calves">Calves</option>
            <option value="Back">Back</option>
            <option value="Waist">Waist</option>
            <option value="Neck">Neck</option>            
          </Input>
        </FormGroup>
      </Form>
    );
  }
}

export { MuscleGroupForm };
