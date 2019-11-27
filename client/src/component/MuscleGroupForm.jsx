import * as React from "react";
import { Component } from "react";
import { Label, FormGroup, Input, Form } from "reactstrap";

export interface MuscleGroupFormProps {
  handleChange: (value: string) => void;
  defaultValue: string;
  muscleGroups: Array<MuscleGroup>;
  loading: boolean;
}

class MuscleGroupForm extends Component<MuscleGroupFormProps> {
  constructor(props: MuscleGroupFormProps) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }
  onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.handleChange(event.target.value);
  }
  render() {
    const { muscleGroups, defaultValue = "", loading } = this.props;
    return (
      <Form>
        <FormGroup>
          <Label>Group:</Label>
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
                key={muscleGroup._id}
                value={muscleGroup._id}
              >
                {muscleGroup.name}
              </option>
            ))}
          </Input>}
        </FormGroup>
      </Form>
    );
  }
}

export { MuscleGroupForm };
