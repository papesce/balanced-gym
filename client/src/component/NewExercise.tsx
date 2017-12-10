import * as React from "react";
import { Component } from "react";
import { Button } from "react-bootstrap";
import { Field, reduxForm, InjectedFormProps } from "redux-form";
import { RoutineSelect } from "./newexercise/RoutineSelect";
import { NameField } from "./newexercise/NameField";
import { MuscleGroupField } from "./newexercise/MuscleGroupField";
import { TargetField } from "./newexercise/TargetField";
import { GifURLField } from "./newexercise/GifURLField";
import "./NewExercise.css";

interface NewExerciseFormData {
  routineId: string;
  name: string;
  muscleGroup: string;
  target: string;
  gifURL: string;
}

export interface NewExerciseProps {
  handleClick: () => void;
}

type InjectedProps = InjectedFormProps<NewExerciseFormData, NewExerciseProps>;

class NewExerciseForm extends Component<NewExerciseProps & InjectedProps, {}> {
  render() {
    // debugger;
    return (
      <form className="new-exercise">
        <Field name="routineId" component={RoutineSelect} />
        <Field name="name" component={NameField} />
        <Field name="muscleGroup" component={MuscleGroupField} />
        <Field name="target" component={TargetField} />
        <Field name="gifURL" component={GifURLField} />
        <Button bsStyle="primary" onClick={this.props.handleClick}>
          Add exercise
        </Button>
      </form>
    );
  }
}

const NewExercise = reduxForm<NewExerciseFormData, NewExerciseProps>({
  form: "newExerciseForm",
  initialValues: {
    routineId: "59f0c59d4e55c40d38868034",
    name: "",
    target: "",
    muscleGroup: "",
    gifURL: ""
  }
})(NewExerciseForm);

export { NewExercise };
