import * as React from "react";
import { Navbar, NavbarBrand, Container, Row, Col } from "reactstrap";
import { NewExerciseC } from "../container/NewExerciseC";
import "./Home.css";

class AddExercise extends React.Component {
  render() {
    return (
      <div>
         <Navbar dark={true} color="dark" >
          <NavbarBrand href="/">Balanced Gym</NavbarBrand>
        </Navbar>
          <Container>
            <Row>
              <Col md={12}>
                <h4 className={"newExercise"}>Add a new exercise:</h4>
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