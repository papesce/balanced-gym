import * as React from "react";
import { Exercise } from "../redux/model";
import { ListGroupItem, Thumbnail } from "react-bootstrap";

interface ExerciseItemProps {
  exercise: Exercise;
}

class ExerciseItem extends React.Component<ExerciseItemProps> {
  render() {
    const { exercise } = this.props;
    // debugger;
    return (
      <ListGroupItem key={exercise._id}>
        {/* <Jumbotron>
            <p>MuscleGroup: {exercise.muscleGroup}</p>
            <p>Target: {exercise.target}</p>
        </ Jumbotron> */}
        <Thumbnail href={exercise.gifURL}/>
      </ListGroupItem>
    );
  }
}

export { ExerciseItem };
