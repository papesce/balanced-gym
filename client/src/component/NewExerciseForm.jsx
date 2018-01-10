import * as React from "react";
import { Component } from "react";
import { Button, Form } from "reactstrap";
import { Field, reduxForm, InjectedFormProps } from "redux-form";
import { RoutineSelect } from "./formitems/RoutineSelect";
import { TextField } from "./formitems/TextField";
import { Exercise } from "../redux/model";
import { EquipmentSelect } from "./formitems/EquipmentSelect";
import "./NewExerciseForm.css";
import TargetSelect from "./formitems/TargetSelect";

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
    // debugger
    const { started, valid, buttonLabel, initialValues } = this.props;
    const { gifURL = "" , exerciseURL = "", target = {}} = initialValues; 
    const { muscleURL = "" } = target;
    debugger;
    return (
      <Form className="exercise-form">
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
          component={TargetSelect}
        />
        <img alt="muscleURL" style={{ width: "200px" }} src={muscleURL}/>
        <Field
          name="gifURL"
          validate={[required]}
          component={TextField}
          label="Gif URL"
          placeholder="Enter Gif URL"
        /> 
         
         <img alt="gif URL" style={{ width: "200px" }} src={gifURL}/>
         <Field
          name="exerciseURL"
          component={TextField}
          label="Exercise URL"
          placeholder="Enter Exercise URL"
         /> 
          <img alt="exerciseURL" style={{ width: "400px" }} src={exerciseURL}/>
          <Field
           name="synergists"
           component={TextField}
           label="Synergists"
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

const NewExerciseForm = reduxForm/*<Exercise, NewExerciseProps>*/({
  form: "newExerciseForm",
})(NewExerciseFormU);

export { NewExerciseForm };
