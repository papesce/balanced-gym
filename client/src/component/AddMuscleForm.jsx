//
import React, { Component } from "react";
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import "./AddMuscleForm.css";
import { Muscle } from "../redux/model";

const style = {
  margin: 12,
};

interface AddMuscleFormProps {
  handleClick: (muscle: Muscle) => void;
}

interface AddMuscleFormState {
    name: string;
    muscleURL: string;
    buttonDisabled: boolean;
}

class AddMuscleForm extends Component<AddMuscleFormProps, AddMuscleFormState> {
  constructor(props: AddMuscleFormProps) {
    super(props);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeGif = this.handleChangeGif.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {name: "", buttonDisabled: true};
  }
  handleClick(){
     this.props.handleClick({
      name: this.state.name, 
      muscleURL: this.state.muscleURL,
      });
  }
  handleChangeName(event){
    const name = event.target.value;
    this.setState({
      name: name,
      buttonDisabled : name === ""
    });
    
  }
  handleChangeGif(event){
    this.setState({muscleURL: event.target.value});
  }
  render() {
    return (
      <div className="add-muscle-form">
        <TextField  onChange={this.handleChangeName} hintText="Muscle Name" /><br/>
        <TextField  onChange={this.handleChangeGif} hintText="Muscle Image Url" /><br/>
        <RaisedButton onClick={this.handleClick} disabled={this.state.buttonDisabled} label="Add Muscle" primary={true} style={style} />
      </div>
    );
  }
}

export { AddMuscleForm };
