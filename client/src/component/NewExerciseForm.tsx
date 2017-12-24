import * as React from "react";
import { Component } from "react";
import { Button, Form } from "reactstrap";
import { Field, reduxForm, InjectedFormProps } from "redux-form";
import { RoutineSelect } from "./formitems/RoutineSelect";
import { TextField } from "./formitems/TextField";
import { Exercise } from "../redux/model";
import { EquipmentSelect } from "./formitems/EquipmentSelect";

export interface NewExerciseProps {
  handleClick: () => void;
  started: boolean;
  buttonLabel: string;
}

type InjectedProps = InjectedFormProps<Exercise, NewExerciseProps>;

const required = value => {
  return value ? undefined : "Required";
};

class NewExerciseFormU extends Component<NewExerciseProps & InjectedProps, {}> {
  render() {
    // debugger;
    const { started, valid, buttonLabel } = this.props;
    return (
      <Form>
         <Field name="routineId" component={RoutineSelect} /> 
        <Field
          name="name"
          validate={[required]}
          component={TextField}
          label="Name"
          placeholder="Enter exercise name"
        />
        <Field
          name="muscleGroup"
          validate={[required]}
          component={TextField}
          label="Muscle Group"
          placeholder="Enter muscle group"
        />
        <Field
          name="target"
          validate={[required]}
          component={TextField}
          label="Target"
          placeholder="Enter target muscle"
        />
        <Field
          name="gifURL"
          validate={[required]}
          component={TextField}
          label="Gif URL"
          placeholder="Enter Gif URL"
        /> 
         <Field
          name="multiplier"
          validate={[required]}
          component={TextField}
          label="Multiplier"
          placeholder="Enter the multiplier"
         /> 
         <Field
          name="equipment"
          component={EquipmentSelect}
         /> 
        <Button
          color="primary"
          disabled={started || !valid}
          onClick={this.props.handleClick}
        >
          {buttonLabel}
        </Button>
      </Form>
    );
  }
}

const NewExerciseForm = reduxForm<Exercise, NewExerciseProps>({
  form: "newExerciseForm",
})(NewExerciseFormU);

export { NewExerciseForm };
