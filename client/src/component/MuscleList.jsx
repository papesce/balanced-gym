// @flow
import * as React from "react";
import { GridList, GridTile } from "material-ui/GridList";
import IconButton from "material-ui/IconButton";
import Subheader from "material-ui/Subheader";
import StarBorder from "material-ui/svg-icons/toggle/star-border";
import { Muscle } from "../redux/model";
import "./MuscleList.css";

const styles = {
   root: {
     display: 'flex',
     flexWrap: 'wrap',
     justifyContent: 'space-around',
   },
  gridList: {
    width: "80%",
    height: "80%",
    overflowY: "auto"
  }
};

interface MuscleListProps {
  muscles: Array<Muscle>;
  onClick: (muscleID: String) => void;
}

class MuscleList extends React.Component<MuscleListProps> {
  handleClick = (muscleID: String) => {
    this.props.onClick(muscleID);
  };
  render() {
    return (
      <div style={styles.root}>
        <GridList cellHeight={250} cols={4} style={styles.gridList}>
          <Subheader>Muscles</Subheader>
          {this.props.muscles.map(muscle => (
            <GridTile
              key={muscle._id}
              title={muscle.name}
              actionIcon={
                <IconButton onClick={() => this.handleClick(muscle._id)}>
                  <StarBorder color="white" />
                </IconButton>
              }
            >
              <img className="muscle-img" alt="no set" src={muscle.muscleURL} />
            </GridTile>
          ))}
        </GridList>
      </div>
    );
  }
}

export { MuscleList };
