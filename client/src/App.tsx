import * as React from "react";
import "./App.css";
import { Provider } from "react-redux";
import { configureStore, history }  from "./redux/configureStore";
import { Home } from "./routes/Home";
import { ConnectedRouter } from "react-router-redux";
import { Route } from "react-router";
import { AddExercise } from "./routes/AddExercise";
import { EditExercise } from "./routes/EditExercise";

const store = configureStore();

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <div>
            <Route exact={true} path="/" component={Home} />
            <Route path="/addExercise" component={AddExercise} />
            <Route path="/editExercise/:exId" component={EditExercise} />
          </div>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;
