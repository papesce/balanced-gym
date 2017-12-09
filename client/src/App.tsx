import * as React from "react";
import "./App.css";
import { Provider } from "react-redux";
import configureStore from "./redux/configureStore";
import { Home } from "./component/Home";

const store = configureStore();

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
          <Home/>
      </Provider>
    );
  }
}

export default App;
