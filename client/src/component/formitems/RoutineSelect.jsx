// @flow
import * as React from "react";
import { Component } from "react";
import { SelectField } from "material-ui";
import MenuItem from "material-ui/MenuItem/MenuItem";
import { connect } from "react-redux";
import { getRoutinesStarted } from "../../redux/actions"

const styles = {
  customWidth: {
    width: 300
  }
};

interface RoutineSelectProps {
  initialValue: {_id: string};
  routines: any;
  onChange: ({_id: string}) => void;
  fetchRoutines: () => any;
}

class RoutineSelect extends Component<RoutineSelectProps> {
  handleChange = (event: any, index: any, id: string) => {
    const value = this.props.routines.payload.find( r => r._id === id);
    this.props.onChange(value);
  };
  componentDidMount = () => {
    if (this.props.fetchRoutines) 
      this.props.fetchRoutines();
  }
  render() {
    const {
      initialValue = {_id : "5aaf02795c74c81afa34111f"},
      routines = { error: false, loading: true, payload: [] }
    } = this.props;
    if (routines.loading) {
      return <div style={{marginTopLeft: "20px"}}>Loading routines...</div>
    }
    if (routines.error) {
      return <div style={{marginTopLeft: "20px"}}>Error loading routines :(</div>
    }
    return (
      <SelectField
        floatingLabelText="Routine"
        value={initialValue._id}
        onChange={this.handleChange}
        style={styles.customWidth}
      >
        {routines.payload.map((routine, index) => (
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

const mapStateToProps = state => {
  return {
    routines: state.routineStatus
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchRoutines : () => dispatch(getRoutinesStarted())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RoutineSelect);
