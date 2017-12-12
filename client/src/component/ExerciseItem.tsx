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
}

class ExerciseItem extends React.Component<ExerciseItemProps> {
  constructor(props: ExerciseItemProps) {
    super(props);
    this.editExercise = this.editExercise.bind(this);
  }
  editExercise() {
    debugger;
  }
  render() {
    const { exercise } = this.props;
    return (
      <Card key={exercise._id}>
        <CardImg
          top={true}
          width="100%"
          src={exercise.gifURL}
          alt="Card image cap"
        />
        <CardBody>
          <CardTitle>{exercise.name}</CardTitle>
          <CardSubtitle>
            <b>Group:</b> {exercise.muscleGroup}
          </CardSubtitle>
          <CardText>
            <b>Target:</b> {exercise.target}
          </CardText>
          <Button onClick={this.editExercise}>Edit</Button>
        </CardBody>
      </Card>
    );
  }
}

export { ExerciseItem };
