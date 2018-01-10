import * as React from "react";
import { Component } from "react";
import TextField from 'material-ui/TextField';



interface CustomProps {
  label: string;
  placeholder: string;
  initialValue: string;
  onChange : (string) => void;
}

class TextEntryField extends Component<CustomProps> {
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event){
    this.props.onChange( event.target.value)
  }
  render() {
    const { label, placeholder } = this.props;
    const {initialValue = "" } = this.props;
      return (
      <TextField
      defaultValue={initialValue}
      floatingLabelText={label}
      hintText={placeholder}
      onChange={this.handleChange}
      fullWidth={true}
       />
      // <FormGroup >
        // <Input 
          // defaultValue={this.props.input.value}
          // placeholder={this.props.placeholder}
          // onChange={this.props.input.onChange}
        /// >
        // {showError && <FormFeedback>{error}</FormFeedback>} 
      // </FormGroup>
    );
  }
}

export { TextEntryField };
