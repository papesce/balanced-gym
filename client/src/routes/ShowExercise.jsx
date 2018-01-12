import * as React from "react";
import { Row, Col } from "reactstrap";
import TopBar from "./TopBar";
import ShowExerciseC from "../container/ShowExerciseC";

interface ShowExerciseProps {
  match: {
    path: string,
    url: string,
    params: any,
    isExact: boolean
  };
  location: Location;
  history: History;
}

class ShowExercise extends React.Component<ShowExerciseProps> {
  render() {
    const exId: string = this.props.match.params.exId;
    return (
      <div>
        <TopBar />
        <Row>
          <Col md={12}>
            <h4 className={"App-subtitle"}>Exercise:</h4>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={12}>
            <ShowExerciseC exerciseId={exId} />
          </Col>
        </Row>
      </div>
    );
  }
}

export { ShowExercise };
