import * as React from "react";
import {
  Navbar,
  NavbarBrand,
  Container,
  Row,
  Col,
  NavLink
} from "reactstrap";
import { ExerciseListC } from "../container/ExerciseListC";
import { MuscleGroupC } from "../container/MuscleGroupC";
import "./Home.css";
import sizeMe from "react-sizeme";

interface HomeCProps {}

interface HomeCState {
  collapsed: boolean;
}

class HomeC extends React.Component<HomeCProps, HomeCState> {
  constructor(props: HomeCProps) {
    super(props);
    this.state = { collapsed: true };
    this.toggleNavbar = this.toggleNavbar.bind(this);
  }
  toggleNavbar = () => {
    this.setState({ collapsed: !this.state.collapsed });
  }
  render() {
    return (
      <div>
        <Navbar dark={true} color="dark">
          <NavbarBrand href="/">Balanced Gym</NavbarBrand>
          <NavLink className="navbar-toggler" href="/addExercise">
            <span
              className={"navbar-toggler-plus fa fa-plus"}
            />
          </NavLink>
        </Navbar>
        <Container className="app-container">
          <Row className="app-row">
            <Col xs={10} md={4}>
              <h3 className={"title"}>Exercises</h3>
            </Col>
            <Col xs={10} md={6}>
              <MuscleGroupC />
            </Col>
          </Row>
        </Container>
        <ExerciseListC />
      </div>
    );
  }
}
const Home = sizeMe()(HomeC);
export { Home };
