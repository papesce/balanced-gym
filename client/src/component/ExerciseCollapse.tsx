import * as React from "react";
// import { CardColumns } from "reactstrap";
import { ExerciseItem } from "./ExerciseItem";
import { Targets } from "../redux/model";
import StackGrid from "react-stack-grid";
import "./ExerciseList.css";
import { Breadcrumb, BreadcrumbItem, Collapse } from "reactstrap";

interface ExerciseCollapseProps {
    target: Targets;
    editExercise: (exId: string) => void;
}

interface ExerciseCollapseState {
    open: boolean;
}

class ExerciseCollapse extends React.Component<ExerciseCollapseProps, ExerciseCollapseState> {
    constructor(props: ExerciseCollapseProps) {
        super(props);
        this.state = { open: false };
    }
    componentWillMount() {
        const openSt = localStorage.getItem(this.props.target.target);
        this.setState({open: JSON.parse(openSt ? openSt : "false") });
    }
    componentDidMount() {
        // setTimeout(() => {
        //  window.scrollTo(100, 2100);
        // },         5000);
    }
    componentWillUnmount() {
        localStorage.setItem(this.props.target.target, JSON.stringify(this.state.open));
    }
    render() {
        const { target, editExercise } = this.props;
        return (
            <div>
                <Breadcrumb>
                    <BreadcrumbItem
                        active={true}
                        onClick={() => this.setState({ open: !this.state.open })}
                    >
                        <a href="#">{target.target}</a>
                    </BreadcrumbItem>
                </Breadcrumb>
                <Collapse isOpen={this.state.open}>
                    <StackGrid
                        className="app-stack-grid"
                        monitorImagesLoaded={true}
                        columnWidth={250}
                    >
                        {target && target.exercises && target.exercises.map(exercise => (
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
