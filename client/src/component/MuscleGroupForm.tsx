import * as React from "react";
import { Component } from "react";
import { Form } from "reactstrap";
import { Field, reduxForm, InjectedFormProps } from "redux-form";
import { MuscleGroupSelect } from "./formitems/MuscleGroupSelect";
import { Exercise } from "../redux/model";
import "./NewExerciseForm.css";

export interface MuscleGroupFormProps {
}

type InjectedProps = InjectedFormProps<Exercise, MuscleGroupFormProps>;

class MuscleGroupFormU extends Component<MuscleGroupFormProps & InjectedProps, {}> {
  render() {
    return (
      <Form className="muscle-group-form">
         <Field name="muscleGroup" component={MuscleGroupSelect} /> 
      </Form>
    );
  }
}

const MuscleGroupForm = reduxForm<Exercise, MuscleGroupFormProps>({
  form: "muscleGroupForm",
})(MuscleGroupFormU);

export { MuscleGroupForm };
