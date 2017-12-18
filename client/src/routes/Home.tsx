import * as React from "react";
import { Navbar, NavbarBrand, Container, Row, Col } from "reactstrap";
import { ExerciseListC } from "../container/ExerciseListC";
import { MuscleGroupC } from "../container/MuscleGroupC";
import "./Home.css";
import  sizeMe from "react-sizeme";

class HomeC extends React.Component {
  render() {
    return (
      <div>
         <Navbar dark={true} color="dark" >
          <NavbarBrand href="/">Balanced Gym</NavbarBrand>
        </Navbar>
          <Container className="app-container">
            <Row className="app-row">
              <Col xs={4} md={4}>
               <h3 className={"title"}>Exercises</h3>
                {/* <ExerciseListC/> */}
              </Col>
              <Col xs={6} md={6}>
                <MuscleGroupC/>
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