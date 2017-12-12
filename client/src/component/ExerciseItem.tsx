import * as React from "react";
import { Exercise } from "../redux/model";
import {
  Button,
  CardBody,
  Card,
  CardImg,
  CardTitle,
  CardSubtitle,
  CardText
} from "reactstrap";

interface ExerciseItemProps {
  exercise: Exercise;
  editExercise: (exId: string) => void;
}

class ExerciseItem extends React.Component<ExerciseItemProps> {
  render() {
    const { exercise, editExercise } = this.props;
    return (
      <Card key={exercise._id}>
        <CardImg 
          top={true}
          width="250px"
          height="100%"
          src={exercise.gifURL}
          alt="No Image"
        />
        <CardBody>
          <CardTitle>{exercise.name}</CardTitle>
          <CardSubtitle>
            <b>Group:</b> {exercise.muscleGroup}
          </CardSubtitle>
          <CardText>
            <b>Target:</b> {exercise.target}
          </CardText>
          <Button onClick={() => editExercise(exercise._id)}>Edit</Button>
        </CardBody>
      </Card>
    );
  }
}

export { ExerciseItem };
