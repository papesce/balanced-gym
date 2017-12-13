import * as React from "react";
import { Navbar, NavbarBrand, Container, Row, Col } from "reactstrap";
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
          <Container className="app-container">
            <Row className="app-row">
              <Col xs={12} md={12}>
               <h3 className={"title"}>Exercises</h3>
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