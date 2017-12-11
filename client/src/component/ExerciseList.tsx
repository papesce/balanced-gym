import * as React from "react";
import { ListGroup } from "react-bootstrap";
import { Exercise } from "../redux/model";
import { ExerciseItem } from "./ExerciseItem";

interface ExerciseListProps {
  exercises: Array<Exercise>;
}

class ExerciseList extends React.Component<ExerciseListProps> {
  render() {
    const { exercises } = this.props;
    return (
      <div>
        <ListGroup>
          {exercises.map((exercise, i) => (
            <ExerciseItem exercise={exercise} />
          ))}
        </ListGroup>
      </div>
    );
  }
}

export { ExerciseList };
