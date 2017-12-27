import * as React from "react";
// import { CardColumns } from "reactstrap";
import { ExerciseItem } from "./ExerciseItem";
import { Targets } from "../redux/model";
import StackGrid from "react-stack-grid";
import "./ExerciseList.css";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";

interface ExerciseListProps {
  targets: Array<Targets>;
  editExercise: (exId: string) => void;
}

class ExerciseList extends React.Component<ExerciseListProps> {
  render() {
    // debugger;
    const { targets, editExercise } = this.props;
    return (
      <div>
        {targets.map(target => (
          <div>
            <Breadcrumb>
              <BreadcrumbItem active={true}>{target.target}</BreadcrumbItem>
            </Breadcrumb>
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
          </div>
        )
        )
        }
      </div>
    );
  }
}

export { ExerciseList };
