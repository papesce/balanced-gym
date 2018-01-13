// @flow
import * as React from "react";
import { Component } from "react";
import { getEquipments } from "../Equipments";
import { SelectField } from "material-ui";
import MenuItem from "material-ui/MenuItem/MenuItem";

const styles = {
  customWidth: {
    width: 300
  }
};

interface EquipmentSelectProps {
  initialValue: string;
  onChange: string => void;
}

class EquipmentSelect extends Component<EquipmentSelectProps> {
  handleChange = (event: any, index: any, value: string) => {
    this.props.onChange(value);
  }
  render() {
    const equipments = getEquipments();
    const { initialValue = "None" } = this.props;
    return (
      <SelectField
      floatingLabelText="Equipment"
      value={initialValue}
      onChange={this.handleChange}
      style={styles.customWidth}
    >
      <MenuItem value={"None"} primaryText="None" />
      {equipments.map((eq, index) => (
        <MenuItem
          key={index}
          value={eq.value}
          primaryText={eq.name}
        />
      ))}
    </SelectField>
    );
  }
}

export { EquipmentSelect };
