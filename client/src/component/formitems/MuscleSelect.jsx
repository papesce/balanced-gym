import React, { Component } from "react";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";

interface MuscleSelectProps {
  initialValues: Array<Muscle>;
  onChange: string => void;
  muscles: MusclesResult;
}

class MuscleSelect extends Component<MuscleSelectProps> {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event, index, values) {
    debugger;
    const value = this.props.muscles.muscles.filter(
      muscle => values.indexOf(muscle._id) >= 0
    );
    this.props.onChange(value);
  }
  menuItems(values, muscleList) {
    return muscleList.map(muscle => {
      return (
        <MenuItem
          key={muscle._id}
          insetChildren={true}
          checked={values && values.indexOf(muscle) > -1}
          value={muscle._id}
          primaryText={muscle.name}
        />
      );
    });
  }
  render() {
    const { muscles, initialValues = [] } = this.props;
    if (muscles.loading) {
      return <div> loading... </div>;
    }
    if (muscles.muscles) {
      const muscleList = muscles.muscles;
      return (
        <SelectField
          floatingLabelText="Synergists"
          multiple={true}
          hintText="Select the Synergists"
          value={initialValues.map(v => v._id)}
          onChange={this.handleChange}
          fullWidth={true}
        >
          {this.menuItems(initialValues, muscleList)}
        </SelectField>
      );
    }
  }
}

export default MuscleSelect;
