import * as React from "react";
import { Navbar, NavbarBrand, Container, Row, Col } from "reactstrap";
// import { NewExerciseC } from "../container/NewExerciseC";
import { ExerciseListC } from "../container/ExerciseListC";
import "./Home.css";
import  sizeMe from "react-sizeme";

class HomeC extends React.Component {
  render() {
    return (
      <div>
         <Navbar dark={true} color="dark" >
          <NavbarBrand href="/">Balanced Gym</NavbarBrand>
        </Navbar>
          <Container>
            {/* <Row>
              <Col md={12}>
                <h4 className={"newExercise"}>Add a new exercise:</h4>
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={12}>
                <NewExerciseC />
              </Col>
            </Row> */}
            <Row>
              <Col xs={12} md={12}>
               <h3>Exercises</h3>
                {/* <ExerciseListC/> */}
              </Col>
            </Row> 
          </Container>
          <ExerciseListC/>
      </div>
    );
  }
}
const Home = sizeMe()(HomeC);
export { Home };