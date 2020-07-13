import React, { PureComponent } from "react";

import { Color } from "color-me-up-shared";

import "./Tile.css";

type Props = {
    color: Color;
    enabled: boolean;
    onClick: (color: Color) => void;
};

class Tile extends PureComponent<Props, never> {
    callOnClickWithColor = () => {
        this.props.onClick(this.props.color);
    };

    render() {
        const { enabled, color } = this.props;

        return (
            <div
                className={["Tile", enabled ? "Enabled" : ""].join(" ")}
                style={{ backgroundColor: color }}
                onClick={enabled ? this.callOnClickWithColor : undefined}
            />
        );
    }
}

export default Tile;
