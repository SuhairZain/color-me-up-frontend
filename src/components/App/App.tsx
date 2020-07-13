import React, { PureComponent } from "react";

import "./App.css";

import { createBoard } from "color-me-up-shared";

import BoardUi from "../BoardUi";

class App extends PureComponent<{}, never> {
    renderApp = () => {
        return <BoardUi board={createBoard(6, 6)} />;
    };

    render() {
        return <div className="App">{this.renderApp()}</div>;
    }
}

export default App;
