import React, { Component } from "react";
import { MuscleListC } from "../container/MuscleListC";
import { TargetListC } from "../container/TargetListC";

class Muscle extends Component {
  render() {
    return (
      <div>
        <TargetListC />
        <MuscleListC />
        
      </div>
    );
  }
}

export { Muscle };