import * as React from "react";
import { Component } from "react";
import { Label, FormGroup, Input, Form } from "reactstrap";

export interface MuscleGroupFormProps {
  handleChange: (value: string) => void;
  defaultValue: string;
  muscleGroups: Array<string>;
  loading: boolean;
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
    const { muscleGroups, defaultValue = "", loading } = this.props;
    return (
      <Form className="muscle-group-form">
        <FormGroup>
          <Label>MuscleGroup:</Label>
          {loading && <div>loading...</div>}
          {!loading &&
          <Input
            type="select"
            onChange={this.onChange}
            defaultValue={defaultValue}
          >
            <option value="">
              All
            </option>
            {muscleGroups.map((muscleGroup, index) => (
              <option
                key={index}
                value={muscleGroup}
              >
                {muscleGroup}
              </option>
            ))}
          </Input>}
        </FormGroup>
      </Form>
    );
  }
}

export { MuscleGroupForm };
