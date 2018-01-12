// @flow
import * as React from "react";
import { GridList, GridTile } from "material-ui/GridList";
import IconButton from "material-ui/IconButton";
import Subheader from "material-ui/Subheader";
import StarBorder from "material-ui/svg-icons/navigation/more-horiz";
import { Muscle } from "../redux/model";
import "./MuscleList.css";

const styles = {
   root: {
     display: 'flex',
     flexWrap: 'wrap',
     justifyContent: 'space-around',
   },
  gridList: {
    width: "auto",
    height: "80%",
    overflowY: "auto"
  },
  divImg: {
    width: "100%",
    height: "100%",
    textAlign: "center"
  },
  img:{
    maxWidth: "100%",
    maxHeight: "100%",
    width:"auto",
    height:"auto"
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
              <div style={styles.divImg}>
                <img style={styles.img} alt="no set" src={muscle.muscleURL} />
               </div>
            </GridTile>
          ))}
        </GridList>
      </div>
    );
  }
}

export { MuscleList };
