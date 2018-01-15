// @flow
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
import IconButton from "material-ui/IconButton";
import StarBorder from "material-ui/svg-icons/navigation/more-horiz";


interface ExerciseItemProps {
  exercise: Exercise;
  editExercise: (exId: string) => void;
  showMuscles: (exId: string) => void;
}

interface ExerciseItemState {
  showImage: boolean
}
// const getLastSerie = (exercise) => {
//   return `r:${exercise.lastReps} w:${exercise.lastWeight}`;
// };

const getLastUpdated = (exercise) => {
   if (exercise.lastUpdated) {
     const date1 = new Date();
     const date2 = new Date(exercise.lastUpdated);
     const diffDays = (date1.getTime() - date2.getTime())/86400000; 
     return `${diffDays.toFixed(0)} days ` ;
   }
   return "";
};
 
const getSyn = (col) => {
  if (col) {
  return col.reduce( (accum, musc, index) => accum + ((index > 0) ? ", " : "") + musc.name, "");
  } 
  return "[]"
}

const formatWeight = (weight) => Math.round(weight * 100) / 100;
class ExerciseItem extends React.Component<ExerciseItemProps, ExerciseItemState> {  
  constructor(props: ExerciseItemProps){
    super(props)
    this.state = { showImage : false};
  }
  showImage = () => {
    this.setState((prevState) => ({showImage: !prevState.showImage}))
  }
  render() {
    const { exercise, editExercise, showMuscles} = this.props;
    // debugger
    return (
      <Card className="exercise-card" key={exercise._id}>
        <CardImg 
          top={true}
          width="250px"
          height="180px"
          src={this.state.showImage ? exercise.gifURL : ""}
          alt="No Image"
        />
        <CardBody>
          <CardTitle>{exercise.name}</CardTitle>
          <CardSubtitle>
            <b>Group:</b> {exercise.muscleGroup}
          </CardSubtitle>
          <CardText>
            <b>Target:</b> {exercise.target.name}<br/>
            <b>Equipment:</b> {exercise.equipment}<br/>
            <b>Last Reps:</b> {exercise.lastReps} 
            <b> Last Weight:</b> {exercise.lastWeight}<br/>
            {/* <b> Normalized Weight:</b> {exercise.normalizedWeight}<br/> */}
            <b> Suggested:</b> <b>Reps:</b> {exercise.suggestedSerie.reps}
            <b> Weight:</b> {formatWeight(exercise.suggestedSerie.weight)}<br/>
            <b> Routine:</b> {getRoutine(exercise.routineId)}<br/>
            <b> Last Updated:</b> {getLastUpdated(exercise)}<br/>
            <b> Syn: </b> {getSyn(exercise.synergists)}
          </CardText>
          <Button className="exercise-button" onClick={() => editExercise(exercise._id)}>Edit</Button>
          <Button onClick={() => showMuscles(exercise._id)}>Muscles</Button>
          <IconButton onClick={() => this.showImage()}>
                  <StarBorder color="black" />
          </IconButton>
        </CardBody>
      </Card>
    );
  }
}

export { ExerciseItem };
