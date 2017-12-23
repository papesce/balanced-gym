import * as React from "react";
import "./App.css";
import { Provider } from "react-redux";
import { configureStore, history } from "./redux/configureStore";
import { Home } from "./routes/Home";
import { ConnectedRouter } from "react-router-redux";
import { Route } from "react-router";
import { AddExercise } from "./routes/AddExercise";
import { EditExercise } from "./routes/EditExercise";
import { State, DEFAULT_STATE } from "./redux/model";
import { Store } from "redux";

const PERSISTED_STATE_KEY = "persistedState";
const persistedStateSt = localStorage.getItem(PERSISTED_STATE_KEY);
const persistedState: State = persistedStateSt
  ? JSON.parse(persistedStateSt)
  : DEFAULT_STATE;

const store: Store<State> = configureStore(persistedState);

store.subscribe(() => {
  const state: State = store.getState();
  const storedState: State = {filter: state.filter};
  localStorage.setItem(PERSISTED_STATE_KEY, JSON.stringify(storedState));
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
