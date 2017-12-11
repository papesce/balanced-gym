import * as React from "react";
import { Grid, Navbar, Jumbotron, Row, Col } from "react-bootstrap";
import { NewExerciseC } from "../container/NewExerciseC";
import { ExerciseListC } from "../container/ExerciseListC";

export class Home extends React.Component {
  render() {
    return (
      <div>
        <Navbar inverse={true} fixedTop={true}>
          <Grid>
            <Navbar.Header>
              <Navbar.Brand>
                <a href="/">Balanced Gym</a>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
          </Grid>
        </Navbar>
        <Jumbotron>
          <Grid>
            <Row>
              <Col md={12}>
                <h3>Add a new exercise:</h3>
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={12}>
                <NewExerciseC />
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={12}>
               <h3>Routines</h3>
                <ExerciseListC/>
              </Col>
            </Row>
          </Grid>
        </Jumbotron>
      </div>
    );
  }
}
