import * as React from "react";
import { Component } from "react";
import { WrappedFieldProps, GenericFieldHTMLAttributes } from "redux-form";
import { Label, FormGroup, Input } from "reactstrap";
import { connect } from "react-redux";

class TargetSelect extends Component<
  WrappedFieldProps & GenericFieldHTMLAttributes
> {
  render() {
    // debugger;
    // getRoutines();
    const { muscles } = this.props;
    if (muscles.loading) {
      return <div> loading... </div>;
    }
    if (muscles.muscles) {
      debugger;
      let val = this.props.input.value;
      //if (typeof val === 'string') {
      //  const values = muscles.muscles.filter( muscle => 
      //    muscle.name === val)
      //  if (values.length > 0) { 
      //    val = values[0]._id;
      //  }
      //}
      return (
        <FormGroup>
          <Label>Target:</Label>
          <Input
            type="select"
            onChange={this.props.input.onChange}
            defaultValue={val}
          >
            <option value="">None</option>
            {muscles.muscles.map((muscle, index) => (
              <option key={index} value={muscle._id}>
                {muscle.name}
              </option>
            ))}
          </Input>
        </FormGroup>
      );
    };
    return (<div> Error loading muscles </div>)
  }
}

const mapStateToProps = state => {
  // debugger;
  return {
    muscles: state.filter.muscles
  };
};

export default connect(mapStateToProps)(TargetSelect);
