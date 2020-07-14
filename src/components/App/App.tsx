import React, { PureComponent } from "react";

import "./App.css";

import { API } from "../../API";

import { Board, Color, selectColor, gameWon } from "color-me-up-shared";

import BoardUi from "../BoardUi";
import SpaceOccupyingHiddenElement from "../SpaceOccupyingHiddenElement";

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

        const gameFinished = gameWon(board);

        const showGameGoalMessage = steps === 0;

        return (
            <div style={{ alignItems: "center", padding: "16px 4px" }}>
                <SpaceOccupyingHiddenElement visible={showGameGoalMessage}>
                    <span
                        className="Title"
                        style={{ textAlign: "center", maxWidth: 600 }}
                    >
                        Click on a tile to change the origin and its connected
                        tiles to that color. Change all tiles to the same color
                        to win.
                    </span>
                </SpaceOccupyingHiddenElement>
                <SpaceOccupyingHiddenElement visible={gameFinished}>
                    <span className="Title YouWon">
                        You won!
                        <a
                            href="#restart"
                            style={{ marginLeft: 8 }}
                            onClick={(e) => {
                                e.preventDefault();

                                this.fetchBoardFromBackend();
                            }}
                        >
                            Start another!
                        </a>
                    </span>
                </SpaceOccupyingHiddenElement>
                <div style={{ position: "relative", marginTop: 16 }}>
                    <img
                        src={require("./origin_arrow.png")}
                        style={{
                            width: 25,
                            height: 37,
                            position: "absolute",
                            top: -20,
                            left: -24,
                            display: showGameGoalMessage ? "unset" : "none",
                        }}
                        alt="This is the origin tile"
                    />
                    <BoardUi
                        board={board}
                        enabled={!gameFinished}
                        onSelectTile={this.changeColor}
                    />
                </div>
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
