import React, { PureComponent } from "react";

import "./App.css";

import { API } from "../../API";

import { Board, Color, selectColor, gameWon } from "color-me-up-shared";

import BoardUi from "../BoardUi";
import SpaceOccupyingHiddenElement from "../SpaceOccupyingHiddenElement";
import AiPlayerView from "../AiPlayerView";

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
    fetchAiPlayerSteps: Operation<Color[]>;
    showAiPlayerSteps: boolean;
};

class App extends PureComponent<Props, State> {
    /** TODO: Poor fix; move logic out of the component so that we can prevent component unmounted errors and also write better tests */
    private mounted = false;

    constructor(props: Props) {
        super(props);

        this.state = {
            fetchBoardOp: {},
            board: undefined,
            steps: 0,
            fetchAiPlayerSteps: {},
            showAiPlayerSteps: false,
        };
    }

    fetchBoardFromBackend = async () => {
        this.setState({
            fetchBoardOp: { ongoing: true },
            board: undefined,
            steps: 0,
            showAiPlayerSteps: false,
        });

        try {
            const board = (await API.start(6, 6)).data;

            if (!this.mounted) {
                return;
            }

            this.setState({
                fetchBoardOp: {
                    result: board,
                },
                board,
            });
        } catch (error) {
            this.setState({ fetchBoardOp: { error } });
        }
    };

    componentDidMount() {
        this.mounted = true;

        this.fetchBoardFromBackend();
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    fetchAiPlayerSteps = async () => {
        if (!gameWon(this.state.board!)) {
            return;
        }

        const originalBoard = this.state.fetchBoardOp.result!;

        this.setState({ fetchAiPlayerSteps: { ongoing: true } });

        try {
            const colors = (await API.aiPlay(originalBoard)).data;

            const { board: boardAfterAiPlayRequest } = this.state;

            // The user could've restarted the game by the time the request finished
            if (!boardAfterAiPlayRequest || !gameWon(boardAfterAiPlayRequest)) {
                this.setState({ fetchAiPlayerSteps: {} });
                return;
            }

            this.setState({
                fetchAiPlayerSteps: { result: colors },
            });
        } catch (error) {
            this.setState({ fetchAiPlayerSteps: { error } });
        }
    };

    changeColor = (board: Board, color: Color) => {
        const originTile = board.tiles[0][0];

        if (originTile.color === color) {
            return;
        }

        this.setState(
            {
                board: selectColor(board, color),
                steps: this.state.steps + 1,
            },
            this.fetchAiPlayerSteps
        );
    };

    renderAiPlayerMessage = (board: Board) => {
        const { fetchAiPlayerSteps, steps, showAiPlayerSteps } = this.state;

        const aiPlayerColors = fetchAiPlayerSteps.result;

        const gameFinished = gameWon(board);

        const aiPlayerStepsReady = gameFinished && !!aiPlayerColors;
        const aiPlayerSteps = aiPlayerColors?.length ?? steps;

        const message =
            steps === aiPlayerSteps
                ? `You finished it in the same number of steps as our AI player. `
                : steps < aiPlayerSteps
                ? `Congrats, you played better than our AI player (${aiPlayerSteps} steps). `
                : `Our AI player could do it in ${aiPlayerSteps} steps. `;

        return (
            <SpaceOccupyingHiddenElement
                visible={aiPlayerStepsReady && !showAiPlayerSteps}
            >
                <span
                    className="Title"
                    style={{
                        maxWidth: 600,
                        textAlign: "center",
                        marginTop: 16,
                    }}
                >
                    {message}
                    <a
                        href="#aiPlayerSteps"
                        onClick={(e) => {
                            e.preventDefault();

                            this.setState({ showAiPlayerSteps: true });
                        }}
                    >
                        See how we did it
                    </a>
                </span>
            </SpaceOccupyingHiddenElement>
        );
    };

    renderApp = () => {
        const {
            board,
            steps,
            fetchBoardOp,
            showAiPlayerSteps,
            fetchAiPlayerSteps,
        } = this.state;

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
                <div className="UserAndAiPlayerBoards">
                    <div style={{ position: "relative" }}>
                        <img
                            src={require("./origin_arrow.png")}
                            style={{
                                width: 43,
                                height: 113,
                                position: "absolute",
                                top: -14,
                                left: -32,
                                display: showGameGoalMessage ? "unset" : "none",
                            }}
                            alt="This is the origin tile"
                        />
                        <BoardUi
                            board={board}
                            enabled={!gameFinished}
                            onSelectTile={this.changeColor}
                        />
                        <span
                            className="Body"
                            style={{ alignSelf: "center", marginTop: 8 }}
                        >
                            {showAiPlayerSteps ? "Your steps" : "Steps"}:{" "}
                            {steps}
                        </span>
                    </div>
                    {showAiPlayerSteps && fetchAiPlayerSteps.result && (
                        <AiPlayerView
                            originalBoard={this.state.fetchBoardOp.result!}
                            steps={fetchAiPlayerSteps.result}
                        />
                    )}
                </div>
                {this.renderAiPlayerMessage(board)}
            </div>
        );
    };

    render() {
        return <div className="App">{this.renderApp()}</div>;
    }
}

export default App;
