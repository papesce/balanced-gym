import React, { Component } from "react";
import { MuscleListC } from "../container/MuscleListC";
import { TargetListC } from "../container/TargetListC";
import Row from "reactstrap/lib/Row";
import Col from "reactstrap/lib/Col";

class Muscle extends Component {
  render() {
    return (
      <div>
        <Row>
          <Col>
        <TargetListC />
        </Col>
        <Col>
        <MuscleListC />
         </Col>
        </Row>
      </div>
    );
  }
}

export { Muscle };