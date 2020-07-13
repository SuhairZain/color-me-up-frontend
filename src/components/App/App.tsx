import React, { PureComponent } from "react";

import "./App.css";

import { createBoard, Board, Color } from "color-me-up-shared";

import BoardUi from "../BoardUi";

class App extends PureComponent<{}, never> {
    changeColor = (_1: Board, _2: Color) => {};

    renderApp = () => {
        return (
            <BoardUi
                board={createBoard(6, 6)}
                enabled={true}
                onSelectTile={this.changeColor}
            />
        );
    };

    render() {
        return <div className="App">{this.renderApp()}</div>;
    }
}

export default App;
