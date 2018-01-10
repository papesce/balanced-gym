import * as React from "react";
import { Component } from "react";
import { getRoutines } from "../Routines";
import { SelectField } from "material-ui";
import MenuItem from "material-ui/MenuItem/MenuItem";

const styles = {
  customWidth: {
    width: 250
  }
};

interface RoutineSelectProps {
  initialValue: string;
  onChange: string => void;
}

class RoutineSelect extends Component<RoutineSelectProps> {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event, index, value) {
    this.props.onChange(value);
  }
  render() {
    const routines = getRoutines();
    const { initialValue = "None" } = this.props;
    return (
      <SelectField
        floatingLabelText="Routine"
        value={initialValue}
        onChange={this.handleChange}
        style={styles.customWidth}
      >
        <MenuItem value={"None"} primaryText="None" />
        {routines.map((routine, index) => (
          <MenuItem
            key={index}
            value={routine._id}
            primaryText={routine.name}
          />
        ))}
      </SelectField>
    );
  }
}

export { RoutineSelect };
