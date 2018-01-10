import * as React from "react";
import { Container, Row, Col } from "reactstrap";
import EditExerciseC from "../container/EditExerciseC";
import "./Home.css";
import TopBar from "./TopBar";

interface EditExerciseProps {
        match: {
            path: string;
            url: string;
            params: any;
            isExact: boolean;
        };
        location: Location;
        history: History;
}

class EditExercise extends React.Component<EditExerciseProps> {  
render() {
    const exId: string = this.props.match.params.exId;
    return (
      <div>
        <TopBar/>
          <Container>
            <Row>
              <Col md={12}>
                <h4 className={"newExercise"}>Edit exercise:</h4>
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={12}>
                <EditExerciseC exerciseId={exId}/>
              </Col>
            </Row> 
          </Container>
      </div>
    );
  }
}

export { EditExercise };