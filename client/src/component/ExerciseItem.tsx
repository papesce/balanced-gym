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
import "./ExerciseItem.css";
import { getRoutine } from "./Routines";

interface ExerciseItemProps {
  exercise: Exercise;
  editExercise: (exId: string) => void;
}

class ExerciseItem extends React.Component<ExerciseItemProps> {
  render() {
    const { exercise, editExercise } = this.props;
    // debugger;
    return (
      <Card className="exercise-card" key={exercise._id}>
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
            <b>Target:</b> {exercise.target}<br/>
            <b>Equipment:</b> {exercise.equipment}<br/>
            <b>Last Reps:</b> {exercise.lastReps} 
            <b> Last Weight:</b> {exercise.lastWeight}<br/>
            {/* <b> Normalized Weight:</b> {exercise.normalizedWeight}<br/> */}
            <b> Suggested:</b> <b>Reps:</b> {exercise.suggestedSerie.reps} 
            <b> Weight:</b> {exercise.suggestedSerie.weight}
            <b> Routine:</b> {getRoutine(exercise.routineId)}
          </CardText>
          <Button onClick={() => editExercise(exercise._id)}>Edit</Button>
        </CardBody>
      </Card>
    );
  }
}

export { ExerciseItem };
