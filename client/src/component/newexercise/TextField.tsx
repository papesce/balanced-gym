import * as React from "react";
import { Component } from "react";
import { WrappedFieldProps, GenericFieldHTMLAttributes } from "redux-form";
import {
  FormControl,
  FormGroup,
  ControlLabel,
  HelpBlock
} from "react-bootstrap";

interface CustomProps {
  label: string;
  placeholder: string;
}

type FieldProps = CustomProps & WrappedFieldProps & GenericFieldHTMLAttributes;

class TextField extends Component<FieldProps> {
  render() {
    // debugger;
    const { label } = this.props;
    const { error} = this.props.meta;
    const showError = error;
    return (
      <FormGroup {...(showError ? { validationState: "error" } : {})}>
        <ControlLabel>{label}</ControlLabel>
        <FormControl
          type="text"
          defaultValue={this.props.input.value}
          placeholder={this.props.placeholder}
          onChange={this.props.input.onChange}
        />
        <FormControl.Feedback />
        {showError && <HelpBlock>{error}</HelpBlock>}
      </FormGroup>
    );
  }
}

export { TextField };
