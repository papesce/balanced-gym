import * as React from "react";
import { Container, Row, Col } from "reactstrap";
import NewExerciseC from "../container/NewExerciseC";
import "./Home.css";
import TopBar from "./TopBar";

class AddExercise extends React.Component {
  render() {
    return (
      <div>
         <TopBar/>
          <Container>
            <Row>
              <Col md={12}>
                <h4 className={"App-subtitle"}>Add a new exercise:</h4>
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={12}>
                <NewExerciseC />
              </Col>
            </Row> 
          </Container>
      </div>
    );
  }
}

export { AddExercise };