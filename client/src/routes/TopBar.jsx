import React, { Component } from 'react';
import AppBar from "material-ui/AppBar";

class TopBar extends Component {
  render() {
    return (
      <div>
         <AppBar
          title="Balanced Gym"
          // iconClassNameRight="muidocs-icon-navigation-expand-more"
        />
      </div>
    );
  }
}

export default TopBar;