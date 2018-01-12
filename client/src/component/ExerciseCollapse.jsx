import * as React from "react";
// import { CardColumns } from "reactstrap";
import { ExerciseItem } from "./ExerciseItem";
import { Targets } from "../redux/model";
import StackGrid from "react-stack-grid";
import "./ExerciseList.css";
import { Breadcrumb, BreadcrumbItem, Collapse } from "reactstrap";
import Button from "reactstrap/lib/Button";

interface ExerciseCollapseProps {
  target: Targets;
  editExercise: (exId: string) => void;
}

interface ExerciseCollapseState {
  open: boolean;
}

class ExerciseCollapse extends React.Component<
  ExerciseCollapseProps,
  ExerciseCollapseState
> {
  constructor(props: ExerciseCollapseProps) {
    super(props);
    this.state = { open: false };
  }
  componentWillMount() {
    const openSt = localStorage.getItem(this.props.target.target._id);
    const open = JSON.parse(openSt ? openSt : "false");
    //debugger
    this.setState({ open });
  }
  componentDidMount() {
    // setTimeout(() => {
    //  window.scrollTo(100, 2100);
    // },         5000);
  }
  toggleState = () => {
    this.setState({ open: !this.state.open });
    localStorage.setItem(
      this.props.target.target._id,
      JSON.stringify(!this.state.open)
    );
  }
  render() {
    const { target, editExercise } = this.props;
    return (
      <div>
        <Breadcrumb>
          <BreadcrumbItem active={true}>
            <Button
              color="link"
              onClick={this.toggleState}
            >
              {target.target.name}
            </Button>
          </BreadcrumbItem>
        </Breadcrumb>
        <Collapse isOpen={this.state.open}>
          <StackGrid
            className="app-stack-grid"
            monitorImagesLoaded={true}
            columnWidth={250}
          >
            {target &&
              target.exercises &&
              target.exercises.map(exercise => (
                <ExerciseItem
                  exercise={exercise}
                  key={exercise._id}
                  editExercise={editExercise}
                />
              ))}
          </StackGrid>
        </Collapse>
      </div>
    );
  }
}

export { ExerciseCollapse };
