
import React, { Component } from "react";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";

interface MuscleGroupSelectProps {
  initialValues: Array<Muscle>;
  onChange: string => void;
  muscles: MusclesResult;
}



class MuscleGroupSelect extends Component<MuscleGroupSelectProps> {
  handleChange = (event, index, value) => {
    this.props.onChange(value);
  }
  menuItems(values, muscleList) {
    return muscleList.muscleGroups.map((muscle, index) => {
       return (
         <MenuItem
           key={muscle._id}
           insetChildren={true}
    //       checked={values && values.indexOf(muscle) > -1}
           value={muscle._id}
           primaryText={muscle.name}
         />
       );
     });
  }
  render() {
    const { muscleGroups, initialValue = "", label, placeholder } = this.props;
     if (muscleGroups.loading) {
       return <div> loading muscle groups... </div>;
     }
     if (muscleGroups) {
       return (
        <SelectField
           floatingLabelText={label}
           hintText={placeholder}
           value={initialValue}
           onChange={this.handleChange}
    //       fullWidth={true}
         >
          {this.menuItems(initialValue, muscleGroups)}
         </SelectField>
      );
     }
  }
}

export default MuscleGroupSelect;
