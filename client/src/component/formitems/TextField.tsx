import * as React from "react";
import { Component } from "react";
import { WrappedFieldProps, GenericFieldHTMLAttributes } from "redux-form";
import { FormFeedback, Label, Input, FormGroup } from "reactstrap";

interface CustomProps {
  label: string;
  placeholder: string;
}

type FieldProps = CustomProps & WrappedFieldProps & GenericFieldHTMLAttributes;

class TextField extends Component<FieldProps> {
  render() {
    const { label } = this.props;
    const { error } = this.props.meta;
    const showError = error;
    /**/  
    return (
      <FormGroup >
        <Label>{label}</Label>
        <Input 
          {...(showError ? { valid: false } : {})}
          type="text"
          defaultValue={this.props.input.value}
          placeholder={this.props.placeholder}
          onChange={this.props.input.onChange}
        />
        {showError && <FormFeedback>{error}</FormFeedback>} 
      </FormGroup>
    );
  }
}

export { TextField };
