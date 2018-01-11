// @flow
import * as React from "react";
import { Component } from "react";
import { Label, FormGroup, Input, Form } from "reactstrap";
import { Muscle } from "../redux/model";

export interface TargetFormProps {
  handleChange: (value: string) => void;
  defaultValue: string;
  targets: Array<Muscle>;
  loading: boolean;
}

class TargetForm extends Component<TargetFormProps> {
  constructor(props: TargetFormProps) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }
  onChange = (event: any) => {
    this.props.handleChange(event.target.value);
  }
  render() {
    const { targets, defaultValue = "", loading } = this.props;
    return (
      <Form className="muscle-group-form">
        <FormGroup>
          <Label>Target:</Label>
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
            {targets.map((muscleGroup, index) => (
              <option
                key={index}
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

export { TargetForm };
