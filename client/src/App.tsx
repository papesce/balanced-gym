import * as React from "react";
import "./App.css";
import { Provider } from "react-redux";
import { configureStore, history } from "./redux/configureStore";
import { Home } from "./routes/Home";
import { ConnectedRouter } from "react-router-redux";
import { Route } from "react-router";
import { AddExercise } from "./routes/AddExercise";
import { EditExercise } from "./routes/EditExercise";
import { State } from "./redux/model";
import { Store } from "redux";

const SELECTED_MUSCLE_GROUP_KEY = "selectedMuscleGroup";
const nselectedMuscleGroup = localStorage.getItem(SELECTED_MUSCLE_GROUP_KEY);
const selectedMuscleGroup = nselectedMuscleGroup ? nselectedMuscleGroup : "";
const persistedState: State = {selectedMuscleGroup: selectedMuscleGroup };
const store: Store<State> = configureStore(persistedState);

store.subscribe(() => {
  const state: State = store.getState();
  localStorage.setItem(SELECTED_MUSCLE_GROUP_KEY, state.selectedMuscleGroup);
});

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
