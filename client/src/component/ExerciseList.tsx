import * as React from "react";
// import { CardColumns } from "reactstrap";
import { ExerciseItem } from "./ExerciseItem";
import { Exercise } from "../redux/model";
import StackGrid from "react-stack-grid";
import "./ExerciseList.css";

interface ExerciseListProps {
  exercises: Array<Exercise>;
  editExercise: (exId: string) => void;
}

class ExerciseList extends React.Component<ExerciseListProps> {
  render() {
    
    const { exercises, editExercise } = this.props;
    return ( 
      <div>
        {/* {(exercises.length === 0) && <div>loading */}
        <StackGrid
          className="app-stack-grid"
          monitorImagesLoaded={true}
          columnWidth={250}
        >
          {exercises.map(exercise => (
            <ExerciseItem
              exercise={exercise}
              key={exercise._id}
              editExercise={editExercise}
            />
          ))}
        </StackGrid>
        {/* </CardColumns>  */}
      </div>
    );
  }
}

export { ExerciseList };
