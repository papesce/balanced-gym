import React, { Component } from "react";
import AppBar from "material-ui/AppBar";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import IconButton from "material-ui/IconButton";
import NavigationHome from "material-ui/svg-icons/navigation/menu";
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

const styles = {
  title: {
    cursor: 'pointer',
  },
};

interface TopBarProps {
}

interface TopBarState {
  open: boolean;
}


class TopBar extends Component<TopBarProps,TopBarState> {
  constructor(props) {
    super(props);
    this.state = {open: false};
  }
  handleToggle = () => this.setState({open: !this.state.open});
  goTo = (url) => {
    const { dispatch } = this.props;
    dispatch(push(url));
  }
  render() {
    // debugger;
    
    return (
      <div>
        <AppBar
          title={<span style={styles.title}>Balanced Gym</span>}
          onTitleClick={() => this.goTo("/")}
          iconElementLeft={
            <IconButton onClick={this.handleToggle}>
              <NavigationHome />
            </IconButton>
          }
          // iconClassNameRight="muidocs-icon-navigation-expand-more"
        />
         <Drawer
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
        >
          <MenuItem onClick={() => this.goTo("/")}>Exercises</MenuItem>
          <MenuItem onClick={() => this.goTo("/addExercise")}>New Exercise</MenuItem>
          <MenuItem onClick={() => this.goTo("/muscles")}>Muscles</MenuItem>
          <MenuItem onClick={() => this.goTo("/addMuscle")}>New Muscle</MenuItem>
        </Drawer>
      </div>
    );
  }
}

export default connect()(TopBar);
