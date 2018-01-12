import React, { Component } from "react";
import MuscleListC from "../container/MuscleListC";
import Row from "reactstrap/lib/Row";
import Col from "reactstrap/lib/Col";
import TopBar from "./TopBar";

class Muscles extends Component {
  render() {
    return (
      <div>
        <TopBar />
        <Row>
          <Col>
            <MuscleListC />
          </Col>
        </Row>
      </div>
    );
  }
}

export { Muscles };
