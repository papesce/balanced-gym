import React, { Component } from "react";
import AppBar from "material-ui/AppBar";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import IconButton from "material-ui/IconButton";
import NavigationHome from "material-ui/svg-icons/navigation/menu";

const styles = {
  title: {
    cursor: 'pointer',
  },
};

class TopBar extends Component {
  render() {
    // debugger;
    const { dispatch } = this.props;
    return (
      <div>
        <AppBar
          title={<span style={styles.title}>Balanced Gym</span>}
          onTitleClick={() => dispatch(push("/"))}
          iconElementLeft={
            <IconButton onClick={() => alert("menu !!")}>
              <NavigationHome />
            </IconButton>
          }
          // iconClassNameRight="muidocs-icon-navigation-expand-more"
        />
      </div>
    );
  }
}

export default connect()(TopBar);
