import * as React from "react";
import { Component } from "react";
import { FormControl, FormGroup, ControlLabel, Button } from "react-bootstrap";
import {
  Field,
  reduxForm,
  InjectedFormProps,
  WrappedFieldProps,
  GenericFieldHTMLAttributes
} from "redux-form";
import "./NewExercise.css";

interface NewExerciseFormData {
  routineId: string;
}

export interface NewExerciseProps {
  handleClick: () => void;
}

type InjectedProps = InjectedFormProps<NewExerciseFormData, NewExerciseProps>;

class RoutineComponent extends Component<
  WrappedFieldProps & GenericFieldHTMLAttributes
> {
  render() {
    // debugger;
    return (
      <FormGroup>
        <ControlLabel>Routine:</ControlLabel>
        <FormControl
          componentClass="select"
          onChange={this.props.input.onChange}
          defaultValue={this.props.input.value}
        >
          <option value="59ee3ddc243a5977dab96c2b">
            Chest Triceps Forearms
          </option>
          <option value="59f0c59d4e55c40d38868034">
            Thighs Shoulders Calves Hips
          </option>
        </FormControl>
      </FormGroup>
    );
  }
}

class NewExerciseForm extends Component<NewExerciseProps & InjectedProps, {}> {
  render() {
    return (
      <form className="new-exercise">
        <Field name="routineId" component={RoutineComponent} />
        <FormGroup>
          <ControlLabel>Name:</ControlLabel>
          <FormControl
            type="text"
            defaultValue="this.state.value"
            placeholder="Enter exercise name"
          />
          <FormControl.Feedback />
        </FormGroup>
        <Button bsStyle="primary" onClick={this.props.handleClick}>
          Add exercise
        </Button>
      </form>
    );
  }
}

const NewExercise = reduxForm<NewExerciseFormData, NewExerciseProps>({
  form: "newExerciseForm",
  initialValues: {routineId: "59f0c59d4e55c40d38868034"}
})(NewExerciseForm);

export { NewExercise };
