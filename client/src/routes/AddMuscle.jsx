import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import NewMuscleC from "../container/NewMuscleC"
import TopBar from "./TopBar";

class AddMuscle extends Component {
  render() {
    return (
      <div>
        <TopBar/>
        <Container>
            <Row>
              <Col md={12}>
                <h4 className="App-subtitle">Add muscle:</h4>
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={12}>
                <NewMuscleC/>
              </Col>
            </Row> 
          </Container>
       
      </div>
    );
  }
}

export { AddMuscle };