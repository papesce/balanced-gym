// @flow
import * as React from "react";
import { Container, Row, Col } from "reactstrap";
import "./Home.css";
import TopBar from "./TopBar";
import EditMuscleC  from "../container/EditMuscleC";

interface EditMuscleProps {
        match: {
            path: string;
            url: string;
            params: any;
            isExact: boolean;
        };
        location: Location;
        history: History;
}

class EditMuscle extends React.Component<EditMuscleProps> {  
render() {
    const muscleId: string = this.props.match.params.muscleId;
    return (
      <div>
        <TopBar/>
          <Container>
            <Row>
              <Col md={12}>
                <h4 className={"newMuscle"}>Edit muscle:</h4>
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={12}>
                <EditMuscleC muscleId={muscleId}/>
              </Col>
            </Row> 
          </Container>
      </div>
    );
  }
}

export { EditMuscle };