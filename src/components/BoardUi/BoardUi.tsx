import React, { PureComponent } from "react";

import { Board, Color } from "color-me-up-shared";

import Tile from "../Tile";

type Props = {
    board: Board;
    enabled: boolean;
    onSelectTile: (board: Board, color: Color) => void;
};

class BoardUi extends PureComponent<Props, never> {
    render() {
        const { board, enabled } = this.props;
        const { tiles } = board;

        return (
            <div>
                {tiles.map((row, i) => {
                    return (
                        <div key={i} style={{ flexDirection: "row" }}>
                            {row.map((tile, j) => (
                                <Tile
                                    key={j}
                                    color={tile.color}
                                    enabled={enabled}
                                    onClick={(color) =>
                                        this.props.onSelectTile(board, color)
                                    }
                                />
                            ))}
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default BoardUi;
