import * as React from "react";
import { Col, Row, Button } from "reactstrap";
import { MuscleGroupC } from "./MuscleGroupC";
import { TargetC } from "./TargetC";
import { connect } from "react-redux";
import { State, Filter, ExerciseQuery } from "../redux/model";
import { getExercisesStarted } from "../redux/actions";
import "./FiltersC.css";

interface FilterRC {
  filter?: Filter;
  getExercisesStarted?: (exerciseQuery: ExerciseQuery) => void;
}

class FiltersRC extends React.Component<FilterRC> {
  filter() {
    const exerciseQuery: ExerciseQuery = {};
    const { filter } = this.props;
    if (filter) {
      if (filter.selectedMuscleGroup !== "") {
        exerciseQuery.muscleGroup = filter.selectedMuscleGroup;
      }
      if (filter.selectedTarget !== "") {
        exerciseQuery.target = filter.selectedTarget;
      }
      if (this.props.getExercisesStarted) {
        this.props.getExercisesStarted(exerciseQuery);
      }
    }
  }
  render() {
    const { availableTargets } = this.props;
    // console.log('available targets', this.props.availableTargets);
    return (
      <Row className="app-row">
        <Col xs={10} md={5}>
          <MuscleGroupC />
        </Col>
        <Col xs={10} md={5}>
          <TargetC availableTargets={availableTargets}/>
        </Col>
        <Col className="filter-button" xs={10} md={2}>
          <Button onClick={() => this.filter()}>Filter</Button>
        </Col>
      </Row>
    );
  }
}

const getAvailableTargets = (groupedExercises) => {
   const { targets = [] } = groupedExercises;
  return targets.map(targetMix => targetMix.target);
}

const mapStateToProps = (state: State): FilterRC => {
  return {
    filter: state.filter,
    availableTargets: getAvailableTargets(state.groupedExercises)
  };
};

const mapDispatchToProps = (dispatch): FilterRC => {
  return {
    getExercisesStarted: (exerciseQuery: ExerciseQuery) =>
      dispatch(getExercisesStarted(exerciseQuery))
  };
};

const FiltersC = connect(mapStateToProps, mapDispatchToProps)(FiltersRC);

export { FiltersC };

//
//
