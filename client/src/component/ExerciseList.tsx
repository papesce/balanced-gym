import * as React from "react";
// import { CardColumns } from "reactstrap";
import { ExerciseItem } from "./ExerciseItem";
import { Exercise } from "../redux/model";
import StackGrid from "react-stack-grid";

interface ExerciseListProps {
  exercises: Array<Exercise>;
}

class ExerciseList extends React.Component<ExerciseListProps> {
  render() {
    const { exercises } = this.props;
    return (
      <div>
        {/* <CardColumns> */}
        <StackGrid columnWidth={250}>
          {exercises.map((exercise) => (
            <ExerciseItem exercise={exercise} key={exercise._id}/>
          ))}
           </StackGrid>
        {/* </CardColumns>  */}
      </div>
    );
  }
}

export { ExerciseList };
