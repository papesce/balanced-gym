import * as React from "react";
import { Targets } from "../redux/model";
import "./ExerciseList.css";
import { ExerciseCollapse } from "./ExerciseCollapse";

interface ExerciseListProps {
  targets: Array<Targets>;
  editExercise: (exId: string) => void;
}

class ExerciseList extends React.Component<ExerciseListProps> {
  componentDidMount() {
    // setTimeout(() => {
    //  window.scrollTo(100, 2100);
    // },         5000);
  }
  render() {
    const { targets, editExercise } = this.props;
    return (
      <div>
        {targets.map((target, index) =>
          <ExerciseCollapse
            key={index}
            target={target}
            editExercise={editExercise}
          />
        )
        }
      </div>
    );
  }
}

export { ExerciseList };
