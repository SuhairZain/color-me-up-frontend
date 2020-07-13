import React, { PureComponent } from "react";

import { Board } from "color-me-up-shared";

import Tile from "../Tile";

type Props = {
    board: Board;
};

class BoardUi extends PureComponent<Props, never> {
    render() {
        const { board } = this.props;
        const { tiles } = board;

        return (
            <div>
                {tiles.map((row, i) => {
                    return (
                        <div key={i} style={{ flexDirection: "row" }}>
                            {row.map((tile, j) => (
                                <Tile key={j} color={tile.color} />
                            ))}
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default BoardUi;
