import * as React from "react";
import "./App.css";
import { Provider } from "react-redux";
import { configureStore, history } from "./redux/configureStore";
import { Home } from "./routes/Home";
import { ConnectedRouter } from "react-router-redux";
import { Route } from "react-router";
import { AddExercise } from "./routes/AddExercise";
import { AddMuscle } from "./routes/AddMuscle";
import { EditExercise } from "./routes/EditExercise";
import { ShowExercise } from "./routes/ShowExercise";
import { Muscles } from "./routes/Muscles";
import { State, DEFAULT_STATE } from "./redux/model";
import { Store } from "redux";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { EditMuscle } from "./routes/EditMuscle";


const PERSISTED_STATE_KEY = "persistedState";
const persistedStateSt = localStorage.getItem(PERSISTED_STATE_KEY);
let persistedState: State;
if (persistedStateSt) {
  const storedState: State = JSON.parse(persistedStateSt);
  persistedState = {
    filter: {
      selectedTarget: storedState.filter.selectedTarget,
      selectedMuscleGroup: storedState.filter.selectedMuscleGroup,
    }
  };
} else { 
  persistedState = DEFAULT_STATE;
}

const store: Store<State> = configureStore(persistedState);

store.subscribe(() => {
  const state: State = store.getState();
  const storedState: State = { filter: state.filter };
  localStorage.setItem(PERSISTED_STATE_KEY, JSON.stringify(storedState));
});

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
      <MuiThemeProvider>
        <ConnectedRouter history={history}>
          <div>
            <Route exact={true} path="/" component={Home} />
            <Route path="/addExercise" component={AddExercise} />
            <Route path="/editExercise/:exId" component={EditExercise} />
            <Route path="/showExercise/:exId" component={ShowExercise} />
            <Route path="/muscles" component={Muscles} />
            <Route path="/addMuscle" component={AddMuscle} />
            <Route path="/editMuscle/:muscleId" component={EditMuscle} />
          </div>
        </ConnectedRouter>
        </MuiThemeProvider>
      </Provider>
    );
  }
}

export default App;
