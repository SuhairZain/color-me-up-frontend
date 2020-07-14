import React, { PureComponent } from "react";

import "./App.css";

import { API } from "../../API";

import { Board, Color, selectColor } from "color-me-up-shared";

import BoardUi from "../BoardUi";

type Operation<T> = {
    ongoing?: boolean;
    result?: T;
    error?: Error;
};

type Props = {};

type State = {
    fetchBoardOp: Operation<Board>;
    board: Board | undefined;
    steps: number;
};

class App extends PureComponent<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            fetchBoardOp: {},
            board: undefined,
            steps: 0,
        };
    }

    fetchBoardFromBackend = async () => {
        this.setState({
            fetchBoardOp: { ongoing: true },
            board: undefined,
            steps: 0,
        });

        const board = (await API.start(6, 6)).data;
        this.setState({
            fetchBoardOp: {
                result: board,
            },
            board,
        });
    };

    componentDidMount() {
        this.fetchBoardFromBackend();
    }

    changeColor = (board: Board, color: Color) => {
        const originTile = board.tiles[0][0];

        if (originTile.color === color) {
            return;
        }

        this.setState({
            board: selectColor(board, color),
            steps: this.state.steps + 1,
        });
    };

    renderApp = () => {
        const { board, steps, fetchBoardOp } = this.state;

        if (fetchBoardOp.ongoing) {
            return (
                <span className="Title" style={{ textAlign: "center" }}>
                    Creating the board, please wait...
                </span>
            );
        }

        if (fetchBoardOp.error || !board) {
            return (
                <span className="Title Error" style={{ textAlign: "center" }}>
                    An error occurred while creating the board
                </span>
            );
        }

        return (
            <div>
                <BoardUi
                    board={board}
                    enabled={true}
                    onSelectTile={this.changeColor}
                />
                <span
                    className="Body"
                    style={{ alignSelf: "center", marginTop: 8 }}
                >
                    Steps: {steps}
                </span>
            </div>
        );
    };

    render() {
        return <div className="App">{this.renderApp()}</div>;
    }
}

export default App;
