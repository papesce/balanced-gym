import * as React from "react";
import { Component } from "react";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem/MenuItem";
import { MusclesResult } from "../../redux/model";

interface TargetSelectProps {
  initialValue: Muscle;
  onChange: string => void;
  muscles: MusclesResult;
}

class TargetSelect extends Component<TargetSelectProps> {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event, index, value) {
    // debugger
    let val = "";
    if (index > 0) {
      val = this.props.muscles.muscles[index - 1];
    }
    this.props.onChange(val);
  }
  render() {
    // debugger
    const { muscles, initialValue = "None" } = this.props;
    if (muscles.loading) {
      return <div> loading muscles... </div>;
    }
    if (muscles.muscles) {
      const musclesList = muscles.muscles;
      return (
        
        <div>
          <SelectField
            floatingLabelText="Target"
            value={initialValue}
            onChange={this.handleChange}
          >
            <MenuItem value={"None"} primaryText="None" />
            {musclesList.map(muscle => (
              <MenuItem
                key={muscle._id}
                value={muscle._id}
                primaryText={muscle.name}
              />
            ))}
          </SelectField>
         
        </div>
      );
    }
    return <div> Error loading muscles </div>;
  }
}

export default TargetSelect;
