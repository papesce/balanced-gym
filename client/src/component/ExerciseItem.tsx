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

const getLastSerie = (exercise) => {
  return `r:${exercise.lastReps} w:${exercise.lastWeight}`;
};

const getLastUpdated = (exercise) => {
   if (exercise.lastUpdated) {
     const date1 = new Date();
     const date2 = new Date(exercise.lastUpdated);
     const diffDays = date2.getDate() - date1.getDate(); 
     return `${diffDays} days ` ;
   }
   return "";
};

const formatWeight = (weight) => Math.round(weight * 100) / 100;
class ExerciseItem extends React.Component<ExerciseItemProps> {  
  render() {
    const { exercise, editExercise } = this.props;
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
            <b> Weight:</b> {formatWeight(exercise.suggestedSerie.weight)}<br/>
            <b> Routine:</b> {getRoutine(exercise.routineId)}<br/>
            <b> Last Serie</b> {getLastSerie(exercise)}<br/>
            <b> Last Updated</b> {getLastUpdated(exercise)}<br/>
          </CardText>
          <Button onClick={() => editExercise(exercise._id)}>Edit</Button>
        </CardBody>
      </Card>
    );
  }
}

export { ExerciseItem };
