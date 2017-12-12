import { createStore, applyMiddleware } from "redux";
import { createEpicMiddleware } from "redux-observable";
import { composeWithDevTools } from "redux-devtools-extension";
import { rootEpic } from "./epics";
import { rootReducer } from "./reducers";
import { routerMiddleware } from "react-router-redux";
import createHistory from "history/createBrowserHistory";

const epicMiddleware = createEpicMiddleware(rootEpic);

export const history = createHistory();
const rMiddleware = routerMiddleware(history);

export function configureStore() {
  const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(epicMiddleware, rMiddleware))
  );
  return store;
}
