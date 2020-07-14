import React, { PureComponent } from "react";

import "./AiPlayerView.css";

import { Board, Color, selectColor } from "color-me-up-shared";

import BoardUi from "../BoardUi";
import SpaceOccupyingHiddenElement from "../SpaceOccupyingHiddenElement";

type Props = {
    originalBoard: Board;
    steps: Color[];
};

type State = {
    stepsToTake: number;
};

class AiPlayerView extends PureComponent<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            stepsToTake: 0,
        };
    }

    renderBackButton = () => {
        const { steps } = this.props;
        const { stepsToTake } = this.state;

        return (
            <SpaceOccupyingHiddenElement
                alwaysOccupySpace={true}
                visible={stepsToTake !== 0}
            >
                <a
                    style={{ flex: 1, color: steps[stepsToTake - 1] }}
                    href="#aiPlayerBack"
                    onClick={(e) => {
                        e.preventDefault();

                        this.setState({
                            stepsToTake: this.state.stepsToTake - 1,
                        });
                    }}
                >
                    <span className="Body">Back</span>
                </a>
            </SpaceOccupyingHiddenElement>
        );
    };

    renderStepsTaken = () => {
        const { steps } = this.props;
        const { stepsToTake } = this.state;

        const color = steps[stepsToTake - 1];

        return (
            <SpaceOccupyingHiddenElement
                alwaysOccupySpace={true}
                visible={stepsToTake !== 0}
            >
                <span
                    className="Body"
                    style={{ paddingRight: 16, paddingLeft: 16, color }}
                >
                    {stepsToTake}
                </span>
            </SpaceOccupyingHiddenElement>
        );
    };

    renderNextButton = () => {
        const { steps } = this.props;
        const { stepsToTake } = this.state;

        const color = steps[stepsToTake];

        return (
            <SpaceOccupyingHiddenElement
                alwaysOccupySpace={true}
                visible={stepsToTake !== steps.length}
            >
                <a
                    style={{ flex: 1, color, textAlign: "right" }}
                    href="#aiPlayerNext"
                    onClick={(e) => {
                        e.preventDefault();

                        this.setState({
                            stepsToTake: this.state.stepsToTake + 1,
                        });
                    }}
                >
                    <span className="Body">Next</span>
                </a>
            </SpaceOccupyingHiddenElement>
        );
    };

    render() {
        const { originalBoard, steps } = this.props;
        const { stepsToTake } = this.state;

        let updatedBoard = originalBoard;
        for (let i = 0; i < stepsToTake; i++) {
            updatedBoard = selectColor(updatedBoard, steps[i]);
        }

        return (
            <div className="AiPlayerView">
                <div>
                    <BoardUi
                        board={updatedBoard}
                        enabled={false}
                        onSelectTile={() => {}}
                    />
                    <div
                        style={{
                            flexDirection: "row",
                            marginTop: 8,
                            alignSelf: "stretch",
                        }}
                    >
                        {this.renderBackButton()}
                        {this.renderStepsTaken()}
                        {this.renderNextButton()}
                    </div>
                </div>
            </div>
        );
    }
}

export default AiPlayerView;
