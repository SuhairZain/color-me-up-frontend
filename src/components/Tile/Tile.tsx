import React, { PureComponent } from "react";

import { Color } from "color-me-up-shared";

import "./Tile.css";

type Props = {
    color: Color;
};

class Tile extends PureComponent<Props, never> {
    render() {
        const { color } = this.props;

        return (
            <div
                className="Tile"
                style={{
                    backgroundColor: color,
                }}
            />
        );
    }
}

export default Tile;
