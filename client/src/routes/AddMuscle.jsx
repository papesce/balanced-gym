import React, { Component } from "react";
import AddMuscleC from "../container/AddMuscleC"
import TopBar from "./TopBar";

class AddMuscle extends Component {
  render() {
    return (
      <div>
        <TopBar/>
        <AddMuscleC/>
      </div>
    );
  }
}

export { AddMuscle };