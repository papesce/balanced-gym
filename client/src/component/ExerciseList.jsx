import * as React from "react";
import { Targets } from "../redux/model";
import "./ExerciseList.css";
import { ExerciseCollapse } from "./ExerciseCollapse";

interface ExerciseListProps {
  targets: Array<Targets>;
  editExercise: (exId: string) => void;
  showMuscles: (exId: string) => void;
}

class ExerciseList extends React.Component<ExerciseListProps> {
  componentDidMount() {
    // setTimeout(() => {
    //  window.scrollTo(100, 2100);
    // },         5000);
  }
  render() {
    const { targets, editExercise, showMuscles } = this.props;
    if (targets.length === 0) {
      return (<div style={{marginLeft: "20px"}}>No results</div>) 
    } 
    return (
      <div>
        {targets.map((target, index) =>
          <ExerciseCollapse
            key={index}
            target={target}
            editExercise={editExercise}
            showMuscles={showMuscles}
          />
        )
        }
      </div>
    );
  }
}

export { ExerciseList };
