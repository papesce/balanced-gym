import * as React from "react";
import {
  Navbar,
  NavbarBrand,
  Container,
  NavLink
} from "reactstrap";
import { ExerciseListC } from "../container/ExerciseListC";
import "./Home.css";
import sizeMe from "react-sizeme";
import { FiltersC } from "../container/FiltersC";

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
          <FiltersC /> 
        </Container>
        <ExerciseListC />
      </div>
    );
  }
}
const Home = sizeMe()(HomeC);
export { Home };
