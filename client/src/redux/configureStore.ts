import { createStore, applyMiddleware, Store } from "redux";
import { createEpicMiddleware } from "redux-observable";
import { composeWithDevTools } from "redux-devtools-extension";
import { rootEpic } from "./epics";
import { rootReducer } from "./reducers";
import { routerMiddleware } from "react-router-redux";
import createHistory from "history/createBrowserHistory";
import { State } from "./model";

const epicMiddleware = createEpicMiddleware(rootEpic);

export const history = createHistory();
const rMiddleware = routerMiddleware(history);

export function configureStore(initialState: State) {
  const store: Store<State> = createStore<State>(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(epicMiddleware, rMiddleware))
  );
  return store;
}
